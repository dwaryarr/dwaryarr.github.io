var dataProjects = [];
const totalProjects = document.getElementById("totalProjects");
var projectList = document.getElementById("projectList");
fetch("projects.json")
  .then((response) => response.json())
  .then((data) => {
    data.reverse();
    if (Array.isArray(data)) {
      dataProjects = data;
      data.forEach((project, index) => {
        const projectHTML = `
                            <div class="col">
                                <div class="card h-100" data-aos="zoom-out-up" data-aos-offset="250" data-aos-duration="1000">
                                    <img src="images/projects/${
                                      project.image
                                    }" class="card-img-top mt-3" alt="${
          project.name
        }" id="project${
          index + 1
        }" style="cursor: pointer;" onclick="displayModal(${index})">
                                    <div class="card-body">
                                        <h5 class="card-title" id="projectname${
                                          index + 1
                                        }">${project.name}</h5>
                                        <p class="card-text text-truncate" id="deskripsi${
                                          index + 1
                                        }">${project.description}</p>
                                        <a href="${
                                          project.link
                                        }" target="_blank" class="mt-auto btn-block text-center" id="prev${
          index + 1
        }">Preview</a>
                                    </div>
                                </div>
                            </div>
                        `;
        projectList.innerHTML += projectHTML;
      });
      totalProjects.innerHTML = data.length;
    } else {
      console.error("Data is not an array");
    }
  })
  .catch((error) => {
    console.error("Error loading JSON data:", error);
  });

function displayModal(indexProject) {
  document.getElementById("imgModal").style.display = "block";
  document.getElementById(
    "modalimg"
  ).src = `images/projects/${dataProjects[indexProject]["image"]}`;
  document.getElementById("prevbtn").href = dataProjects[indexProject]["link"];
  document.getElementById("nameproj").innerHTML =
    dataProjects[indexProject]["name"];
  document.getElementById("caption").innerHTML =
    dataProjects[indexProject]["description"];
}

function closeModal() {
  document.getElementById("imgModal").style.display = "none";
}

// Close modal when clicking outside the modal
window.onclick = function (event) {
  var imgModal = document.getElementById("imgModal");
  if (event.target == imgModal) {
    imgModal.style.display = "none";
  }
};

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Script Google SpreadSheets Contact Form
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwVo7wkShrI0FFSfT1-LVjLGdvrROuA_PlDNacNmcVoOs66HBo0-KrTTN_sybP7eVHe/exec";
const form = document.forms["dwiaryar-portoweb-contact-form"];
const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".my-alert");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btnLoading.classList.toggle("d-none");
  btnKirim.classList.toggle("d-none");
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
  })
    .then((response) => {
      btnLoading.classList.toggle("d-none");
      btnKirim.classList.toggle("d-none");
      myAlert.classList.toggle("d-none");
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});
