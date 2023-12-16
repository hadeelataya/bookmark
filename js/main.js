var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
var deleteBtns;
var visitBtns;
var bookmarks = [];

if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (var x = 0; x < bookmarks.length; x++) {
    display_Bookmark(x);
  }
}

function display_Bookmark(i) {
  var userURL = bookmarks[i].siteURL;
  var httpsRegex = /^https?:\/\//g;
  if (httpsRegex.test(userURL)) {
    validURL = userURL;
    fixedURL = validURL
      .split("")
      .splice(validURL.match(httpsRegex)[0].length)
      .join("");
  } else {
    var fixedURL = userURL;
    validURL = `https://${userURL}`;
  }
  var newBookmark = `
              <tr>
                <td>${i + 1}</td>
                <td>${bookmarks[i].siteName}</td>              
                <td>
                  <button class="btn btn-visit" data-index="${i}">
                    <i class="fa-solid fa-eye pe-2"></i>VISIT
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" data-index="${i}">
                    <i class="fa-solid fa-trash-can"></i>
                    DELETE
                  </button>
                </td>
            </tr>
            `;
  tableContent.innerHTML += newBookmark;

  deleteBtns = document.querySelectorAll(".btn-delete");
  if (deleteBtns) {
    for (var j = 0; j < deleteBtns.length; j++) {
      deleteBtns[j].addEventListener("click", function(e) {
        delete_bookmark(e);
      });
    }
  }

  visitBtns = document.querySelectorAll(".btn-visit");
  if (visitBtns) {
    for (var l = 0; l < visitBtns.length; l++) {
      visitBtns[l].addEventListener("click", function (e) {
        visit_Website(e);
      });
    }
  }
}

function submitbutton() 

{
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName: (siteName.value),
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    display_Bookmark(bookmarks.length - 1);
    clearInputs();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } else {
    boxModal.classList.remove("d-none");
  }
};

function visit_Website(e) {
  var websiteIndex = e.target.dataset.index;
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
    open(bookmarks[websiteIndex].siteURL);
  } else {
    open(`https://${bookmarks[websiteIndex].siteURL}`);
  }
}

function delete_bookmark(e) {
    tableContent.innerHTML = "";
    var deletedIndex = e.target.dataset.index;
    bookmarks.splice(deletedIndex, 1);
    for (var k = 0; k < bookmarks.length; k++) {
      display_Bookmark(k);
    }
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  }  
function closeModal() {
  boxModal.classList.add("d-none");
}
closeBtn.addEventListener("click", closeModal);

function clearInputs() {
    siteName.value = "";
    siteURL.value = "";
  }

  var nameRegex = /^\w{3,}(\s+\w+)*$/;
  var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
  validation(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validation(siteURL, urlRegex);
});

function validation(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}