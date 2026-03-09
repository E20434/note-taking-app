import { useState } from "react";

export default function CollaboratorModal({ onAdd }) {

    const [email, setEmail] = useState('');

    const submit = async () => {

        if (!email.trim()) return;
        await onAdd(email.trim());
        setEmail('');
    };

    return (
        <div className="bg-white p-4 rounded-2xl border shadow-sm">
            <h3 className="font-semibold mb-3">Add Collaborator</h3>
            <div className="flex gap-2">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter user email"
                    className="flex-1 border rounded-lg px-3 py-2"
                />
                <button
                    onClick={submit}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
                >
                    Add
                </button>
            </div>
        </div>
    );
}