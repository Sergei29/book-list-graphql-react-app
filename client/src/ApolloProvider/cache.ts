import { InMemoryCache, InMemoryCacheConfig } from "@apollo/client";
import { favoritesReactiveVar } from "./reactiveVars";

const objConfig: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        arrFavoriteBookIds: {
          read: () => favoritesReactiveVar(),
        },
      },
    },
  },
};

export const cache = new InMemoryCache(objConfig);
