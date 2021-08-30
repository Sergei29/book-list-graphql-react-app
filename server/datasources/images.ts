import { MongoDataSource } from "apollo-datasource-mongodb";
import { ApolloError } from "apollo-server";
import { cloudinary } from "../util/cloudinary";
import { ContextType, ImageType } from "../types/types";

/**
 * @description datasource class for images entity
 * further info on datasources: https://www.apollographql.com/docs/apollo-server/data/data-sources/
 */
export class ImagesDataSource extends MongoDataSource<ImageType, ContextType> {
  /**
   * @description returns the images list
   * @returns {Promise<Array>} promise resolving to an array of image's objects
   */
  getAllImages = async () => await this.model.find();

  /**
   * @description returns an image by a given ID
   * @param {String} strImageId image's ID
   * @returns {Promise<Object | null | undefined>} promise resolving to image's object if found
   */
  getImageById = async (strImageId: string) =>
    await this.findOneById(strImageId);

  /**
   * @description returns an image by a given public ID
   * @param {String} strImagePublicId image's public ID
   * @returns {Promise<Object | null | undefined>} promise resolving to image's object if found
   */
  getImageByPublicId = async (strImagePublicId: string) =>
    await this.model.findOne({ publicId: strImagePublicId });

  /**
   * @description uploading image file to Cloudinary CDN
   * @param {String} strBase64ImageFile image file
   * @returns {Promise<Object>} promise resolving to response data about image stored in Cloudinary cdn.
   */
  uploadImageToCloudinary = async (strBase64ImageFile: string) => {
    try {
      const objResponse = await cloudinary.uploader.upload(strBase64ImageFile, {
        allowed_formats: ["jpg", "jpeg", "png", "PNG"],
        folder: "image_list_images",
      });

      const {
        public_id: publicId,
        secure_url: imageUrl,
        width,
        height,
        bytes: size,
      } = objResponse;

      return {
        publicId,
        imageUrl,
        width,
        height,
        size,
      };
    } catch (error) {
      throw new ApolloError(
        `Image cannot be uploaded to Cloudinary. ${error.message}`
      );
    }
  };

  /**
   * @description deletes image from Cloudinary CDN
   * @param {String} strPublicId image public ID
   * @returns {Promise<{result: string}>} promise that resolves to {result:'ok'} response type from Cloudinary on success
   */
  deleteImageFromCloudinary = async (
    strPublicId: string
  ): Promise<{ result: string }> => {
    try {
      return await cloudinary.uploader.destroy(strPublicId);
    } catch (error) {
      throw new ApolloError(
        `Image cannot be deleted from Cloudinary. ${error.message}`
      );
    }
  };

  /**
   * @description deletes images from Cloudinary CDN by IDs
   * @param {Array} arrImagePublicIds array of images public IDs
   * @returns {Promise<Object>} promise resolving to object bearing info on deleted resources
   */
  deleteManyFromCloudinaryByIds = async (arrImagePublicIds: string[]) => {
    try {
      return await cloudinary.api.delete_resources(arrImagePublicIds);
    } catch (error) {
      throw new ApolloError(
        `the list of images cannot be deleted from Cloudinary.`,
        error
      );
    }
  };

  /**
   * @description util to save image's data in DB
   * @param {String} strBase64ImageFile image file
   * @returns {Promise<Object>}  promise resolving to newly written image's object
   */
  saveAndGetDocFromDB = async (strBase64ImageFile: string) => {
    try {
      const objNewImage = await this.uploadImageToCloudinary(
        strBase64ImageFile
      );
      return await this.model.create(objNewImage);
    } catch (error) {
      throw new ApolloError(
        `the image cannot be saved to database. ${error.mesage}`
      );
    }
  };

  /**
   * @description add new image to collection
   * @param {String} strBase64ImageFile image's file
   * @returns {Promise<Object | null>}  promise resolving to newly written image's object
   */
  addNewImage = async (strBase64ImageFile?: string) => {
    if (!strBase64ImageFile) return null;
    return await this.saveAndGetDocFromDB(strBase64ImageFile);
  };

  /**
   * @description updating an exiting image inside the collection
   * @param {String} strImageId existing image's public ID
   * @param {String} newImageFile image's file
   * @returns {Promise<Object | undefined>}  promise resolving to re-written image's object or undefined if fails
   */
  updateImageById = async (
    strImageId: string,
    newImageFile?: string
  ): Promise<ImageType | undefined> => {
    if (!newImageFile) return;
    const nObjExistingImage = await this.getImageById(strImageId);

    try {
      if (nObjExistingImage) {
        await this.deleteImageFromCloudinary(nObjExistingImage.publicId);
      }

      return await this.saveAndGetDocFromDB(newImageFile);
    } catch (error) {
      throw new ApolloError("Failed to update image: ", error);
    }
  };

  /**
   * @description deleting image by ID, from both: DB and CDN
   * @param {String} strImageId image ID
   * @returns {Object} deleted image object
   */
  deleteImageById = async (strImageId: string) => {
    try {
      const nObjDeletedImage = await this.model.findByIdAndDelete(strImageId);
      if (!!nObjDeletedImage) {
        await this.deleteImageFromCloudinary(nObjDeletedImage.publicId);
      }

      return nObjDeletedImage;
    } catch (error) {
      throw new ApolloError("Failed to delete image from database ", error);
    }
  };

  /**
   * @description deletes multiple images by their IDs
   * @param {Array} arrImagesPublicIds array of images public IDs to delete
   * @returns {Array} array of deleted images IDs
   */
  deleteImagesByIds = async (arrImagesPublicIds: string[]) => {
    try {
      await this.deleteManyFromCloudinaryByIds(arrImagesPublicIds);
    } catch (error) {
      console.log(error);
    }

    try {
      const arrDeletedImages = await Promise.all(
        arrImagesPublicIds.map((strImageId) => {
          return this.model.findByIdAndDelete(strImageId);
        })
      );

      const arrDeletedImageIds: (string | null)[] = arrDeletedImages.map(
        (nObjImage) => nObjImage?.id || null
      );

      return arrDeletedImageIds;
    } catch (error) {
      throw new ApolloError(
        "Failed to delete the images from database ",
        error
      );
    }
  };
}
