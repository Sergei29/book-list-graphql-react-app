import React, { memo } from "react";
import { TagCloud } from "react-tagcloud";
import useCurrentTheme from "../../../../hooks/useCurrentTheme";
import { BookType } from "../../../../types/types";
import { useStyles } from "./style";

/**
 * @description formatting array, inteerface adaptor func
 * @param {array} arrBookList book index list
 * @returns {array} same book index with adaprted interface for tagcoud to consume
 */
const formatBooks = (arrBookList: BookType[]) =>
  arrBookList.map((book) => ({
    value: book.name || "Book title",
    count: Math.round(5 * Math.random()),
    key: book.id,
  }));

type Props = {
  arrBooks: BookType[];
  onBookSelect: (strId: string) => () => void;
};

/**
 * @description booklist as word cloud layout
 * @param {Array} {arrBooks list of books
 * @param {Function} onBookSelect on book select handler generator
 * @returns {JSX} component markup
 */
const TagCloudList: React.FC<Props> = ({ arrBooks, onBookSelect }) => {
  const classes = useStyles();
  const { bLightTheme } = useCurrentTheme();

  return (
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={formatBooks(arrBooks)}
      onClick={(tag: Record<string, any>) => onBookSelect(tag.key)()}
      className={classes.cloudTag}
      colorOptions={{
        luminosity: bLightTheme ? "dark" : "light",
      }}
    />
  );
};

export default memo(TagCloudList);
