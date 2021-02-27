import React, { memo } from "react";
//styles:
import { BackgroundStyled } from "./Background.styled";

/**
 * @description background component
 * @returns {JSX} markup, background image
 */
const Background: React.FC = () => <BackgroundStyled className="background" />;

export default memo(Background);
