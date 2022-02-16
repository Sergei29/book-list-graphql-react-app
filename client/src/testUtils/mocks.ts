import { GET_CURRENT_THEME } from "../graphql/queries";
import { MuiSelectedTheme } from "../types";

export const mocks = [
  {
    request: {
      query: GET_CURRENT_THEME,
    },
    result: {
      data: {
        strCurrentTheme: MuiSelectedTheme.LIGHT,
      },
    },
  },
];
