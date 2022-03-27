import { makeVar } from "@apollo/client";
import { MuiSelectedTheme } from "../../types/types";

export const favoritesReactiveVar = makeVar<string[]>([]);
export const currentThemeVar = makeVar<MuiSelectedTheme | null>(null);