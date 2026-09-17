export default function TitleInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Untitled session"
      className="w-full text-xl font-medium border-none bg-transparent focus:outline-none placeholder-gray-400"
    />
  );
}
