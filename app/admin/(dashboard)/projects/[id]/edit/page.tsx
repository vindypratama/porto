/**
 * app/admin/projects/[id]/edit/page.tsx — Halaman edit project.
 */

import { getProjectById } from "@/modules/projects";
import { redirect } from "next/navigation";
import ProjectForm from "../../_components/ProjectForm";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) redirect("/admin/projects");

  return (
    <ProjectForm
      mode="edit"
      projectId={id}
      initial={{
        title:       project.title,
        subtitle:    project.subtitle,
        description: project.description,
        domain:      project.domain,
        highlights:  project.highlights,
        tech:        project.tech,
        gradient:    project.gradient,
        icon:        project.icon,
        imageUrl:    project.imageUrl ?? "",
        liveUrl:     project.liveUrl ?? "",
        githubUrl:   project.githubUrl ?? "",
        order:       project.order,
        published:   project.published,
      }}
    />
  );
}
