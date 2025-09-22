type UserType = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
};

type LoginInput = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: true;
};

type RegisterInput = {
  fullName: string;
  email: string;
  phone?: string;
  birthday?: string | null;
  password: string;
};

type RegisterResponse = {
  success: true;
  userId: string;
};

type FormValues = {
  fullName: string;
  email: string;
  phone?: string;
  birthday?: string;
  password: string;
  confirmPassword: string;
};

type ForgotPasswordInput = {
  email: string;
};
type ForgotPasswordResponse = {
  message: string;
};

type VerifyOtpInput = {
  token: string;
  otp: string;
};
type VerifyOtpResponse = {
  success: boolean;
  message?: string;
  redirect?: string;
};

type Link = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

type UserDashboardStatsResponse = {
  totalCourses: number;
  saveToLearnWallet: number;
};

type AdminDashboardStatsResponse = {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
};

type Course = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  isActive: boolean;
  price: number;
  image: string;
  slug: string;
  curriculum: string;
  sections: number;
  enrollments: number;
  createdAt: string;
  updatedAt: string;
};

type Section = {
  id: string;
  title: string;
  order: number;
  courseId: string;
  course: Course;
  lessons: number;
  createdAt: string;
  updatedAt: string;
};

type Lesson = {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  duration: number;
  order: number;
  section: Section;
  sectionId: string;
  progress: LessonProgress;
  createdAt: string;
  updatedAt: string;
};

type LessonProgress = {
  id: string;
  lessonId: string;
  userId: string;
  lesson: Lesson;
  completed: boolean;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
};

type CourseSettings = {
  depositPercent: number;
  installmentDuration: number;
  showInLibrary: boolean;
};

type CourseBuilderState = {
  info: CourseInfo;
  sections: SectionDraft[];
  settings: CourseSettings;
};

type LessonDraft = {
  id: string;
  title: string;
  content?: string;
  videoUrl?: string;
  duration?: number;
  order: number;
};

type SectionDraft = {
  id: string;
  title: string;
  order: number;
  lessons: LessonDraft[];
};

type CourseInfo = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  price: number;
  isActive: boolean;
};
