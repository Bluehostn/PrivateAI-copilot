// add-project.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("project-form");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = form.title.value.trim();
    const description = form.description.value.trim();

    if (!title || !description) {
      message.textContent = "يرجى ملء جميع الحقول.";
      message.style.color = "red";
      return;
    }

    // إرسال البيانات إلى Supabase
    const { data, error } = await supabase
      .from("projects")
      .insert([{ title, description }]);

    if (error) {
      message.textContent = "حدث خطأ أثناء حفظ المشروع: " + error.message;
      message.style.color = "red";
    } else {
      message.textContent = "✅ تم حفظ المشروع بنجاح!";
      message.style.color = "green";
      form.reset();
    }
  });
});
