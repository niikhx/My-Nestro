"use client";

import dynamicImport from "next/dynamic";

const Editor = dynamicImport(
  () => import("primereact/editor").then((mod) => mod.Editor),
  { ssr: false }
);

export default function RichTextEditor({ value, onTextChange, style }) {
  return <Editor value={value} onTextChange={onTextChange} style={style} />;
}