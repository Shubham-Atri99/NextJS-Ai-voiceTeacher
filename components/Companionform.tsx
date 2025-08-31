"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createCompanion } from "@/lib/actions/companions.action";
import { redirect } from "next/navigation";

type FormData = {
  name: string;
  subject: string;
  topic: string;
  personality: string;
  duration: number;
  style: string;
};

export const subjects = [
  "Maths",
  "Language",
  "Science",
  "History",
  "Coding",
  "Economics",
];

const CompanionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { duration: 1 },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const newCompanion = await createCompanion(data);
    if (newCompanion) {
      redirect(`/companions/${newCompanion.id}`);
    } else {
      redirect(`/`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-100"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          🎓 Create Your Companion
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Fill in the details below to create your study companion.
        </p>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Companion Name
          </label>
          <input
            {...register("name", { required: true })}
            placeholder="e.g. Study Buddy"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">Name is required</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <select
            {...register("subject", { required: true })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Subject</option>
            {subjects.map((subj) => (
              <option key={subj} value={subj.toLowerCase()}>
                {subj}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1">Subject is required</p>
          )}
        </div>

        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Topic
          </label>
          <input
            {...register("topic", { required: true })}
            placeholder="e.g. Algebra basics"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.topic && (
            <p className="text-red-500 text-xs mt-1">Topic is required</p>
          )}
        </div>

        {/* Personality */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Personality
          </label>
          <select
            {...register("personality", { required: true })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Personality</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.personality && (
            <p className="text-red-500 text-xs mt-1">
              Personality is required
            </p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration (minutes)
          </label>
          <input
            type="number"
            {...register("duration", { required: true, valueAsNumber: true })}
            placeholder="1"
            min={1}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.duration && (
            <p className="text-red-500 text-xs mt-1">
              Duration must be at least 1 minute
            </p>
          )}
        </div>

        {/* Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Conversation Style
          </label>
          <select
            {...register("style", { required: true })}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Style</option>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="friendly">Friendly</option>
          </select>
          {errors.style && (
            <p className="text-red-500 text-xs mt-1">Style is required</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-200 shadow-md"
        >
          🚀 Create Companion
        </button>
      </form>
    </div>
  );
};

export default CompanionForm;
