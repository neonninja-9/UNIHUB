import { AppLayout } from '@/components/app/app-layout';
import { InsightsForm } from '@/components/teacher/insights-form';
import { teacherData } from '@/lib/data';
import { BarChart, Lightbulb, BrainCircuit } from 'lucide-react';

export default function InsightsPage() {
  return (
    <AppLayout
      user={{ name: teacherData.name, role: 'Teacher' }}
      navLinks={[
        { href: '/teacher/dashboard', label: 'Dashboard', icon: BarChart },
        { href: '/teacher/insights', label: 'AI Insights', icon: Lightbulb },
      ]}
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
            <BrainCircuit className="mx-auto h-12 w-12 text-primary" />
            <h1 className="font-headline text-4xl font-bold tracking-tight">Class Performance Insights</h1>
            <p className="text-muted-foreground text-lg">
            Leverage AI to analyze student performance data and generate personalized teaching strategies to enhance learning outcomes.
            </p>
        </div>
        <InsightsForm />
      </div>
    </AppLayout>
  );
}
