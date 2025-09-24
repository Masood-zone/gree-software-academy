"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCourseStore } from "@/store/course-store";
import { SectionForm } from "./section-form";
import { SectionCard } from "./section-card";
import type { Section } from "@/types/course";

interface CurriculumBuilderProps {
  onSave: () => Promise<void>;
}

export function CurriculumBuilder({ onSave }: CurriculumBuilderProps) {
  const { course, addSection, reorderSections } = useCourseStore();
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  const handleAddSection = (sectionData: Omit<Section, "id" | "lessons">) => {
    addSection({
      ...sectionData,
      order: course.sections.length,
    });
    setIsAddingSection(false);
  };

  const handleSectionReorder = (sections: Section[]) => {
    const reorderedSections = sections.map((section, index) => ({
      ...section,
      order: index,
    }));
    reorderSections(reorderedSections);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Course Curriculum</CardTitle>
        <CardDescription>
          Organize your course content into sections and lessons
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {course.sections.length === 0 && !isAddingSection && (
          <div className="text-center py-12 border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <div className="space-y-4">
              <div className="text-muted-foreground">
                <p className="text-lg font-medium">No sections yet</p>
                <p className="text-sm">
                  Start building your curriculum by adding your first section
                </p>
              </div>
              <Button
                onClick={() => setIsAddingSection(true)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add First Section
              </Button>
            </div>
          </div>
        )}

        {course.sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            isEditing={editingSectionId === section.id}
            onEdit={() => setEditingSectionId(section.id)}
            onCancelEdit={() => setEditingSectionId(null)}
            onSave={() => setEditingSectionId(null)}
          />
        ))}

        {isAddingSection && (
          <SectionForm
            onSave={handleAddSection}
            onCancel={() => setIsAddingSection(false)}
            title="Add New Section"
          />
        )}

        {course.sections.length > 0 && !isAddingSection && (
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              onClick={() => setIsAddingSection(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </Button>
          </div>
        )}

        {course.sections.length > 0 && (
          <div className="flex justify-end pt-6 border-t">
            <Button onClick={onSave}>Save Curriculum</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
