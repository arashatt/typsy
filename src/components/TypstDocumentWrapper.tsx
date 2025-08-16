// src/components/TypstDocumentWrapper.tsx
import React from "react";
import { TypstDocument as TD } from "@myriaddreamin/typst.react";

// Initialize WASM
TD.setWasmModuleInitOptions({
  getModule: () => "/typst_ts_renderer_bg.wasm",
  beforeBuild: [],
});

// Define props
interface TypstDocumentWrapperProps {
  artifact: Uint8Array; // required
  [key: string]: any;
}

// Wrapper component
const TypstDocumentWrapper: React.FC<TypstDocumentWrapperProps> = ({
  artifact,
  ...rest
}) => {
  return <TD artifact={artifact} {...rest} />;
};

export default TypstDocumentWrapper;
