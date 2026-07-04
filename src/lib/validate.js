export function validateProject(project) {
  if (!project.id) throw new Error("ID wajib diisi");

  if (!project.title) throw new Error("Title wajib diisi");

  if (!project.slug) throw new Error("Slug wajib diisi");

  if (!Array.isArray(project.techStack))
    throw new Error("techStack harus berupa array");

  if (!Array.isArray(project.gallery))
    throw new Error("gallery harus berupa array");

  return true;
}
