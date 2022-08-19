import { Icon } from "semantic-ui-react";
import React, { useContext, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContext } from "../context/toastContext";

const CopyClipboard = ({ value }) => {
  const [copied, setCopied] = useState(false);
  const toastContext = useContext(ToastContext);

  useEffect(() => {
    if (copied) {
      toastContext.addToast("SUCCESS", "Copy to clipboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copied]);

  return (
    <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
      <Icon name="copy" />
    </CopyToClipboard>
  );
};

export default CopyClipboard;
