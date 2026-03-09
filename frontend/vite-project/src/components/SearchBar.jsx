export default function SearchBar({ value, onChange, onSearch }) {

    return (
        <div className="flex gap-2">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search notes..."
                className="flex-1 rounded-lg border px-4 py-2"
            />
            <button
                onClick={onSearch}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
            >
                Search
            </button>
        </div>



    );

}