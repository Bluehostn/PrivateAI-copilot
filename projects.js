// projects.js

document.addEventListener("DOMContentLoaded", async () => {
  const projectsList = document.getElementById("projects-list");

  // جلب المستخدم الحالي
  const user = await supabase.auth.getUser();
  const userId = user.data?.user?.id;

  if (!userId) {
    window.location.href = "login.html";
    return;
  }

  // جلب المشاريع الخاصة بالمستخدم
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    projectsList.innerHTML = `<p class="error">حدث خطأ أثناء تحميل المشاريع: ${error.message}</p>`;
    return;
  }

  if (data.length === 0) {
    projectsList.innerHTML = `<p>لا توجد مشاريع محفوظة حتى الآن.</p>`;
    return;
  }

  // عرض المشاريع
  projectsList.innerHTML = "";
  data.forEach(project => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";
    projectCard.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <small>📅 ${new Date(project.created_at).toLocaleDateString()}</small>
      <div class="actions">
        <button onclick="editProject('${project.id}')">✏️ تعديل</button>
        <button onclick="deleteProject('${project.id}')">🗑️ حذف</button>
      </div>
    `;
    projectsList.appendChild(projectCard);
  });
});

// حذف مشروع
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

// تعديل مشروع
function editProject(id) {
  window.location.href = `edit-project.html?id=${id}`;
}

// زر تسجيل الخروج
document.getElementById("logout").addEventListener("click", async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) window.location.href = "login.html";
});
