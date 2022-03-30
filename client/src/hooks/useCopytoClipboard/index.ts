import { useState, useEffect, useRef } from "react";
import { copyTextToClipboard } from "../../utils";

export const useCopytoClipboard = () => {
  const [strCopiedField, setStrCopiedField] = useState<string | null>(null);
  const status = useRef({ willUnmount: false });

  const onSuccess = (strFieldname: string) => () =>
    setStrCopiedField(strFieldname);

  const onFail = (strFieldname: string) => () =>
    setStrCopiedField(strFieldname);

  const handleCopyOnClick =
    (text: string, strFieldname: string) => async () => {
      if (strCopiedField !== null) return;
      await copyTextToClipboard(
        text,
        onSuccess(strFieldname),
        onFail(strFieldname)
      );
    };

  useEffect(() => {
    const currentStatus = status.current;
    return () => {
      currentStatus.willUnmount = true;
    };
  }, []);

  useEffect(() => {
    if (strCopiedField === null) return;
    const currentStatus = status.current;

    setTimeout(() => {
      if (!currentStatus.willUnmount) {
        setStrCopiedField(null);
      }
    }, 400);
  }, [strCopiedField]);

  return {
    handleCopyOnClick,
    strCopiedField,
  };
};
