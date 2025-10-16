import Image from 'next/image';
import { AppLayout } from '@/components/app/app-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { studentData, scheduleData, noticeBoardData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Award, BarChart3, BookOpen, Calendar, Clock, DollarSign, FileText, Home, Megaphone, User, Users } from 'lucide-react';

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-1');

export default function StudentDashboardPage() {
  return (
    <AppLayout
      user={{ name: studentData.name, role: 'Student' }}
      navLinks={[
        { href: '/student/dashboard', label: 'Dashboard', icon: 'BarChart3' },
        { href: '/student/dashboard', label: 'My Calendar', icon: 'Calendar' },
        { href: '/student/dashboard', label: 'My Courses', icon: 'BookOpen' },
        { href: '/student/dashboard', label: 'Time Table', icon: 'Clock' },
        { href: '/student/dashboard', label: 'My Faculty', icon: 'Users' },
        { href: '/student/dashboard', label: 'Examination', icon: 'FileText' },
        { href: '/student/dashboard', label: 'Fee Details', icon: 'DollarSign' },
        { href: '/student/dashboard', label: 'Scholarship', icon: 'Award' },
        { href: '/student/dashboard', label: 'Hostel', icon: 'Home' },
      ]}
    >
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
              Welcome, {studentData.name.split(' ')[0]}!
            </h1>
            <p className="text-muted-foreground">
              Here is your academic overview for today.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Attendance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Overall Attendance
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentData.attendance}%</div>
                <p className="text-xs text-muted-foreground">
                  Keep up the great work!
                </p>
                <Progress value={studentData.attendance} className="mt-4 h-2" />
              </CardContent>
            </Card>

            {/* Recent Marks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" /> Recent Marks
                </CardTitle>
                <CardDescription>
                  Your latest scores across different subjects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentData.marks.map((mark) => (
                      <TableRow key={mark.subject}>
                        <TableCell className="font-medium">
                          {mark.subject}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={mark.score > 80 ? 'default' : 'secondary'}
                            className={mark.score > 80 ? 'bg-green-500/20 text-green-700 border-green-500/30' : ''}
                          >
                            {mark.score}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-1">
             {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" /> Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {scheduleData.map((item) => (
                    <li key={item.time} className="flex items-start gap-4">
                      <div className="text-sm font-medium text-muted-foreground w-24">{item.time}</div>
                      <div>
                        <p className="font-semibold">{item.subject}</p>
                        <p className="text-xs text-muted-foreground">{item.teacher}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Notice Board */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5" /> Notice Board
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {noticeBoardData.map((notice) => (
                    <li key={notice.id}>
                        <h4 className="font-semibold">{notice.title}</h4>
                        <p className="text-sm text-muted-foreground">{notice.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{notice.date}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
