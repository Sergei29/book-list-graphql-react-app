import { InMemoryCache, InMemoryCacheConfig } from "@apollo/client";
import { favoritesReactiveVar, currentThemeVar } from "./reactiveVars";

const objConfig: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        arrFavoriteBookIds: {
          read: () => favoritesReactiveVar(),
        },
        strCurrentTheme: {
          read: () => currentThemeVar(),
        },
      },
    },
  },
};

export const cache = new InMemoryCache(objConfig);