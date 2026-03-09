import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function NoteEditor({ value, onChange }) {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
}