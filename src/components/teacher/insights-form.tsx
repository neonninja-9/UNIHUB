"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { getAIStrategies } from "@/lib/actions";
import { classPerformanceData } from "@/lib/data";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Loader, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required."),
  gradeLevel: z.string().min(1, "Grade level is required."),
  classPerformanceData: z.string().min(10, "Performance data is too short."),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Lightbulb className="mr-2 h-4 w-4" />
      )}
      Generate Strategies
    </Button>
  );
}

function StrategyDisplay({ strategies }: { strategies: string }) {
    const strategyList = strategies
      .split(/\n\d+\.\s/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => (s.startsWith('1. ') ? s.substring(3) : s));

    if (strategyList.length === 0 || (strategyList.length === 1 && strategyList[0] === strategies)) {
        return <p>{strategies}</p>
    }
  
    return (
      <ol className="list-decimal space-y-2 pl-5">
        {strategyList.map((strategy, index) => (
          <li key={index}>{strategy}</li>
        ))}
      </ol>
    );
  }

export function InsightsForm() {
  const [state, formAction] = useActionState(getAIStrategies, { message: "" });
  const formRef = useRef<HTMLFormElement>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "Physics",
      gradeLevel: "12",
      classPerformanceData: classPerformanceData,
    },
  });

  useEffect(() => {
    if(state.message && !state.strategies) {
        // Handle form errors
    }
    if (state.message && state.strategies) {
        formRef.current?.reset();
    }
  }, [state])

  return (
    <Card className="shadow-lg">
      <Form {...form}>
        <form
          ref={formRef}
          action={formAction}
          className="space-y-4"
        >
          <CardHeader>
            <CardTitle>Generate Teaching Strategies</CardTitle>
            <CardDescription>
              Input class details and performance data to receive AI-powered
              recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Physics" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gradeLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade Level</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="classPerformanceData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Performance Data</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={8}
                      placeholder="Paste student performance data here..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include metrics like scores, attendance, and general
                    observations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             {state.issues && (
             <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                   <ul className="list-disc pl-5">
                     {state.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                   </ul>
                </AlertDescription>
            </Alert>
          )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Form>
      {state?.strategies && (
         <>
         <Separator />
         <CardContent className="pt-6">
             <h3 className="font-headline text-xl font-semibold mb-4">Recommended Strategies</h3>
             <div className="prose prose-sm max-w-none text-foreground">
                 <StrategyDisplay strategies={state.strategies} />
             </div>
         </CardContent>
     </>
      )}
    </Card>
  );
}
