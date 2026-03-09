import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', { email, password });
            login(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow border"
            >
                <h1 className="text-2xl font-bold mb-6">Login</h1>
                {error && <p className="text-red-600 mb-3">{error}</p>}
                <input
                    className="w-full border rounded-lg px-4 py-2 mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="w-full border rounded-lg px-4 py-2 mb-4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
                    Login
                </button>
                <p className="mt-4 text-sm text-slate-600">
                    No account? <Link className="text-indigo-600" to="/register">Register</Link>
                </p>
            </form>
        </div>
    );

}