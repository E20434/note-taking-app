import { Link } from "react-router-dom";

export default function NoteCard({ note }) {


    return (
        <Link
            to={`/notes/${note._id}`}
            className="bg-white rounded-2xl shadow-sm border p-4 hover:shadow-md transition block"
        >
            <h3 className="text-lg font-semibold text-slate-800">{note.title}</h3>
            <p className="text-sm text-slate-500 mt-1">
                Owner: {note.owner?.name || 'Unknown'}
            </p>
            <div
                className="text-sm text-slate-700 mt-3 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: note.content }}
            />
        </Link>

    );
}