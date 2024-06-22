import React from "react";
import { useState } from "react";
import "./texteditor.css";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
const Font = Quill.import("formats/font");
Font.whitelist = ["Quicksand", "Roboto", "serif", "monospace", "Ingrid"];
Quill.register(Font, true);
const toolbarOptions = [
  [{ font: ["Quicksand", "Roboto", "serif", "monospace", "Ingrid"] }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }],
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],
  ["link", "image"],
  ["clean"], // remove formatting button
];

function TextEditor() {
  const [value, setValue] = useState("");
  console.log(value);
  const [preview, setPreview] = useState(false);
  const handlePreview = () => {
    setPreview(!preview);
  };
  return (
    <div className="mt-24">
      <ReactQuill
        theme="snow"
        modules={{ toolbar: toolbarOptions }}
        placeholder="Write something awesome..."
        value={value}
        onChange={setValue}
        className="formatTextContainer h-[60vh] pb-24 w-[80vw] mx-auto overflow-hidden break-all border-b "
      />
      {
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          onClick={handlePreview}
        >
          {preview ? "Hide" : "Show"} Preview
        </button>
      }
      {preview ? (
        <div className="mt-14 h-[30vh] w-[80vw] mx-auto border p-4 overflow-auto break-all    ">
          <h2>Preview:</h2>
          <div
            contentEditable={true}
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default TextEditor;
