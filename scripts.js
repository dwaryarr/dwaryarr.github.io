var modal = document.getElementById("imgModal");
var modalImg = document.getElementById("modalimg");
var captionText = document.getElementById("caption");
var img1 = document.getElementById("project1");
var img2 = document.getElementById("project2");
var img3 = document.getElementById("project3");
var img4 = document.getElementById("project4");
var img5 = document.getElementById("project5");
var img6 = document.getElementById("project6");
var img7 = document.getElementById("project7");
var img8 = document.getElementById("project8");
var projectname1 = document.getElementById("projectname1");
var projectname2 = document.getElementById("projectname2");
var projectname3 = document.getElementById("projectname3");
var projectname4 = document.getElementById("projectname4");
var projectname5 = document.getElementById("projectname5");
var projectname6 = document.getElementById("projectname6");
var projectname7 = document.getElementById("projectname7");
var projectname8 = document.getElementById("projectname8");
var desk1 = document.getElementById("deskripsi1");
var desk2 = document.getElementById("deskripsi2");
var desk3 = document.getElementById("deskripsi3");
var desk4 = document.getElementById("deskripsi4");
var desk5 = document.getElementById("deskripsi5");
var desk6 = document.getElementById("deskripsi6");
var desk7 = document.getElementById("deskripsi7");
var desk8 = document.getElementById("deskripsi8");
var prev1 = document.getElementById("prev1");
var prev2 = document.getElementById("prev2");
var prev3 = document.getElementById("prev3");
var prev4 = document.getElementById("prev4");
var prev5 = document.getElementById("prev5");
var prev6 = document.getElementById("prev6");
var prev7 = document.getElementById("prev7");
var prev8 = document.getElementById("prev8");
var prevbtn = document.getElementById("prevbtn");
img1.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    prevbtn.href = prev1.href;
    nameproj.innerHTML = projectname1.innerHTML;
    captionText.innerHTML = desk1.innerHTML;
}
img2.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    prevbtn.href = prev2.href;
    nameproj.innerHTML = projectname2.innerHTML;
    captionText.innerHTML = desk2.innerHTML;
}
img3.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    prevbtn.href = prev3.href;
    nameproj.innerHTML = projectname3.innerHTML;
    captionText.innerHTML = desk3.innerHTML;
}
img4.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    prevbtn.href = prev4.href;
    nameproj.innerHTML = projectname4.innerHTML;
    captionText.innerHTML = desk4.innerHTML;
}
img5.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    prevbtn.href = prev5.href;
    nameproj.innerHTML = projectname5.innerHTML;
    captionText.innerHTML = desk5.innerHTML;
}
img6.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    prevbtn.href = prev6.href;
    nameproj.innerHTML = projectname6.innerHTML;
    captionText.innerHTML = desk6.innerHTML;
}
img7.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    prevbtn.href = prev7.href;
    nameproj.innerHTML = projectname7.innerHTML;
    captionText.innerHTML = desk7.innerHTML;
}
img8.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    prevbtn.href = prev8.href;
    nameproj.innerHTML = projectname8.innerHTML;
    captionText.innerHTML = desk8.innerHTML;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// Script Google SpreadSheets Contact Form
const scriptURL = 'https://script.google.com/macros/s/AKfycbwVo7wkShrI0FFSfT1-LVjLGdvrROuA_PlDNacNmcVoOs66HBo0-KrTTN_sybP7eVHe/exec';
const form = document.forms['dwiaryar-portoweb-contact-form'];
const btnKirim = document.querySelector('.btn-kirim');
const btnLoading = document.querySelector('.btn-loading');
const myAlert = document.querySelector('.my-alert');

form.addEventListener('submit', e => {
    e.preventDefault()
    btnLoading.classList.toggle('d-none')
    btnKirim.classList.toggle('d-none')
    fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => {
            btnLoading.classList.toggle('d-none')
            btnKirim.classList.toggle('d-none')
            myAlert.classList.toggle('d-none')
            form.reset()
            console.log('Success!', response)
        })
        .catch(error => console.error('Error!', error.message))
})