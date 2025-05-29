'use client';

import PromptForm from '@/components/PromptForm';

export default function NewPromptPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create a New Prompt</h1>
      <PromptForm />
    </main>
  );
}
