"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";

const formSchema = z.object({
  amazonId: z.string().min(1, { message: "Please enter your Amazon ID." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["student", "teacher"], {
    required_error: "You need to select a role.",
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("student");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amazonId: "",
      password: "",
      role: "student",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
        title: "Login Successful",
        description: `Redirecting to ${values.role} dashboard...`,
    });

    // Mock authentication and redirect
    if (values.role === "student") {
      router.push("/student/dashboard");
    } else {
      router.push("/teacher/dashboard");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Sign in as</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedRole(value);
                  }}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  <FormItem>
                    <RadioGroupItem value="student" id="student" className="peer sr-only" />
                    <FormLabel htmlFor="student" className={cn(
                      "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all duration-300",
                      "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    )}>
                      Student
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <RadioGroupItem value="teacher" id="teacher" className="peer sr-only" />
                    <FormLabel htmlFor="teacher" className={cn(
                      "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all duration-300",
                      "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    )}>
                      Teacher
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amazonId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amazon ID</FormLabel>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <FormControl>
                  <Input placeholder="your-amazon-id" className="pl-10" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
               <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <FormControl>
                  <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-bold">
          <User className="mr-2 h-4 w-4" /> Sign In
        </Button>
      </form>
    </Form>
  );
}
