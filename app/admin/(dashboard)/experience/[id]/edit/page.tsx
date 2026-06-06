/**
 * app/admin/experience/[id]/edit/page.tsx — Edit experience.
 */

import { getExperienceById } from "@/modules/experience";
import { redirect } from "next/navigation";
import ExperienceForm from "../../_components/ExperienceForm";

interface EditExperiencePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({ params }: EditExperiencePageProps) {
  const { id } = await params;
  const entry = await getExperienceById(id);

  if (!entry) redirect("/admin/experience");

  return (
    <ExperienceForm
      mode="edit"
      experienceId={id}
      initial={{
        role:        entry.role,
        company:     entry.company,
        duration:    entry.duration,
        description: entry.description,
        impact:      entry.impact,
        current:     entry.current,
        sortOrder:   entry.sortOrder,
      }}
    />
  );
}
