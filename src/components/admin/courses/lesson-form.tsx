"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, X } from "lucide-react"
import { useCourseStore } from "@/store/course-store"
import type { Lesson } from "@/types/course"

const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required").max(100, "Title must be less than 100 characters"),
  duration: z.number().min(1, "Duration must be at least 1 minute").max(600, "Duration cannot exceed 10 hours"),
  videoUrl: z.string().url("Please enter a valid video URL").optional().or(z.literal("")),
})

type LessonFormData = z.infer<typeof lessonSchema>

interface LessonFormProps {
  lesson?: Lesson
  sectionId: string
  onSave: (data: Omit<Lesson, "id" | "sectionId">) => void
  onCancel: () => void
  title: string
}

export function LessonForm({ lesson, sectionId, onSave, onCancel, title }: LessonFormProps) {
  const { addLesson, updateLesson } = useCourseStore()

  const form = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: lesson?.title || "",
      duration: lesson?.duration || 0,
      videoUrl: lesson?.videoUrl || "",
    },
  })

  const onSubmit = (data: LessonFormData) => {
    const lessonData = {
      title: data.title,
      duration: data.duration,
      videoUrl: data.videoUrl || "",
      order: lesson?.order || 0,
    }

    if (lesson) {
      updateLesson(lesson.id, lessonData)
    } else {
      addLesson(sectionId, lessonData)
    }

    onSave(lessonData)
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter lesson title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="600"
                        placeholder="30"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>Lesson duration in minutes</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                    </FormControl>
                    <FormDescription>Link to lesson video</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onCancel} className="gap-2 bg-transparent">
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" />
                Save Lesson
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
