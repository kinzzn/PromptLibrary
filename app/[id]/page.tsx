'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import PromptForm from '@/components/PromptForm';

export default function EditPromptPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchPrompt = async () => {
      const { data } = await supabase.from('prompts').select('*').eq('id', id).single();
      setInitialData(data);
    };
    fetchPrompt();
  }, [id]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Prompt</h1>
      <PromptForm initialData={initialData} />
    </main>
  );
}
