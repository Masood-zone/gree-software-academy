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
