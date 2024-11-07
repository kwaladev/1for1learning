"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Flag } from "lucide-react";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MultiSelect } from "./multiselector";
import { useUser } from "@/lib/auth";
import { getTeamForUser, getUser } from "@/lib/db/queries";
import { TeamDataWithMembers } from "@/lib/db/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BookOpen, Atom, BookText, Scroll, Globe, Languages, Code, Palette } from "lucide-react";

const FormDataSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthDate: z.date({
    required_error: "Birth date is required",
  }),
  grade: z.string().min(1, "Grade level is required"),
  curriculum: z.string().min(1, "Curriculum is required"),
  level: z.string().min(1, "Level is required"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
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
    fields: ["firstName", "lastName", "birthDate"],
  },
  {
    id: "Step 2",
    name: "Curriculum",
    fields: ["curriculum", "level", "grade"],
  },
  {
    id: "Step 3",
    name: "Subjects",
    fields: ["subjects", "specificTopics", "preferredSchedule"],
  },
  {
    id: "Step 4",
    name: "Goals",
    fields: ["learningGoals", "specialRequirements"],
  },
  {
    id: "Step 5",
    name: "Submit",
    fields: []
  },
];

export default function MultiStepForm({ teamData }: { teamData: TeamDataWithMembers }) {

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const [birthDate, setBirthDate] = useState<Date>()
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    //reset();
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
              Please provide the student's information.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="teamMember"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Select Team Member
                </label>
                <div className="mt-2">
                  <Select
                    onValueChange={(value) => {
                      const member = teamData.teamMembers.find(m => m.id === Number(value));
                      if (member) {
                        setValue("firstName", member.user.firstName ?? "");
                        setValue("lastName", member.user.lastName ?? "");
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamData.teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id.toString()}>
                          {member.user.firstName} {member.user.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

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

              <div className="sm:col-span-2">
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Birth Date
                </label>
                <div className="mt-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !birthDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {birthDate ? format(birthDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={birthDate}
                        onSelect={
                          (date) => {
                            setBirthDate(date);
                            setValue("birthDate", date);
                          }
                        }
                        required
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.birthDate?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.birthDate.message}
                    </p>
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
              Curriculum Details
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
              Select your curriculum, level, and grade.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
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
              <div className="sm:col-span-2">
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
              <div className="sm:col-span-2">
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
                    <option value="">Select grade</option>
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
              Tell us about your subjects and schedule preferences.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="subjects"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Subjects
                </label>
                <div className="mt-2">
                  <SubjectSelector
                    selectedSubjects={selectedSubjects}
                    setSelectedSubjects={(subjects) => {
                      setSelectedSubjects(subjects);
                      setValue('subjects', subjects);
                    }}
                  />
                  {errors.subjects?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.subjects.message}
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
                    placeholder="E.g., Algebra, Chemistry, Grammar"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="preferredSchedule"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Preferred Schedule
                </label>
                <div className="mt-2">
                  <select
                    id="preferredSchedule"
                    {...register("preferredSchedule")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                  >
                    <option value="">Select schedule preference</option>
                    <option value="weekday_morning">Weekday Mornings</option>
                    <option value="weekday_afternoon">Weekday Afternoons</option>
                    <option value="weekday_evening">Weekday Evenings</option>
                    <option value="weekend_morning">Weekend Mornings</option>
                    <option value="weekend_afternoon">Weekend Afternoons</option>
                  </select>
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
                    placeholder="What do you hope to achieve from these tutoring sessions?"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                  />
                  {errors.learningGoals?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.learningGoals.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="specialRequirements"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Special Requirements
                </label>
                <div className="mt-2">
                  <textarea
                    id="specialRequirements"
                    {...register("specialRequirements")}
                    rows={3}
                    placeholder="Any special requirements or accommodations needed?"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:text-white sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Review & Submit
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
              Please review all information before submitting.
            </p>

            <div className="mt-10 space-y-8">
              {/* Personal Information */}
              <div className="border-b border-gray-900/10 pb-8">
                <h3 className="text-lg font-medium leading-7 text-gray-900 dark:text-white">
                  Personal Information
                </h3>
                <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {watch("firstName")} {watch("lastName")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Birth Date</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {watch("birthDate") ? format(watch("birthDate"), "PPP") : "Not provided"}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Curriculum Details */}
              <div className="border-b border-gray-900/10 pb-8">
                <h3 className="text-lg font-medium leading-7 text-gray-900 dark:text-white">
                  Curriculum Details
                </h3>
                <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Curriculum</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white capitalize">
                      {watch("curriculum")?.replace('_', ' ') || "Not selected"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Level</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white capitalize">
                      {watch("level") || "Not selected"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Grade</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white capitalize">
                      {watch("grade")?.replace('_', ' ') || "Not selected"}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Subject Details */}
              <div className="border-b border-gray-900/10 pb-8">
                <h3 className="text-lg font-medium leading-7 text-gray-900 dark:text-white">
                  Subject Details
                </h3>
                <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Selected Subjects</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      <ul className="list-disc list-inside">
                        {selectedSubjects.map((subject) => (
                          <li key={subject} className="capitalize">
                            {subjectsList.find(s => s.value === subject)?.label || subject}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Specific Topics</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {watch("specificTopics") || "None specified"}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Preferred Schedule</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white capitalize">
                      {watch("preferredSchedule")?.replace(/_/g, ' ') || "Not selected"}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Goals and Requirements */}
              <div className="border-b border-gray-900/10 pb-8">
                <h3 className="text-lg font-medium leading-7 text-gray-900 dark:text-white">
                  Goals and Requirements
                </h3>
                <dl className="mt-4 grid grid-cols-1 gap-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Learning Goals</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {watch("learningGoals") || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Special Requirements</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {watch("specialRequirements") || "None specified"}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-end">
                <Button
                  type="button"
                  onClick={handleSubmit(processForm)}
                  className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  Submit Application
                </Button>
              </div>
            </div>
          </motion.div>
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

const subjectsList = [
  { value: 'mathematics', label: 'Mathematics', icon: BookOpen },
  { value: 'science', label: 'Science', icon: Atom },
  { value: 'english', label: 'English', icon: BookText },
  { value: 'history', label: 'History', icon: Scroll },
  { value: 'geography', label: 'Geography', icon: Globe },
  { value: 'languages', label: 'Languages', icon: Languages },
  { value: 'computer_science', label: 'Computer Science', icon: Code },
  { value: 'arts', label: 'Arts', icon: Palette },
];

function SubjectSelector({
  selectedSubjects,
  setSelectedSubjects
}: {
  selectedSubjects: string[],
  setSelectedSubjects: (subjects: string[]) => void
}) {
  return (
    <div className='w-full'>
      <MultiSelect
        options={subjectsList}
        onValueChange={setSelectedSubjects}
        defaultValue={selectedSubjects}
        placeholder='Select subjects'
        maxCount={5}
      />
      <div className='mt-4'>
        <h2 className='text-sm font-medium text-gray-900 dark:text-white'>Selected Subjects:</h2>
        <ul className='list-disc list-inside mt-2'>
          {selectedSubjects.map((subject) => (
            <li key={subject} className="text-sm text-gray-600 dark:text-gray-300">
              {subjectsList.find(s => s.value === subject)?.label || subject}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}