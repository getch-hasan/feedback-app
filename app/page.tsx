"use client";
import { useState, useEffect } from "react";
import { TextAreaInput, TextInput } from "./components/input"; // adjust if path differs
import { useForm, Controller } from "react-hook-form";
import { type } from './../node_modules/path-type/index.d';
import Placeholder from './../node_modules/react-select/dist/declarations/src/components/Placeholder.d';

type FeedbackForm = {
  name: string;
  email: string;
  feedback: string;
};

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<FeedbackForm[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackForm>({
    defaultValues: {
      name: "",
      email: "",
      feedback: "",
    },
  });

  const fetchFeedbacks = async () => {
    const res = await fetch("/api/feedback");
    const data = await res.json();
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // handle form submit
  const onSubmit = async (data: FeedbackForm) => {
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    reset(); // clear form
    fetchFeedbacks();
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-xl font-bold mb-4">Mini Feedback App</h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Custom Input with react-hook-form */}
          <TextInput
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            control={control}
            rules={{ required: "Name is required" }}
            error={errors.name?.message}
          />

          {/* Email Input */}
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            }}
            error={errors.email?.message}
          />

          {/* Feedback Textarea */}
          <TextAreaInput
          label='Feedback'

            name="feedback"
            type='text'
            control={control}
            Placeholder='Enter Your feedback'
            rules={{ required: "Feedback is required" }}
          
          />
          {errors.feedback && (
            <p className="text-red-500 text-sm">{errors.feedback.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-700"
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
                <p className="font-bold">
                  {f.name} ({f.email})
                </p>
                <p>{f.feedback}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
