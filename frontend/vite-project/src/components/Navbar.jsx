import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-indigo-600">
                    CollabNotes
                </Link>
                <div className="flex items-center gap-4">
                    {user && <span className="text-sm text-slate-600">{user.name}</span>}
                    {user && (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}