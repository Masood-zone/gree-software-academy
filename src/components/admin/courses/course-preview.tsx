"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Clock,
  Play,
  FileText,
  Link,
  Upload,
  CheckCircle,
  AlertCircle,
  Library,
  CreditCard,
} from "lucide-react"
import { useCourseStore } from "@/store/course-store"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CoursePreviewProps {
  onSubmit: () => Promise<void>
}

export function CoursePreview({ onSubmit }: CoursePreviewProps) {
  const { course, isLoading } = useCourseStore()

  // Calculate totals
  const totalLessons = course.sections.reduce((total, section) => total + section.lessons.length, 0)
  const totalDuration = course.sections.reduce(
    (total, section) => total + section.lessons.reduce((sectionTotal, lesson) => sectionTotal + lesson.duration, 0),
    0,
  )
  const totalHours = Math.floor(totalDuration / 60)
  const totalMinutes = totalDuration % 60

  // Validation checks
  const validationIssues = []
  if (!course.title) validationIssues.push("Course title is required")
  if (!course.description) validationIssues.push("Course description is required")
  if (course.price <= 0) validationIssues.push("Course price must be greater than 0")
  if (course.sections.length === 0) validationIssues.push("At least one section is required")
  if (totalLessons === 0) validationIssues.push("At least one lesson is required")

  const isValid = validationIssues.length === 0

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Course Preview</CardTitle>
          <CardDescription>Review your course before publishing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Validation Status */}
          {validationIssues.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <p className="font-medium">Please fix the following issues before publishing:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {validationIssues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {isValid && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Your course is ready to be published!</AlertDescription>
            </Alert>
          )}

          {/* Course Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{course.title || "Untitled Course"}</h3>
                <p className="text-muted-foreground text-sm mb-4">{course.shortDescription}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.sections.length} section{course.sections.length !== 1 ? "s" : ""}
                  </div>
                  <div className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    {totalLessons} lesson{totalLessons !== 1 ? "s" : ""}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {totalHours}h {totalMinutes}m
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={course.active ? "default" : "secondary"}>{course.active ? "Active" : "Inactive"}</Badge>
                <Badge variant={course.settings.showInLibrary ? "outline" : "secondary"}>
                  <Library className="w-3 h-3 mr-1" />
                  {course.settings.showInLibrary ? "Public" : "Private"}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              {course.image && (
                <div className="aspect-video rounded-lg overflow-hidden border">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Course Price</span>
                    <span className="text-2xl font-bold">${course.price.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Initial Deposit ({course.settings.depositPercent}%)</span>
                      <span>${((course.price * course.settings.depositPercent) / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Payment</span>
                      <span>
                        $
                        {(
                          (course.price - (course.price * course.settings.depositPercent) / 100) /
                          course.settings.installmentDuration
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Duration</span>
                      <span>{course.settings.installmentDuration} months</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Course Description */}
          <div>
            <h4 className="font-semibold mb-3">Course Description</h4>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {course.description || "No description provided"}
            </p>
          </div>

          <Separator />

          {/* Curriculum Preview */}
          <div>
            <h4 className="font-semibold mb-4">Curriculum</h4>
            {course.sections.length === 0 ? (
              <p className="text-muted-foreground">No sections added yet</p>
            ) : (
              <div className="space-y-4">
                {course.sections.map((section, sectionIndex) => (
                  <Card key={section.id} className="border-l-4 border-l-primary/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium">
                          {sectionIndex + 1}. {section.title}
                        </h5>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Play className="w-3 h-3" />
                            {section.lessons.length}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {section.lessons.reduce((total, lesson) => total + lesson.duration, 0)}m
                          </span>
                        </div>
                      </div>
                      {section.lessons.length > 0 && (
                        <div className="space-y-2">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="flex items-center justify-between text-sm pl-4">
                              <span className="text-muted-foreground">
                                {sectionIndex + 1}.{lessonIndex + 1} {lesson.title}
                              </span>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {lesson.duration}m{lesson.videoUrl && <Play className="w-3 h-3 text-primary" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Assignments Preview */}
          <div>
            <h4 className="font-semibold mb-4">Assignments</h4>
            {course.assignments.length === 0 ? (
              <p className="text-muted-foreground">No assignments added</p>
            ) : (
              <div className="space-y-3">
                {course.assignments.map((assignment, index) => (
                  <Card key={assignment.id} className="border-l-4 border-l-secondary/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium mb-1">
                            Assignment {index + 1}: {assignment.title}
                          </h5>
                          <p className="text-sm text-muted-foreground mb-2">{assignment.instructions}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {assignment.link && (
                              <span className="flex items-center gap-1">
                                <Link className="w-3 h-3" />
                                External Link
                              </span>
                            )}
                            {assignment.fileUpload && (
                              <span className="flex items-center gap-1">
                                <Upload className="w-3 h-3" />
                                File Attached
                              </span>
                            )}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          Assignment
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Course Settings Summary */}
          <div>
            <h4 className="font-semibold mb-4">Course Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span className="font-medium">Payment Settings</span>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>Deposit: {course.settings.depositPercent}%</div>
                    <div>Installments: {course.settings.installmentDuration} months</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Library className="w-4 h-4 text-primary" />
                    <span className="font-medium">Visibility</span>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>Library: {course.settings.showInLibrary ? "Visible" : "Hidden"}</div>
                    <div>Status: {course.active ? "Active" : "Inactive"}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t">
            <Button onClick={onSubmit} disabled={!isValid || isLoading} size="lg" className="gap-2">
              {isLoading ? "Creating Course..." : "Create Course"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
