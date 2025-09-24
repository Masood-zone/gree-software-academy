"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Edit, Trash2, Plus, GripVertical, Play, Clock } from "lucide-react"
import { useCourseStore } from "@/store/course-store"
import { SectionForm } from "./section-form"
import { LessonForm } from "./lesson-form"
import { LessonCard } from "./lesson-card"
import type { Section, Lesson } from "@/types/course"

interface SectionCardProps {
  section: Section
  isEditing: boolean
  onEdit: () => void
  onCancelEdit: () => void
  onSave: () => void
}

export function SectionCard({ section, isEditing, onEdit, onCancelEdit, onSave }: SectionCardProps) {
  const { updateSection, deleteSection } = useCourseStore()
  const [isAddingLesson, setIsAddingLesson] = useState(false)
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null)

  const handleUpdateSection = (sectionData: Omit<Section, "id" | "lessons">) => {
    updateSection(section.id, sectionData)
    onSave()
  }

  const handleDeleteSection = () => {
    if (window.confirm("Are you sure you want to delete this section and all its lessons?")) {
      deleteSection(section.id)
    }
  }

  const handleAddLesson = (lessonData: Omit<Lesson, "id" | "sectionId">) => {
    // This will be handled by the lesson form component
    setIsAddingLesson(false)
  }

  const totalDuration = section.lessons.reduce((total, lesson) => total + lesson.duration, 0)
  const lessonCount = section.lessons.length

  if (isEditing) {
    return <SectionForm section={section} onSave={handleUpdateSection} onCancel={onCancelEdit} title="Edit Section" />
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
            <div>
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  {lessonCount} lesson{lessonCount !== 1 ? "s" : ""}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onEdit} className="gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteSection}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="lessons" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <span>Lessons</span>
                <Badge variant="secondary">{lessonCount}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {section.lessons.length === 0 && !isAddingLesson && (
                <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">No lessons in this section yet</p>
                    <Button variant="outline" size="sm" onClick={() => setIsAddingLesson(true)} className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add First Lesson
                    </Button>
                  </div>
                </div>
              )}

              {section.lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isEditing={editingLessonId === lesson.id}
                  onEdit={() => setEditingLessonId(lesson.id)}
                  onCancelEdit={() => setEditingLessonId(null)}
                  onSave={() => setEditingLessonId(null)}
                />
              ))}

              {isAddingLesson && (
                <LessonForm
                  sectionId={section.id}
                  onSave={handleAddLesson}
                  onCancel={() => setIsAddingLesson(false)}
                  title="Add New Lesson"
                />
              )}

              {section.lessons.length > 0 && !isAddingLesson && (
                <div className="flex justify-center pt-2">
                  <Button variant="outline" size="sm" onClick={() => setIsAddingLesson(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Lesson
                  </Button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
