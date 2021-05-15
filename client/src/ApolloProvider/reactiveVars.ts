import { makeVar } from "@apollo/client";
import { MuiSelectedTheme } from "../types/types";

export const favoritesReactiveVar = makeVar<string[]>([]);
export const authStatusVar = makeVar<{ bLoggedIn: boolean }>({
  bLoggedIn: false,
});
export const currentThemeVar = makeVar<MuiSelectedTheme>(
  MuiSelectedTheme.LIGHT
);
