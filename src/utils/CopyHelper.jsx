import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const CopyText=({ text }) =>{
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <span onClick={copy} style={{ cursor: "pointer" }}>
      <FontAwesomeIcon icon={faCopy} />
      {copied && <span style={{ marginLeft: 6 }}>Copied!</span>}
    </span>
  );
}
