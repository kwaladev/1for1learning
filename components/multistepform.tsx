"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormDataSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  grade: z.string().min(1, "Grade level is required"),
  curriculum: z.string().min(1, "Curriculum is required"),
  level: z.string().min(1, "Level is required"),
  subject: z.string().min(1, "Subject is required"),
  difficulty: z.string().min(1, "Difficulty level is required"),
  specificTopics: z.string().optional(),
  preferredSchedule: z.string().min(1, "Preferred schedule is required"),
  learningGoals: z.string().min(1, "Learning goals are required"),
  specialRequirements: z.string().optional(),
});

type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Student Info",
    fields: ["firstName", "lastName", "email", "grade"],
  },
  {
    id: "Step 2",
    name: "Curriculum",
    fields: ["curriculum", "level"],
  },
  {
    id: "Step 3",
    name: "Subject",
    fields: ["subject", "difficulty", "specificTopics", "preferredSchedule"],
  },
  {
    id: "Step 4",
    name: "Goals",
    fields: ["learningGoals", "specialRequirements"],
  },
  { id: "Step 5", name: "Complete" },
];

export default function MultiStepForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const { fields } = steps[currentStep];
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <section className="flex flex-col justify-between p-24">
      {/* steps */}
      <nav aria-label="Progress">
        <ol className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className="mt-12" onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Student Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
              Please provide the student's details.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                  />
                  {errors.firstName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                  />
                  {errors.lastName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                  />
                  {errors.email?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="grade"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Grade Level
                </label>
                <div className="mt-2">
                  <select
                    id="grade"
                    {...register("grade")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                  >
                    <option value="">Select grade level</option>
                    <option value="elementary">Elementary School</option>
                    <option value="middle">Middle School</option>
                    <option value="high">High School</option>
                    <option value="college">College</option>
                    <option value="adult">Adult Education</option>
                  </select>
                  {errors.grade?.message && (
                    <p className="mt-2 text-sm text-red-400">{errors.grade.message}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Curriculum & Level
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
              Select your curriculum and study level.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="curriculum"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Curriculum
                </label>
                <div className="mt-2">
                  <select
                    id="curriculum"
                    {...register("curriculum")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                  >
                    <option value="">Select curriculum</option>
                    <option value="american">American</option>
                    <option value="british">British</option>
                    <option value="ib">International Baccalaureate</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.curriculum?.message && (
                    <p className="mt-2 text-sm text-red-400">{errors.curriculum.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="level"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Level
                </label>
                <div className="mt-2">
                  <select
                    id="level"
                    {...register("level")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                  >
                    <option value="">Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  {errors.level?.message && (
                    <p className="mt-2 text-sm text-red-400">{errors.level.message}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Subject Details
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
              Tell us about the subject and your learning preferences.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Subject
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="subject"
                    {...register("subject")}
                    autoComplete="subject"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                  />
                  {errors.subject?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="difficulty"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Difficulty Level
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="difficulty"
                    {...register("difficulty")}
                    autoComplete="difficulty"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                  />
                  {errors.difficulty?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.difficulty.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="specificTopics"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Specific Topics
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="specificTopics"
                    {...register("specificTopics")}
                    autoComplete="specific-topics"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                  />
                  {errors.specificTopics?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.specificTopics.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="preferredSchedule"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Preferred Schedule
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="preferredSchedule"
                    {...register("preferredSchedule")}
                    autoComplete="preferred-schedule"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                  />
                  {errors.preferredSchedule?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.preferredSchedule.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Learning Goals
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
              Share your learning goals and any special requirements.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="learningGoals"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Learning Goals
                </label>
                <div className="mt-2">
                  <textarea
                    id="learningGoals"
                    {...register("learningGoals")}
                    rows={4}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                    placeholder="What do you hope to achieve from these tutoring sessions?"
                  />
                  {errors.learningGoals?.message && (
                    <p className="mt-2 text-sm text-red-400">{errors.learningGoals.message}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 4 && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Request Submitted
            </h2>
            <p className="mt-1 text-sm leading-6 text-green-500">
              Thank you for your tutoring request. We'll match you with a suitable tutor shortly.
            </p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className="mt-8 pt-5">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1  ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-black dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1  ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-black dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
