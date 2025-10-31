import { Student } from "@/lib/types";

interface WelcomeCardProps {
  student?: Student;
}

export function WelcomeCard({ student }: WelcomeCardProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-800 dark:bg-gradient-to-r dark:from-[#8b5cf6] dark:to-[#ec4899] rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-2 text-white dark:text-white">
        Good morning, {student?.name || "Student"} 👋
      </h2>
      <p className="text-purple-200 dark:text-white">
        Welcome back! Here's your dashboard for today.
      </p>
    </div>
  );
}
