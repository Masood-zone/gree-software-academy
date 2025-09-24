"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, X } from "lucide-react"
import type { Section } from "@/types/course"

const sectionSchema = z.object({
  title: z.string().min(1, "Section title is required").max(100, "Title must be less than 100 characters"),
})

type SectionFormData = z.infer<typeof sectionSchema>

interface SectionFormProps {
  section?: Section
  onSave: (data: Omit<Section, "id" | "lessons">) => void
  onCancel: () => void
  title: string
}

export function SectionForm({ section, onSave, onCancel, title }: SectionFormProps) {
  const form = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: section?.title || "",
    },
  })

  const onSubmit = (data: SectionFormData) => {
    onSave({
      title: data.title,
      order: section?.order || 0,
    })
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter section title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onCancel} className="gap-2 bg-transparent">
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" />
                Save Section
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
