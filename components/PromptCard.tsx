type Prompt = {
  id: string;
  title: string;
  model: string;
  prompt: string;
  example: string;
  notes: string;
};

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  return (
    <div className="border rounded p-4 bg-gray-900 text-white">
      <h2 className="text-xl font-bold">{prompt.title}</h2>
      <p className="text-sm text-gray-400 mb-2">Model: {prompt.model}</p>
      <p className="mb-2">{prompt.prompt}</p>
      <p className="text-sm text-green-400 italic">Example: {prompt.example}</p>
      <a href={`/${prompt.id}`} className="text-blue-400 mt-2 block">Edit</a>
    </div>
  );
}
