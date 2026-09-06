const modalSuccess = document.getElementById("modalSuccess");
const openSuccess = document.getElementById("openSuccess");
const closeSuccess = document.getElementById("closeSuccess");

openSuccess.addEventListener("click", () =>
  modalSuccess.classList.add("active"),
);
closeSuccess.addEventListener("click", () =>
  modalSuccess.classList.remove("active"),
);
