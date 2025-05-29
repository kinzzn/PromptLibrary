'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import PromptCard from '@/components/PromptCard';
import { saveAs } from 'file-saver'; 

type Prompt = {
  id: string;
  title: string;
  models: string[];
  type_tags: string[];
  prompt: string;
  context: string;
  example: string;
  notes: string;
};

export default function Dashboard() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // 根据搜索关键字加载 prompts
  const fetchPrompts = async (keyword = '') => {
    setLoading(true);
    let query = supabase.from('prompts').select('*');
    if (keyword) {
      query = query.or(
        `title.ilike.%${keyword}%,models.cs.{${keyword}},type_tags.cs.{${keyword}}`
      );
    }
    const { data, error } = await query.order('created_at', { ascending: false });
    if (!error && data) setPrompts(data);
    setLoading(false);
  };
    
    // 在 Dashboard 组件内，新增导出函数：
    const exportJSON = () => {
    const dataStr = JSON.stringify(prompts, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    saveAs(blob, 'prompts.json');
    };

    const exportMarkdown = () => {
    let md = '# Prompts Export\n\n';
    prompts.forEach((p) => {
        md += `## ${p.title}\n\n`;
        md += `**Models:** ${p.models.join(', ')}  \n`;
        md += `**Tags:** ${p.type_tags.join(', ')}  \n\n`;
        md += `**Prompt:**\n${p.prompt}\n\n`;
        if (p.context) md += `**Context:**\n${p.context}\n\n`;
        if (p.example) md += `**Example:**\n${p.example}\n\n`;
        if (p.notes) md += `**Notes:**\n${p.notes}\n\n`;
        md += '---\n\n';
    });
    const blob = new Blob([md], { type: 'text/markdown' });
    saveAs(blob, 'prompts.md');
    };

  useEffect(() => {
    fetchPrompts(search);
  }, [search]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Prompt Dashboard</h1>

      <div className="flex items-center gap-4 mb-4">
        <a href="/new" className="text-blue-500 underline">
          + Create New Prompt
        </a>
        <input
          type="text"
          placeholder="Search by title, model, or tag"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white flex-grow"
        />
         <button
          onClick={exportJSON}
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          Export JSON
        </button>
        <button
          onClick={exportMarkdown}
          className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded"
        >
          Export Markdown
        </button>
      </div>

      {loading && <p className="text-white">Loading...</p>}

      <div className="grid gap-4 mt-6">
        {prompts.length === 0 && !loading && <p className="text-gray-400">No prompts found.</p>}
        {prompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </main>
  );
}
