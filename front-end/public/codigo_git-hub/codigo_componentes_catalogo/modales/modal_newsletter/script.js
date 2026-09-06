const modalNews = document.getElementById("modalNews");
const openNews = document.getElementById("openNews");
const closeNews = document.getElementById("closeNews");

openNews.addEventListener("click", () => modalNews.classList.add("active"));
closeNews.addEventListener("click", () => modalNews.classList.remove("active"));
modalNews.addEventListener("click", (e) => {
  if (e.target === modalNews) modalNews.classList.remove("active");
});
