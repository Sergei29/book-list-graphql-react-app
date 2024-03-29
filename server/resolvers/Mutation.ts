import {
  IFieldResolver,
  AuthenticationError,
  UserInputError,
  ApolloError,
} from "apollo-server-express";
import { ErrorMessage, ContextType, Role, Expiry, ImageType } from "../types";
import {
  funcHashPassword,
  funcCreateToken,
  funcVerifyPassword,
  funcDecodeBase64Password,
  funcFormatUser,
  funcSendEmail,
} from "../util";
import { ADMIN_EMAIL, origin } from "../constants";

const { ADMIN, USER } = Role;

type ParentType = Record<string, any>;
type ArgsType = Record<string, any>;
type MutationResolverType = Record<
  string,
  IFieldResolver<ParentType, ContextType, ArgsType>
>;

export const Mutation: MutationResolverType = {
  addAuthor: async (parent, args, { dataSources }, info) => {
    const objExistingAuthor = await dataSources.authors.getAuthorByName(
      args.name
    );

    if (objExistingAuthor) {
      throw new UserInputError(ErrorMessage.AUTHOR_EXISTS);
    }

    return await dataSources.authors.addNewAuthor({
      name: args.name,
      age: args.age,
    });
  },

  addBook: async (parent, args, { dataSources }, info) => {
    const objExistingBook = await dataSources.books.getBookByName(args.name);
    if (objExistingBook) {
      throw new UserInputError(ErrorMessage.BOOK_EXISTS);
    }
    const objNewImage = await dataSources.images.addNewImage(
      args.strBase64ImageFile
    );
    const objNewBook = await dataSources.books.addNewBook({
      name: args.name,
      genre: args.genre,
      authorId: args.authorId,
      addedBy: args.addedBy,
      description: args.description,
      imageId: objNewImage?._id || null,
    });

    return objNewBook;
  },

  removeAuthor: async (parent, args, { dataSources, user }, info) => {
    if (user?.role !== ADMIN) {
      throw new UserInputError(ErrorMessage.NOT_ALOWED);
    }
    const objExistingAuthor = await dataSources.authors.getAuthorById(args.id);
    if (!objExistingAuthor) {
      throw new UserInputError(ErrorMessage.AUTHOR_NOT_FOUND);
    }
    // 1. remove all associated images:
    const arrAuthorBooks = await dataSources.books.getBooksByAuthorId(args.id);
    const arrImagesIds = arrAuthorBooks.reduce((arrIds, objCurrentBook) => {
      return objCurrentBook?.imageId
        ? [...arrIds, objCurrentBook?.imageId]
        : arrIds;
    }, [] as string[]);
    await dataSources.images.deleteImagesByIds(arrImagesIds);
    // 2. remove all author's books (if any)
    await dataSources.books.deleteBooksByAuthor(args.id);
    // 3. remove Author:
    return await dataSources.authors.deleteAuthorById(args.id);
  },

  removeBook: async (parent, args, { dataSources, user }, info) => {
    if (user?.role !== ADMIN) {
      throw new UserInputError(ErrorMessage.NOT_ALOWED);
    }
    const objExistingBook = await dataSources.books.getBookById(args.id);
    if (!objExistingBook) {
      throw new UserInputError(ErrorMessage.BOOK_NOT_FOUND);
    }
    await dataSources.images.deleteImageById(objExistingBook.imageId);
    return await dataSources.books.deleteBookById(args.id);
  },

  editBook: async (parent, args, { dataSources, user }, info) => {
    if (user?.role !== ADMIN) {
      throw new UserInputError(ErrorMessage.NOT_ALOWED);
    }

    const {
      id,
      name,
      genre,
      authorId,
      addedBy,
      description,
      strBase64ImageFile,
    } = args;

    const objExistingBook = await dataSources.books.getBookById(id);
    if (!objExistingBook) {
      throw new UserInputError(ErrorMessage.BOOK_NOT_FOUND);
    }

    const objNewImage = await dataSources.images.updateImageById(
      objExistingBook.imageId,
      strBase64ImageFile
    );

    return await dataSources.books.updateBookById({
      id,
      name,
      genre,
      authorId,
      addedBy,
      description,
      imageId: objNewImage?.id || objExistingBook.imageId,
    });
  },

  editAuthor: async (parent, args, { dataSources, user }, info) => {
    if (user?.role !== ADMIN) {
      throw new UserInputError(ErrorMessage.NOT_ALOWED);
    }
    const { id, name, age } = args;
    const objExistingAuthor = await dataSources.authors.getAuthorById(id);
    if (!objExistingAuthor) {
      throw new UserInputError(ErrorMessage.AUTHOR_NOT_FOUND);
    }

    return await dataSources.authors.updateAuthorById({
      id,
      name,
      age,
    });
  },

  signUp: async (parent, { credentials }, { dataSources, res }, info) => {
    const { email, password } = credentials;
    const objUserCredentials = {
      email: email.toLowerCase(),
      password: funcDecodeBase64Password(password),
    };
    const { users } = dataSources;

    const nObjExistingUser = await users.getUserByEmail(
      objUserCredentials.email
    );
    if (nObjExistingUser) throw new ApolloError(ErrorMessage.USER_EXISTS);

    const role = objUserCredentials.email === ADMIN_EMAIL ? ADMIN : USER;
    const hash = funcHashPassword(objUserCredentials.password);
    const objNewUser = await users.addNewUser({
      email: objUserCredentials.email,
      hash,
      role,
      active: false,
    });

    const strNewUserEmail = await funcSendEmail(objNewUser.email, {
      subject: "verify new user email",
      text: `Copy and paste this link: ${origin}/confirm/${objNewUser.id}`,
      html: `<a href="${origin}/confirm/${objNewUser.id}" >verify your email link</a>`,
    });

    return {
      user: {
        id: objNewUser.id,
        email: strNewUserEmail,
        role: objNewUser.role,
        active: objNewUser.active,
      },
    };
  },

  signUpConfirm: async (parent, { id }, { dataSources, res }, info) => {
    const nObjExistingUser = await dataSources.users.getUserById(id);
    if (!nObjExistingUser) throw new ApolloError(ErrorMessage.USER_NOT_FOUND);
    if (nObjExistingUser.active) {
      throw new ApolloError(ErrorMessage.USER_ALREADY_ACTIVE);
    }

    const objUpdatedUser = await dataSources.users.updateUserById({
      ...funcFormatUser(nObjExistingUser),
      active: true,
    });
    const token = funcCreateToken(objUpdatedUser!);
    res.cookie("token", token, { httpOnly: true, maxAge: Expiry.IN_24_HOURS });

    return {
      user: {
        id: objUpdatedUser!.id,
        email: objUpdatedUser!.email,
        role: objUpdatedUser!.role,
        active: objUpdatedUser!.active,
      },
    };
  },

  signIn: async (parent, { credentials }, { dataSources, res }, info) => {
    const { email, password } = credentials;
    const objUserCredentials = {
      email: email.toLowerCase(),
      password: funcDecodeBase64Password(password),
    };

    const nObjExistingUser = await dataSources.users.getUserByEmail(
      objUserCredentials.email
    );
    if (!nObjExistingUser) throw new ApolloError(ErrorMessage.USER_NOT_FOUND);
    const bValidPassword = funcVerifyPassword(
      objUserCredentials.password,
      nObjExistingUser.hash!
    );
    const bActiveUser = nObjExistingUser.active;

    if (!bValidPassword || !bActiveUser)
      throw new ApolloError(ErrorMessage.WRONG_PASSWORD);

    const token = funcCreateToken(nObjExistingUser);

    /**
     * @description setting set-cookie instruction into the response header
     */
    res.cookie("token", token, {
      httpOnly: false,
      maxAge: Expiry.IN_24_HOURS,
    });

    return {
      user: {
        id: nObjExistingUser.id,
        email: nObjExistingUser.email,
        role: nObjExistingUser.role,
        active: nObjExistingUser.active,
      },
    };
  },

  signOut: async (parent, args, { res }, info) => {
    res.clearCookie("token");
    return { user: undefined };
  },

  userInfo: async (parent, args, { user }, info) => {
    if (user) {
      return {
        user: {
          id: user.sub,
          email: user.email,
          role: user.role,
          active: true,
        },
      };
    }

    return { user: undefined };
  },

  removeUser: async (parent, args, { dataSources, user }, info) => {
    if (user?.role !== ADMIN) {
      throw new UserInputError(ErrorMessage.NOT_ALOWED);
    }
    const objUser = await dataSources.users.getUserById(args.id);
    if (!objUser) throw new AuthenticationError(ErrorMessage.USER_NOT_FOUND);

    try {
      const objDeletedUser = await dataSources.users.deleteUserById(args.id);

      return {
        user: {
          id: objDeletedUser!.id,
          email: objDeletedUser!.email,
          role: objDeletedUser!.role,
        },
      };
    } catch (objError) {
      throw objError;
    }
  },
};
