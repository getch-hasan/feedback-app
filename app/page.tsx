"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", feedback: "" });
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  const fetchFeedbacks = async () => {
    const res = await fetch("/api/feedback");
    const data = await res.json();
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", email: "", feedback: "" });
    fetchFeedbacks();
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-xl font-bold mb-4">Mini Feedback App</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Feedback"
            value={form.feedback}
            onChange={(e) => setForm({ ...form, feedback: e.target.value })}
            className="w-full p-2 border rounded"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        {/* Feedback List */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Submitted Feedback</h2>
          <ul className="space-y-2">
            {feedbacks.map((f, i) => (
              <li key={i} className="p-3 border rounded bg-gray-100">
                <p className="font-bold">{f.name} ({f.email})</p>
                <p>{f.feedback}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
