"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, GripVertical, Play, Clock, ExternalLink } from "lucide-react"
import { useCourseStore } from "@/store/course-store"
import { LessonForm } from "./lesson-form"
import type { Lesson } from "@/types/course"

interface LessonCardProps {
  lesson: Lesson
  isEditing: boolean
  onEdit: () => void
  onCancelEdit: () => void
  onSave: () => void
}

export function LessonCard({ lesson, isEditing, onEdit, onCancelEdit, onSave }: LessonCardProps) {
  const { updateLesson, deleteLesson } = useCourseStore()

  const handleUpdateLesson = (lessonData: Omit<Lesson, "id" | "sectionId">) => {
    updateLesson(lesson.id, lessonData)
    onSave()
  }

  const handleDeleteLesson = () => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      deleteLesson(lesson.id)
    }
  }

  if (isEditing) {
    return (
      <LessonForm
        lesson={lesson}
        sectionId={lesson.sectionId}
        onSave={handleUpdateLesson}
        onCancel={onCancelEdit}
        title="Edit Lesson"
      />
    )
  }

  return (
    <Card className="border-l-4 border-l-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium">{lesson.title}</h4>
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {lesson.duration}m
                </Badge>
              </div>
              {lesson.videoUrl && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Play className="w-3 h-3" />
                  <a
                    href={lesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center gap-1"
                  >
                    Video Link
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteLesson}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
