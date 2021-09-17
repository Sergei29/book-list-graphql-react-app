import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { currentThemeVar } from "../../graphql/ApolloProvider/reactiveVars";
import { GET_CURRENT_THEME } from "../../graphql/queries";
import { MuiSelectedTheme } from "../../types/types";

const { LIGHT, DARK } = MuiSelectedTheme;

type HookReturnValue = {
  bLightTheme: boolean;
  strCurrentTheme: MuiSelectedTheme;
  funcToggleTheme: () => void;
};

/**
 * @description custom hook to get/set current theme
 * @returns {Object} current theme, and select new theme handler
 */
const useCurrentTheme = (): HookReturnValue => {
  const { data } =
    useQuery<{ strCurrentTheme: MuiSelectedTheme }>(GET_CURRENT_THEME);

  /**
   * @description toggle theme select
   * @returns {undefined} sets reactive variable
   */
  const funcToggleTheme = () => {
    const strNewTheme = data!.strCurrentTheme === LIGHT ? DARK : LIGHT;
    currentThemeVar(strNewTheme);
  };

  /**
   * @description effect to persist theme into loal storage
   * @returns {undefined}
   */
  useEffect(() => {
    if (!!data?.strCurrentTheme) {
      localStorage.setItem("strCurrentTheme", data?.strCurrentTheme);
    }
  }, [data?.strCurrentTheme]);

  /**
   * @description effect to retireve theme from loal storage in mount
   * @returns {undefined}
   */
  useEffect(() => {
    const strRetrievedTheme = localStorage.getItem("strCurrentTheme");
    currentThemeVar(strRetrievedTheme === DARK ? DARK : LIGHT);
  }, []);

  return {
    bLightTheme: data?.strCurrentTheme === LIGHT,
    funcToggleTheme,
    strCurrentTheme: data?.strCurrentTheme || LIGHT,
  };
};

export default useCurrentTheme;
