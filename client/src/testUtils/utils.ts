/**
 * @description util function to resize window width
 * @param {Number} intWidth width px
 * @returns {undefined} sets global window inner width, fires `resize` event
 */
export const resizeWindowWidth = (intWidth: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: intWidth,
  });
  global.window.dispatchEvent(new Event("resize"));
};
