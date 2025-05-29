"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function PromptForm({ initialData }: { initialData?: any }) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      models: [] as string[],
      type_tags: [] as string[],
      prompt: "",
      context: "",
      example: "",
      notes: "",
    }
  );

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "models" || name === "type_tags") {
      setForm({ ...form, [name]: value.split(",").map((s) => s.trim()) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      ...form,
      models: form.models,
      type_tags: form.type_tags,
    };

    if (initialData) {
      await supabase.from("prompts").update(payload).eq("id", initialData.id);
    } else {
      await supabase.from("prompts").insert([payload]);
    }

    router.push("/dashboard");
  };

  const handleDelete = async () => {
    if (!initialData) return;
    const confirm = window.confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (!confirm) return;

    await supabase.from("prompts").delete().eq("id", initialData.id);
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="任务名称，如：智能客服问答"
      />

      <input
        name="models"
        value={form.models.join(", ")}
        onChange={handleChange}
        placeholder="适用模型，多个请用逗号分隔，如：gpt-4,gpt-3.5"
      />

      <input
        name="type_tags"
        value={form.type_tags.join(", ")}
        onChange={handleChange}
        placeholder="任务类型标签，多个请用逗号分隔，如：客服,问答"
      />

      <textarea
        name="prompt"
        value={form.prompt}
        onChange={handleChange}
        placeholder="Prompt 具体内容"
      />

      <textarea
        name="context"
        value={form.context}
        onChange={handleChange}
        placeholder="上下文说明"
      />

      <textarea
        name="example"
        value={form.example}
        onChange={handleChange}
        placeholder="预期输出示例"
      />

      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="备注信息"
      />

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          {initialData ? "Update" : "Create"} Prompt
        </button>

        {initialData && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
