document.getElementById("applyFilter").addEventListener("click", function () {
  const fileInput = document.getElementById("upload");
  const filterType = document.getElementById("filterType").value;

  if (fileInput.files && fileInput.files[0]) {
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("filterType", filterType);

    // Đường dẫn /filter để gửi yêu cầu xử lý lọc ảnh tới backend
    fetch("/filter", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        const imgURL = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = function () {
          const canvas = document.getElementById("filterCanvas");
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = imgURL;
      })
      .catch((error) => console.error("Error:", error));
  }
});

function updateMenuActiveButton(buttonId) {
  const buttons = document.querySelectorAll(".menu-btn");
  buttons.forEach((button) => {
    if (button.id === buttonId) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

updateMenuActiveButton("btn-filter");

document.getElementById("btn-binary").addEventListener("click", function () {
  window.location.href = "../index.html";
});

document.getElementById("btn-filter").addEventListener("click", function () {
  window.location.href = "./filter.html";
});

document
  .getElementById("btn-morphology")
  .addEventListener("click", function () {
    window.location.href = "./morphology.html";
  });

document.getElementById("btn-labeling").addEventListener("click", function () {
  window.location.href = "./labeling.html";
});
