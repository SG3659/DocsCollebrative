import React, { useRef, useCallback } from "react";

const Share = (props) => {
  let documentId = props.documentId;
  const copyRef = useRef();
  const copyPasswordToClipboard = useCallback(() => {
    copyRef.current?.select();
    window.navigator.clipboard.writeText(documentId);
  }, [documentId]);
  return (
    <div className="flex  flex-col gap-1 mt-24 border-blue-400">
      <p>Share The Code </p>
      <input
        type="text"
        placeholder={documentId}
        ref={copyRef}
        readOnly
        className="border p-3 rounded-full focus:outline-none shadow-lg "
      />
      <button
        onClick={copyPasswordToClipboard}
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 border  p-3 rounded-full"
      >
        copy
      </button>
    </div>
  );
};

export default Share;
