export const copyTextToClipboard = async (
  text: string,
  onComplete?: () => void,
  onFail?: () => void
) => {
  try {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  } catch (error) {
    !!onFail && onFail();
  } finally {
    !!onComplete && onComplete();
  }
};
