import { makeVar } from "@apollo/client";

export const favoritesReactiveVar = makeVar<string[]>([]);
export const authStatusVar = makeVar({ bLoggedIn: false });
