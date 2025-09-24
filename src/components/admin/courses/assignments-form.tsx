"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Upload, Link, FileText, X } from "lucide-react"
import { useCourseStore } from "@/store/course-store"
import type { Assignment } from "@/types/course"

const assignmentSchema = z.object({
  title: z.string().min(1, "Assignment title is required").max(100, "Title must be less than 100 characters"),
  instructions: z
    .string()
    .min(1, "Instructions are required")
    .max(1000, "Instructions must be less than 1000 characters"),
  link: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
})

type AssignmentFormData = z.infer<typeof assignmentSchema>

interface AssignmentsFormProps {
  onSave: () => Promise<void>
}

export function AssignmentsForm({ onSave }: AssignmentsFormProps) {
  const { course, addAssignment, updateAssignment, deleteAssignment } = useCourseStore()
  const [isAddingAssignment, setIsAddingAssignment] = useState(false)
  const [editingAssignmentId, setEditingAssignmentId] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const form = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      title: "",
      instructions: "",
      link: "",
    },
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  const handleAddAssignment = async (data: AssignmentFormData) => {
    let fileUrl = ""

    // Handle file upload if there's a file
    if (uploadedFile) {
      const formData = new FormData()
      formData.append("file", uploadedFile)

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          const { url } = await response.json()
          fileUrl = url
        }
      } catch (error) {
        console.error("File upload failed:", error)
      }
    }

    addAssignment({
      title: data.title,
      instructions: data.instructions,
      link: data.link || undefined,
      fileUpload: uploadedFile || undefined,
    })

    form.reset()
    setUploadedFile(null)
    setIsAddingAssignment(false)
  }

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignmentId(assignment.id)
    form.reset({
      title: assignment.title,
      instructions: assignment.instructions,
      link: assignment.link || "",
    })
  }

  const handleUpdateAssignment = async (data: AssignmentFormData) => {
    if (!editingAssignmentId) return

    updateAssignment(editingAssignmentId, {
      title: data.title,
      instructions: data.instructions,
      link: data.link || undefined,
    })

    form.reset()
    setEditingAssignmentId(null)
  }

  const handleDeleteAssignment = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      deleteAssignment(assignmentId)
    }
  }

  const handleCancel = () => {
    form.reset()
    setUploadedFile(null)
    setIsAddingAssignment(false)
    setEditingAssignmentId(null)
  }

  const onSubmit = editingAssignmentId ? handleUpdateAssignment : handleAddAssignment

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Course Assignments</CardTitle>
        <CardDescription>Add assignments and resources for your students</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {course.assignments.length === 0 && !isAddingAssignment && (
          <div className="text-center py-12 border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <div className="space-y-4">
              <div className="text-muted-foreground">
                <p className="text-lg font-medium">No assignments yet</p>
                <p className="text-sm">Add assignments to help students practice and apply what they learn</p>
              </div>
              <Button onClick={() => setIsAddingAssignment(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add First Assignment
              </Button>
            </div>
          </div>
        )}

        {/* Assignment List */}
        {course.assignments.map((assignment) => (
          <Card key={assignment.id} className="border-l-4 border-l-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{assignment.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      <FileText className="w-3 h-3 mr-1" />
                      Assignment
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{assignment.instructions}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {assignment.link && (
                      <a
                        href={assignment.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary"
                      >
                        <Link className="w-3 h-3" />
                        External Link
                      </a>
                    )}
                    {assignment.fileUpload && (
                      <span className="flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        File Attached
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEditAssignment(assignment)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteAssignment(assignment.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Assignment Form */}
        {(isAddingAssignment || editingAssignmentId) && (
          <Card className="border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">
                {editingAssignmentId ? "Edit Assignment" : "Add New Assignment"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assignment Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter assignment title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instructions</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide detailed instructions for this assignment"
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Clear instructions help students understand what's expected</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>External Link (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/resource" {...field} />
                        </FormControl>
                        <FormDescription>Link to external resources or submission forms</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* File Upload */}
                  {!editingAssignmentId && (
                    <div className="space-y-4">
                      <div>
                        <FormLabel>Assignment File (optional)</FormLabel>
                        <FormDescription>Upload a file with assignment details or resources</FormDescription>
                      </div>

                      {uploadedFile ? (
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{uploadedFile.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </Badge>
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={removeFile}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Click to upload assignment file</p>
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx,.txt,.zip"
                              onChange={handleFileUpload}
                              className="max-w-xs mx-auto"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={handleCancel} className="gap-2 bg-transparent">
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                    <Button type="submit" className="gap-2">
                      <Plus className="w-4 h-4" />
                      {editingAssignmentId ? "Update Assignment" : "Add Assignment"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {course.assignments.length > 0 && !isAddingAssignment && !editingAssignmentId && (
          <div className="flex justify-center pt-4">
            <Button variant="outline" onClick={() => setIsAddingAssignment(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Assignment
            </Button>
          </div>
        )}

        {course.assignments.length > 0 && (
          <div className="flex justify-end pt-6 border-t">
            <Button onClick={onSave}>Save Assignments</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
