/**
 * @description util function to resize window width
 * @param {Number} intWidth width px
 * @returns {undefined} sets global window inner width, fires `resize` event
 */
export const resizeWindowWidth = (intWidth: number) => {
  global.window = Object.assign(global.window, { innerWidth: intWidth });
  global.window.dispatchEvent(new Event("resize"));
};
