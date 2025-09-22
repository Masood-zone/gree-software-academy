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

type DashboardStatsResponse = {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
};
