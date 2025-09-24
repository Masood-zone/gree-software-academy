export interface Lesson {
  id: string;
  title: string;
  duration: number; // in minutes
  videoUrl: string;
  order: number;
  sectionId: string;
}

export interface Section {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Assignment {
  id: string;
  title: string;
  instructions: string;
  fileUpload?: File;
  link?: string;
}

export interface CourseSettings {
  depositPercent: number;
  installmentDuration: number; // in months
  showInLibrary: boolean;
}

export interface Course {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  image?: string;
  active: boolean;
  sections: Section[];
  assignments: Assignment[];
  settings: CourseSettings;
}

export interface CourseFormData {
  courseInfo: {
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    price: number;
    image?: string;
    active: boolean;
  };
  curriculum: {
    sections: Section[];
  };
  assignments: Assignment[];
  settings: CourseSettings;
}
