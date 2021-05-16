import * as createMuiTheme from "@material-ui/core/styles/createMuiTheme";

/**
 * @description extending the MUI theme types ( see example at https://javascript.plainenglish.io/extend-material-ui-theme-in-typescript-a462e207131f)
 */
declare module "@material-ui/core/styles/createMuiTheme" {
  interface ThemeOptions {
    components?: {
      bookButton?: { color: string };
      bookDetails?: { background: string; color: string };
      page?: {
        background: string;
      };
    };
  }
  interface Theme {
    components?: {
      bookButton?: { color: string };
      bookDetails?: { background: string; color: string };
      page?: {
        background: string;
      };
    };
  }
}
