import React, { memo } from "react";
import TagCloud from "react-tag-cloud";
import randomColor from "randomcolor";
import Tooltip from "@material-ui/core/Tooltip";
import useCurrentTheme from "../../../../hooks/useCurrentTheme/useCurrentTheme";
import { BookType } from "../../../../types/types";
import { useStyles } from "./style";

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
      style={
        {
          fontFamily: "sans-serif",
          fontSize: 20,
          fontWeight: "bold",
          fontStyle: "italic",
          color: () =>
            randomColor({
              luminosity: bLightTheme ? "dark" : "light",
            }),
          padding: 5,
          width: "100%",
          height: "80vh",
          zIndex: 2,
        } as any
      }
    >
      {arrBooks.map((objBook) => (
        <Tooltip key={objBook!.id} title={objBook!.name || ""}>
          <div
            onClick={onBookSelect!(objBook!.id)}
            className={classes.bookList__cloudItem}
          >
            {objBook!.name}
          </div>
        </Tooltip>
      ))}
    </TagCloud>
  );
};

export default memo(TagCloudList);
