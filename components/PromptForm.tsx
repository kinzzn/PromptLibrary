'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function PromptForm({ initialData }: { initialData?: any }) {
  const [form, setForm] = useState(initialData || {
    title: '', model: '', prompt: '', example: '', notes: ''
  });
  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (initialData) {
      await supabase.from('prompts').update(form).eq('id', initialData.id);
    } else {
      await supabase.from('prompts').insert([form]);
    }
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {['title', 'model', 'prompt', 'example', 'notes'].map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field}
          className="p-2 rounded bg-gray-800 text-white"
        />
      ))}
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
        {initialData ? 'Update' : 'Create'} Prompt
      </button>
    </form>
  );
}
