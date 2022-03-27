import * as createTheme from "@material-ui/core/styles/createTheme";

/**
 * @description extending the MUI theme types ( see example at https://javascript.plainenglish.io/extend-material-ui-theme-in-typescript-a462e207131f)
 */
declare module "@material-ui/core/styles/createTheme" {
  interface ThemeOptions {
    components?: {
      bookButton?: { color: string };
      bookDetails?: {
        background: string;
        color: string;
      };
      bookList?: {
        backgroundImage: { opacity: number };
        overlay: { background: string };
      };
      mobileNavigation?: { background: string; color: string };
      page?: {
        background: string;
      };
    };
  }
  interface Theme {
    components?: {
      bookButton?: { color: string };
      bookDetails?: {
        background: string;
        color: string;
      };
      bookList?: {
        backgroundImage: { opacity: number };
        overlay: { background: string };
      };
      mobileNavigation?: { background: string; color: string };
      page?: {
        background: string;
      };
    };
  }
}
