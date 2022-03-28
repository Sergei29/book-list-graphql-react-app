import React, { memo } from "react";
import { random } from "lodash";
import { TagCloud } from "react-tagcloud";
// import TagCloud from "react-tag-cloud";
// import useCurrentTheme from "../../../../hooks/useCurrentTheme";
import { BookType } from "../../../../types/types";
// import CloudItem from "./components/CloudItem";
// import UnderConstruction from "../../../UnderConstruction";
// import { useStyles } from "./style";

const formatBooks = (arrBookList: BookType[]) =>
  arrBookList.map((book) => ({
    value: book.name || "Book title",
    count: random(1, 5, false),
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
  // const classes = useStyles();
  // const { bLightTheme } = useCurrentTheme();

  return (
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={formatBooks(arrBooks)}
      onClick={(tag: Record<string, any>) =>
        console.log("tag.value: ", tag.value)
      }
    />
    // <UnderConstruction />
    // <TagCloud
    //   style={
    //     {
    //       fontFamily: "sans-serif",
    //       fontSize: () => Math.round(Math.random() * 30) + 16,
    //       fontWeight: "bold",
    //       fontStyle: "italic",
    //       color: () =>
    //         randomColor({
    //           luminosity: bLightTheme ? "dark" : "light",
    //         }),
    //       padding: 5,
    //       width: "100%",
    //       height: "90vh",
    //       zIndex: 2,
    //     } as any
    //   }
    //   spiral="rectangular"
    // >
    //   {arrBooks.map((objBook) => (
    //     <CloudItem
    //       strTitle={objBook!.name!}
    //       key={objBook!.id}
    //       onClick={onBookSelect!(objBook!.id)}
    //       className={classes.bookList__cloudItem}
    //     />
    //   ))}
    // </TagCloud>
  );
};

export default memo(TagCloudList);
