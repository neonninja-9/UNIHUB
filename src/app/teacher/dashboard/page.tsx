"use client";
import Link from "next/link";
import { AppLayout } from '@/components/app/app-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { Checkbox } from "@/components/ui/checkbox";
import { teacherData, classStudentList, uploadedFiles } from '@/lib/data';
import { BarChart, BookOpen, FileUp, Lightbulb, Send, Users, FileIcon } from 'lucide-react';
import { Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, BarChart as RechartsBarChart } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

const chartData = [
    { subject: 'Math', avg: 75.8, pass: 83 },
    { subject: 'Physics', avg: 78.3, pass: 88 },
    { subject: 'CS', avg: 85.2, pass: 95 },
    { subject: 'English', avg: 81.0, pass: 91 },
];

export default function TeacherDashboardPage() {
  return (
    <AppLayout
      user={{ name: teacherData.name, role: 'Teacher' }}
      navLinks={[
        { href: '/teacher/dashboard', label: 'Dashboard', icon: 'BarChart' },
        { href: '/teacher/insights', label: 'AI Insights', icon: 'Lightbulb' },
      ]}
    >
      <div className="space-y-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Teacher Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5" />Class Performance</CardTitle>
                        <CardDescription>Average scores and pass rates across subjects.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-64 w-full">
                            <RechartsBarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="subject" />
                                <YAxis />
                                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                                <Legend />
                                <Bar dataKey="avg" fill="hsl(var(--primary))" name="Avg. Score" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="pass" fill="hsl(var(--chart-2))" name="Pass %" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter>
                         <Button asChild variant="outline">
                            <Link href="/teacher/insights">
                                <Lightbulb className="mr-2 h-4 w-4" /> Get AI Teaching Strategies
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Manage Attendance</CardTitle>
                        <CardDescription>Mark attendance for today's class.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[80px]">Present</TableHead>
                                <TableHead>Student Name</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {classStudentList.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>
                                        <Checkbox id={`att-${student.id}`} />
                                    </TableCell>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button>Save Attendance</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="lg:col-span-1 space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><FileUp className="h-5 w-5" />Upload Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input type="file" />
                        <Button className="w-full"><FileUp className="mr-2 h-4 w-4" /> Upload File</Button>
                         <h3 className="text-sm font-medium text-muted-foreground pt-4">Recently Uploaded</h3>
                         <ul className="space-y-2">
                            {uploadedFiles.map(file => (
                                <li key={file.name} className="flex items-center gap-2 text-sm">
                                    <FileIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="flex-1 truncate">{file.name}</span>
                                    <span className="text-muted-foreground">{file.size}</span>
                                </li>
                            ))}
                         </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Send className="h-5 w-5" />Post Announcement</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea placeholder="Type your announcement here..." />
                    </CardContent>
                     <CardFooter>
                        <Button className="w-full">Post to Notice Board</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </div>
    </AppLayout>
  );
}
