'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import PromptForm from '@/components/PromptForm';

export default function EditPromptPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompt = async () => {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        // 将数组字段转换成逗号分隔字符串，便于表单使用
        setInitialData({
          ...data,
          models: Array.isArray(data.models) ? data.models : [],
          type_tags: Array.isArray(data.type_tags) ? data.type_tags : [],
        });
      }
      setLoading(false);
    };

    if (id) fetchPrompt();
  }, [id]);

  if (loading) return <p className="p-6 text-white">Loading...</p>;
  if (!initialData) return <p className="p-6 text-red-500">Prompt not found.</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Prompt</h1>
      <PromptForm initialData={initialData} />
    </main>
  );
}
