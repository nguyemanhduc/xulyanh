const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const thresholdSlider = document.getElementById("threshold");
const thresholdValue = document.getElementById("thresholdValue");
const uploadButton = document.getElementById("upload");
let originalImage = null;

thresholdSlider.addEventListener("input", function () {
  thresholdValue.textContent = thresholdSlider.value;
  if (originalImage) {
    applyThreshold(originalImage, thresholdSlider.value);
  }
});

uploadButton.addEventListener("change", function (event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      originalImage = img;
      applyThreshold(img, thresholdSlider.value);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
});

// Hàm áp dụng nhị phân hóa ảnh
function applyThreshold(img, threshold) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const value = gray >= threshold ? 255 : 0;
    data[i] = data[i + 1] = data[i + 2] = value;
  }

  ctx.putImageData(imageData, 0, 0);
}

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

updateMenuActiveButton("btn-binary");

document.getElementById("btn-binary").addEventListener("click", function () {
  window.location.href = "./index.html";
});

document.getElementById("btn-filter").addEventListener("click", function () {
  window.location.href = "./menu/filter.html";
});

document
  .getElementById("btn-morphology")
  .addEventListener("click", function () {
    window.location.href = "./menu/morphology.html";
  });

document.getElementById("btn-labeling").addEventListener("click", function () {
  window.location.href = "./menu/labeling.html";
});
