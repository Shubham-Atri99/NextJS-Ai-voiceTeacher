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

const CompanionForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: { duration: 1 }, // default 1 minute
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const newCompanion = await createCompanion(data);
    if (newCompanion) {
      redirect(`/companions/${newCompanion.id}`);
    }else{
      redirect(`/`)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create Companion
        </h2>

        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

        <input
          {...register("subject", { required: true })}
          placeholder="Subject"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <input
          {...register("topic", { required: true })}
          placeholder="Topic"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        

        {/* Personality dropdown */}
        <select
          {...register("personality", { required: true })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Personality</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* Duration */}
        <input
          type="number"
          {...register("duration", { required: true, valueAsNumber: true })}
          placeholder="Duration (minutes)"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        {/* Style dropdown */}
        <select
          {...register("style", { required: true })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Style</option>
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
          <option value="friendly">Friendly</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Create Companion
        </button>
      </form>
    </div>
  );
};

export default CompanionForm;
