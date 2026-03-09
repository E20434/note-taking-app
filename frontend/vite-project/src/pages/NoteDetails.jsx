import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import CollaboratorModal from '../components/CollaboratorModal';
import NoteEditor from '../components/NoteEditor';
import { useAuth } from '../context/AuthContext';


export default function NoteDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [note, setNote] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [saving, setSaving] = useState(false);

    const fetchNote = async () => {
        const { data } = await api.get(`/notes/${id}`);
        setNote(data);
        setTitle(data.title);
        setContent(data.content);
    };

    useEffect(() => {
        fetchNote();
    }, [id]);


    const saveNote = async () => {
        setSaving(true);
        await api.put(`/notes/${id}`, { title, content });
        setSaving(false);
        fetchNote();
    };

    const deleteNote = async () => {
        await api.delete(`/notes/${id}`);
        navigate('/');
    };

    const addCollaborator = async (email) => {
        const { data } = await api.post(`/notes/${id}/collaborators`, { email });
        setNote(data);
    };

    const removeCollaborator = async (collaboratorId) => {
        const { data } = await api.delete(`/notes/${id}/collaborators`, {
            data: { collaboratorId }
        });
        setNote(data);
    };

    if (!note) return <div className="p-6">Loading...</div>;

    const isOwner = note.owner?._id === user?.id;

    return (
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-3 md:justify-between md:items-center">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-3xl font-bold bg-transparent outline-none border-b w-full py-2"
                />
                <div className="flex gap-2">
                    <button onClick={saveNote} className="px-4 py-2 bg-emerald-600 text-white rounded-xl">
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                    {isOwner && (
                        <button onClick={deleteNote} className="px-4 py-2 bg-red-600 text-white rounded-xl">
                            Delete
                        </button>
                    )}
                </div>
            </div>

            <NoteEditor value={content} onChange={setContent} />

            <div className="bg-white p-4 rounded-2xl border">
                <h3 className="font-semibold mb-3">Collaborators</h3>
                <div className="space-y-2">
                    {note.collaborators?.map((c) => (
                        <div key={c._id} className="flex justify-between items-center border rounded-lg px-3 py-2">
                            <span>{c.name} ({c.email})</span>
                            {isOwner && (
                                <button
                                    onClick={() => removeCollaborator(c._id)}
                                    className="text-red-600"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {isOwner && <CollaboratorModal onAdd={addCollaborator} />}
        </div>
    );
}