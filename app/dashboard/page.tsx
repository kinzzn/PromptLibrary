'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import PromptCard from '@/components/PromptCard';

type Prompt = {
  id: string;
  title: string;
  model: string;
  prompt: string;
  example: string;
  notes: string;
};

export default function Dashboard() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const { data, error } = await supabase.from('prompts').select('*');
      if (!error && data) setPrompts(data);
    };
    fetchPrompts();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Prompt Dashboard</h1>
      <a href="/new" className="text-blue-500 underline">+ Create New Prompt</a>
      <div className="grid gap-4 mt-6">
        {prompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </main>
  );
}
