import React, { memo } from "react";
import { TagCloud } from "react-tagcloud";
// import TagCloud from "react-tag-cloud";
// import useCurrentTheme from "../../../../hooks/useCurrentTheme";
import { BookType } from "../../../../types/types";
// import classNames from "classnames";
// import CloudItem from "./components/CloudItem";
// import UnderConstruction from "../../../UnderConstruction";
import { useStyles } from "./style";

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
  // const { bLightTheme } = useCurrentTheme();

  return (
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={formatBooks(arrBooks)}
      onClick={(tag: Record<string, any>) => {
        console.log("tag: ", tag);
        onBookSelect(tag.key);
      }}
      className={classes.cloudTag}
    />
    // <UnderConstruction />
  );
};

export default memo(TagCloudList);
