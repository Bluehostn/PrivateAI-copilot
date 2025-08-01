// استخراج ID المشروع من الرابط
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id");

// عناصر النموذج
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const form = document.getElementById("edit-form");
const message = document.getElementById("message");

// جلب بيانات المشروع من Supabase
async function fetchProject() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) {
    message.textContent = "حدث خطأ أثناء جلب بيانات المشروع.";
    console.error(error);
  } else {
    titleInput.value = data.title;
    descriptionInput.value = data.description;
  }
}

// تحديث بيانات المشروع
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedTitle = titleInput.value.trim();
  const updatedDescription = descriptionInput.value.trim();

  const { error } = await supabase
    .from("projects")
    .update({
      title: updatedTitle,
      description: updatedDescription,
    })
    .eq("id", projectId);

  if (error) {
    message.textContent = "❌ فشل في تحديث المشروع.";
    console.error(error);
  } else {
    message.textContent = "✅ تم تحديث المشروع بنجاح!";
  }
});

// تشغيل الوظيفة عند تحميل الصفحة
fetchProject();
