import { GET_CURRENT_THEME } from "../graphql/queries";
import { USER_INFO } from "../graphql/mutations";
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
  {
    request: {
      query: USER_INFO,
    },
    result: {
      data: {
        userInfo: {
          id: "abcdefg",
          email: "test@gmail.com",
          role: "admin",
          active: true,
        },
      },
    },
  },
];
