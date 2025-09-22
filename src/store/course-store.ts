import { create } from "zustand";
import { nanoid } from "nanoid";

export const useCourseStore = create<
  CourseBuilderState & {
    courseId?: string | null;
    setInfo: (info: Partial<CourseInfo>) => void;
    setCourseId: (id: string) => void;
    addSection: (title: string) => void;
    updateSection: (id: string, updates: Partial<SectionDraft>) => void;
    deleteSection: (id: string) => void;

    addLesson: (sectionId: string, lesson: Omit<LessonDraft, "id">) => void;
    updateLesson: (
      sectionId: string,
      lessonId: string,
      updates: Partial<LessonDraft>
    ) => void;
    deleteLesson: (sectionId: string, lessonId: string) => void;

    updateSettings: (updates: Partial<CourseSettings>) => void;
    reset: () => void;
    setSections: (sections: SectionDraft[]) => void;
  }
>((set) => ({
  courseId: null,
  info: {
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    image: "",
    price: 0,
    isActive: true,
  },
  sections: [],
  settings: {
    depositPercent: 10,
    installmentDuration: 12,
    showInLibrary: true,
  },

  setInfo: (info) =>
    set((state) => ({
      info: { ...state.info, ...info },
    })),

  setCourseId: (id) => set({ courseId: id }),

  setSections: (sections) => set({ sections }),

  addSection: (title) =>
    set((state) => ({
      sections: [
        ...state.sections,
        { id: nanoid(), title, order: state.sections.length + 1, lessons: [] },
      ],
    })),
  updateSection: (id, updates) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),
  deleteSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((s) => s.id !== id),
    })),

  addLesson: (sectionId, lesson) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? { ...s, lessons: [...s.lessons, { id: nanoid(), ...lesson }] }
          : s
      ),
    })),
  updateLesson: (sectionId, lessonId, updates) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l) =>
                l.id === lessonId ? { ...l, ...updates } : l
              ),
            }
          : s
      ),
    })),
  deleteLesson: (sectionId, lessonId) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? { ...s, lessons: s.lessons.filter((l) => l.id !== lessonId) }
          : s
      ),
    })),

  updateSettings: (updates) =>
    set((state) => ({
      settings: { ...state.settings, ...updates },
    })),

  reset: () =>
    set({
      info: {
        title: "",
        slug: "",
        shortDescription: "",
        description: "",
        image: "",
        price: 0,
        isActive: true,
      },
      sections: [],
      settings: {
        depositPercent: 10,
        installmentDuration: 12,
        showInLibrary: true,
      },
    }),
}));
