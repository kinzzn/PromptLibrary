type Prompt = {
  id: string;
  title: string;
  models: string[];
  type_tags: string[];
  description: string;
  context: string;
  expected_output: string;
  notes: string;
};

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  return (
    <div className="border rounded p-4 bg-gray-900 text-white">
      <h2 className="text-xl font-bold">{prompt.title}</h2>
      <p className="text-sm text-gray-400 mb-1">Models: {prompt.models.join(', ')}</p>
      <p className="text-sm text-gray-400 mb-1">Tags: {prompt.type_tags.join(', ')}</p>
      <p className="mb-2">{prompt.description}</p>
      <p className="text-xs text-gray-500 italic mb-1">Context: {prompt.context}</p>
      <p className="text-sm text-green-400 italic mb-2">Example: {prompt.expected_output}</p>
      <p className="text-xs text-gray-600">{prompt.notes}</p>
      <a href={`/${prompt.id}`} className="text-blue-400 mt-2 block">Edit</a>
    </div>
  );
}
