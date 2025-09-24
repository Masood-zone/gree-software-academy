import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  Course,
  Section,
  Lesson,
  Assignment,
  CourseSettings,
} from "@/types/course";

interface CourseStore {
  // State
  course: Course;
  currentStep: number;
  isLoading: boolean;

  // Course Info Actions
  setCourseInfo: (info: Partial<Course>) => void;

  // Curriculum Actions
  addSection: (section: Omit<Section, "id">) => void;
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  deleteSection: (sectionId: string) => void;
  reorderSections: (sections: Section[]) => void;

  addLesson: (
    sectionId: string,
    lesson: Omit<Lesson, "id" | "sectionId">
  ) => void;
  updateLesson: (lessonId: string, updates: Partial<Lesson>) => void;
  deleteLesson: (lessonId: string) => void;
  reorderLessons: (sectionId: string, lessons: Lesson[]) => void;

  // Assignment Actions
  addAssignment: (assignment: Omit<Assignment, "id">) => void;
  updateAssignment: (
    assignmentId: string,
    updates: Partial<Assignment>
  ) => void;
  deleteAssignment: (assignmentId: string) => void;

  // Settings Actions
  updateSettings: (settings: Partial<CourseSettings>) => void;

  // Navigation Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;

  // API Actions
  saveCourse: () => Promise<void>;
  loadCourse: (courseId: string) => Promise<void>;

  // Reset
  resetCourse: () => void;
}

const initialCourse: Course = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  price: 0,
  active: false,
  sections: [],
  assignments: [],
  settings: {
    depositPercent: 50,
    installmentDuration: 3,
    showInLibrary: true,
  },
};

export const useCourseStore = create<CourseStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      course: initialCourse,
      currentStep: 0,
      isLoading: false,

      // Course Info Actions
      setCourseInfo: (info) =>
        set(
          (state) => ({
            course: { ...state.course, ...info },
          }),
          false,
          "setCourseInfo"
        ),

      // Curriculum Actions
      addSection: (section) =>
        set(
          (state) => ({
            course: {
              ...state.course,
              sections: [
                ...state.course.sections,
                {
                  ...section,
                  id: crypto.randomUUID(),
                  lessons: [],
                },
              ],
            },
          }),
          false,
          "addSection"
        ),

      updateSection: (sectionId, updates) =>
        set(
          (state) => ({
            course: {
              ...state.course,
              sections: state.course.sections.map((section) =>
                section.id === sectionId ? { ...section, ...updates } : section
              ),
            },
          }),
          false,
          "updateSection"
        ),

      deleteSection: (sectionId) =>
        set(
          (state) => ({
            course: {
              ...state.course,
              sections: state.course.sections.filter(
                (section) => section.id !== sectionId
              ),
            },
          }),
          false,
          "deleteSection"
        ),

      reorderSections: (sections) =>
        set(
          (state) => ({
            course: { ...state.course, sections },
          }),
          false,
          "reorderSections"
        ),

      addLesson: (sectionId, lesson) =>
        set(
          (state) => ({
            course: {
              ...state.course,
              sections: state.course.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      lessons: [
                        ...section.lessons,
                        {
                          ...lesson,
                          id: crypto.randomUUID(),
                          sectionId,
                          order: section.lessons.length,
                        },
                      ],
                    }
                  : section
              ),
            },
          }),
          false,
          "addLesson"
        ),

      updateLesson: (lessonId, updates) =>
        set(
          (state) => ({
            course: {
              ...state.course,
              sections: state.course.sections.map((section) => ({
                ...section,
                lessons: section.lessons.map((lesson) =>
                  lesson.id === lessonId ? { ...lesson, ...updates } : lesson
                ),
              })),
            },
          }),
          false,
          "updateLesson"
        ),

      deleteLesson: (lessonId) =>
        set(
          (state) => ({
            course: {
              ...state.course,
              sections: state.course.sections.map((section) => ({
                ...section,
                lessons: section.lessons.filter(
                  (lesson) => lesson.id !== lessonId
                ),
              })),
            },
          }),
          false,
          "deleteLesson"
        ),

      reorderLessons: (sectionId, lessons) =>
        set(
          (state) => ({
            course: {
              ...state.course,
              sections: state.course.sections.map((section) =>
                section.id === sectionId ? { ...section, lessons } : section
              ),
            },
          }),
          false,
          "reorderLessons"
        ),

      // Assignment Actions
      addAssignment: (assignment) =>
        set(
          (state) => ({
            course: {
              ...state.course,
              assignments: [
                ...state.course.assignments,
                { ...assignment, id: crypto.randomUUID() },
              ],
            },
          }),
          false,
          "addAssignment"
        ),

      updateAssignment: (assignmentId, updates) =>
        set(
          (state) => ({
            course: {
              ...state.course,
              assignments: state.course.assignments.map((assignment) =>
                assignment.id === assignmentId
                  ? { ...assignment, ...updates }
                  : assignment
              ),
            },
          }),
          false,
          "updateAssignment"
        ),

      deleteAssignment: (assignmentId) =>
        set(
          (state) => ({
            course: {
              ...state.course,
              assignments: state.course.assignments.filter(
                (assignment) => assignment.id !== assignmentId
              ),
            },
          }),
          false,
          "deleteAssignment"
        ),

      // Settings Actions
      updateSettings: (settings) =>
        set(
          (state) => ({
            course: {
              ...state.course,
              settings: { ...state.course.settings, ...settings },
            },
          }),
          false,
          "updateSettings"
        ),

      // Navigation Actions
      setCurrentStep: (step) =>
        set({ currentStep: step }, false, "setCurrentStep"),

      nextStep: () =>
        set(
          (state) => ({
            currentStep: Math.min(state.currentStep + 1, 4),
          }),
          false,
          "nextStep"
        ),

      previousStep: () =>
        set(
          (state) => ({
            currentStep: Math.max(state.currentStep - 1, 0),
          }),
          false,
          "previousStep"
        ),

      // API Actions
      saveCourse: async () => {
        set({ isLoading: true });
        try {
          const { course } = get();
          const response = await fetch(
            course.id ? `/api/courses/${course.id}` : "/api/courses",
            {
              method: course.id ? "PATCH" : "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(course),
            }
          );

          if (!response.ok) throw new Error("Failed to save course");

          const savedCourse = await response.json();
          set((state) => ({
            course: { ...state.course, id: savedCourse.id },
            isLoading: false,
          }));
        } catch (error) {
          console.error("Error saving course:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      loadCourse: async (courseId) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`/api/courses/${courseId}`);
          if (!response.ok) throw new Error("Failed to load course");

          const course = await response.json();
          set({ course, isLoading: false });
        } catch (error) {
          console.error("Error loading course:", error);
          set({ isLoading: false });
          throw error;
        }
      },

      // Reset
      resetCourse: () =>
        set({ course: initialCourse, currentStep: 0 }, false, "resetCourse"),
    }),
    { name: "course-store" }
  )
);
