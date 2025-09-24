"use client"

import type { ReactNode } from "react"
import { CourseWizardHeader } from "./course-wizard-header"
import { CourseWizardNavigation } from "./course-wizard-navigation"

interface CourseWizardLayoutProps {
  children: ReactNode
  onSave?: () => Promise<void>
  canProceed?: boolean
}

export function CourseWizardLayout({ children, onSave, canProceed }: CourseWizardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CourseWizardHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>

      <CourseWizardNavigation onSave={onSave} canProceed={canProceed} />
    </div>
  )
}
