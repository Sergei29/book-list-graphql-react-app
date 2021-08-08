import { useQuery, ApolloError } from "@apollo/client";
import { GET_FAVORITES, GET_BOOK_DETAILS } from "../../graphql/queries";
import { favoritesReactiveVar } from "../../graphql/ApolloProvider/reactiveVars";
import { BookType } from "../../types/types";

type HookProps = {
  strBookId: string;
};

type HookReturnType = {
  data: { book: BookType } | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  funcIsBookFavorite: (strBookId: string) => boolean;
  funcToggleAsFavorite: (strBookId: string) => () => void;
};

/**
 * @description custom hook, book detals
 * @param {String} strBookId book ID
 * @returns {Object} book data and set book favorite handlers
 */
const useBookDetails = ({ strBookId }: HookProps): HookReturnType => {
  const { data, loading, error } = useQuery<{ book: BookType }>(
    GET_BOOK_DETAILS,
    {
      variables: { id: strBookId },
    }
  );
  const { data: objFavorites } =
    useQuery<{ arrFavoriteBookIds: string[] }>(GET_FAVORITES);
  /**
   * @description find if the book is in favorites list
   * @param {String} strBookId book ID
   * @returns {Boolean} favorite or not
   */
  const funcIsBookFavorite = (strBookId: string) =>
    !!objFavorites?.arrFavoriteBookIds.includes(strBookId);

  /**
   * @description tggle favorite function generator
   * @param {String} strBookId book ID
   * @returns {Fuction} function to toggle fav/unfav the book
   */
  const funcToggleAsFavorite = (strBookId: string) => () => {
    const bIsFavorite = funcIsBookFavorite(strBookId);
    const arrFavoritesNew = bIsFavorite
      ? objFavorites!.arrFavoriteBookIds.filter((strId) => strId !== strBookId)
      : [...objFavorites!.arrFavoriteBookIds, strBookId];

    favoritesReactiveVar(arrFavoritesNew);
  };

  return { data, loading, error, funcIsBookFavorite, funcToggleAsFavorite };
};

export default useBookDetails;
