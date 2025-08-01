async function deleteProject(id) {
  if (!confirm("هل أنت متأكد من حذف المشروع؟")) return;

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    alert("حدث خطأ أثناء الحذف: " + error.message);
  } else {
    location.reload();
  }
}
