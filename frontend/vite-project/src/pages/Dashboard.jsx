import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';


export default function Dashboard() {

    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();


    const fetchNotes = async (query = '') => {

        const { data } = await api.get(`/notes${query ? `?q=${encodeURIComponent(query)}` : ''}`);
        setNotes(data);
    };

    const createNote = async () => {

        const { data } = await api.post('/notes ', {
            title: 'untitled note ',
            content: '<p>Start writing...</p>'
        });

        navigate(`/notes/${data._id}`);
    };

    useEffect(() => {

        fetchNotes();
    }, []);

    return (

        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
                <h1 className="text-3xl font-bold">Your Notes</h1>
                <button onClick={createNote}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
                >
                    New note
                </button>
            </div>

            <div className="mb-6">
                <SearchBar value={search} onChange={setSearch} onSearch={() => fetchNotes(search)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note) => (
                    <NoteCard key={note._id} note={note} />
                ))}
            </div>


        </div>

    );


}