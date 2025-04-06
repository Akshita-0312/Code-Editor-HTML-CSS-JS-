let btn = document.getElementById("run");
let clearBtn = document.getElementById("clear-all");
let output = document.getElementsByClassName("output")[0];
let outputHeading = document.querySelector(".outputHeading");

let htmlSaveBtn = document.querySelector(".html-save-icon");
let cssSaveBtn = document.querySelector(".css-save-icon"); 
let jsSaveBtn = document.querySelector(".js-save-icon");
let viewSavedFilesbtn = document.getElementById("view-saved-files");
let savedFilesList = document.getElementById("saved-files-list");

let saveForm = document.querySelector(".save-file");
let confirmBtn = document.querySelector(".confirm-file");

let htmlCreateNew = document.querySelector(".html-create-new");
let cssCreateNew = document.querySelector(".css-create-new");
let jsCreateNew = document.querySelector(".js-create-new");

let htmlUploadIcon = document.querySelector(".html-upload");
let cssUploadIcon = document.querySelector(".css-upload");
let jsUploadIcon = document.querySelector(".js-upload");

let htmlDownloadIcon = document.querySelector(".html-download");
let cssDownloadIcon = document.querySelector(".css-download");
let jsDownloadIcon = document.querySelector(".js-download");

let activeFileType = "";

btn.addEventListener("click", () => {
    let htmlCode = document.getElementById("html-code").value;
    let cssCode = `<style>${document.getElementById("css-code").value}</style>`;
    let jsCode = document.getElementById("js-code").value;
    output.innerHTML = "";
    output.appendChild(outputHeading);
    output.innerHTML += htmlCode + cssCode;
    outputHeading = document.querySelector(".outputHeading");
    outputHeading.style.display = "block"; 

    let existingScript = document.getElementById("dynamicScript");
    if (existingScript) {
        existingScript.remove();
    }
    let scriptTag = document.createElement("script");
    scriptTag.textContent = jsCode;
    scriptTag.id = "dynamicScript";
    document.body.appendChild(scriptTag);
});

clearBtn.addEventListener("click", () => {
    document.getElementById("html-code").value = "";
    document.getElementById("css-code").value = "";
    document.getElementById("js-code").value = "";

    document.querySelector(".html-file-name").textContent = "";
    document.querySelector(".css-file-name").textContent = "";
    document.querySelector(".js-file-name").textContent = "";

    output.innerHTML = `<div class="outputHeading">Output</div>`;
    outputHeading.style.display = "none";
});

(function () {
    let oldLog = console.log;
    console.log = function (message) {
        oldLog(message);
        let logMessage = document.createElement("p");
        logMessage.textContent = message;
        output.appendChild(logMessage);
    };
})();

htmlCreateNew.addEventListener("click", () => showCreateForm("html"));
cssCreateNew.addEventListener("click", () => showCreateForm("css"));
jsCreateNew.addEventListener("click", () => showCreateForm("js"));

function showCreateForm(fileType) {
    activeFileType = fileType;
    saveForm.classList.add("save-file-add");
}

confirmBtn.addEventListener("click", () => {
    let value = document.getElementById("fileName").value.trim();
    let validExtension = true;

    if (value) {
        if (activeFileType === "html" && value.endsWith(".html")) {
            document.querySelector(".html-file-name").innerHTML = value;
            document.getElementById("html-code").value = "";
        } else if (activeFileType === "css" && value.endsWith(".css")) {
            document.querySelector(".css-file-name").innerHTML = value;
            document.getElementById("css-code").value = "";
        } else if (activeFileType === "js" && value.endsWith(".js")) {
            document.querySelector(".js-file-name").textContent = value;
            document.getElementById("js-code").value = "";
        } else {
            validExtension = false;
        }
        document.getElementById("fileName").value = "";
    }

    if (!validExtension) {
        alert("Give the correct extension of the file.");
    }
    saveForm.classList.remove("save-file-add");
});

function downloadFile(filename, content) {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

htmlDownloadIcon.addEventListener("click", () => {
    const content = document.getElementById("html-code").value;
    const filename = document.querySelector(".html-file-name").textContent.trim();
    downloadFile(filename, content);
});

cssDownloadIcon.addEventListener("click", () => {
    const content = document.getElementById("css-code").value;
    const filename = document.querySelector(".css-file-name").textContent.trim();
    downloadFile(filename, content);
});

jsDownloadIcon.addEventListener("click", () => {
    const content = document.getElementById("js-code").value;
    const filename = document.querySelector(".js-file-name").textContent.trim();
    downloadFile(filename, content);
});

let htmlUploadInput = document.getElementById("html-upload-input");
let cssUploadInput = document.getElementById("css-upload-input");
let jsUploadInput = document.getElementById("js-upload-input");

htmlUploadIcon.addEventListener("click", () => htmlUploadInput.click());
cssUploadIcon.addEventListener("click", () => cssUploadInput.click());
jsUploadIcon.addEventListener("click", () => jsUploadInput.click());

htmlUploadInput.addEventListener("change", () => {
    handleFileUpload(htmlUploadInput.files[0], "html-code", ".html-file-name");
});
cssUploadInput.addEventListener("change", () => {
    handleFileUpload(cssUploadInput.files[0], "css-code", ".css-file-name");
});
jsUploadInput.addEventListener("change", () => {
    handleFileUpload(jsUploadInput.files[0], "js-code", ".js-file-name");
});

function handleFileUpload(file, textareaId, fileNameClass) {
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById(textareaId).value = e.target.result;
            document.querySelector(fileNameClass).textContent = file.name;
        };
        reader.readAsText(file);
    }
}

htmlSaveBtn.addEventListener("click", () => saveFile("html"));
cssSaveBtn.addEventListener("click", () => saveFile("css"));
jsSaveBtn.addEventListener("click", () => saveFile("js"));

function saveFile(fileType) {
    let fileName = document.querySelector(`.${fileType}-file-name`).textContent.trim();
    let fileContent = document.getElementById(`${fileType}-code`).value;
    if (fileName) {
        localStorage.setItem(fileName, fileContent);
        alert(`${fileName} saved successfully!`);
    } else {
        alert("Please enter a file name first.");
    }
}

// viewSavedFilesbtn.addEventListener("click", () => {
//     savedFilesList.innerHTML = "";
//     let closeWrapper = document.createElement("div");
//     closeWrapper.style.textAlign = "center";
//     closeWrapper.style.marginBottom = "10px";

//     let closeBtn = document.createElement("span");
//     closeBtn.textContent = "❌";
//     closeBtn.style.cursor = "pointer";
//     closeBtn.style.fontSize = "18px";
//     closeBtn.addEventListener("click", () => {
//         savedFilesList.style.display = "none";
//     });

//     closeWrapper.appendChild(closeBtn);
//     savedFilesList.appendChild(closeWrapper);

//     for (let i = 0; i < localStorage.length; i++) {
//         let fileName = localStorage.key(i);
//         if (fileName.endsWith(".html") || fileName.endsWith(".css") || fileName.endsWith(".js")) {
//             let fileItem = document.createElement("div");
//             fileItem.classList.add("saved-file-item");
//             fileItem.style.display = "flex";
//             fileItem.style.justifyContent = "space-between";
//             fileItem.style.alignItems = "center";
//             fileItem.style.marginBottom = "8px";

//             let fileNameSpan = document.createElement("span");
//             fileNameSpan.textContent = fileName;
//             fileNameSpan.style.cursor = "pointer";
//             fileNameSpan.addEventListener("click", () => loadFile(fileName));

//             let deleteBtn = document.createElement("button");
//             deleteBtn.textContent = "🗑️";
//             deleteBtn.style.cursor = "pointer";
//             deleteBtn.style.border = "none";
//             deleteBtn.style.background = "transparent";
//             deleteBtn.style.fontSize = "16px";
//             deleteBtn.addEventListener("click", (e) => {
//                 e.stopPropagation();
//                 if (confirm(`Are you sure you want to delete "${fileName}"?`)) {
//                     localStorage.removeItem(fileName);
//                     fileItem.remove();
//                 }
//             });

//             fileItem.appendChild(fileNameSpan);
//             fileItem.appendChild(deleteBtn);
//             savedFilesList.appendChild(fileItem);
//         }
//     }

//     savedFilesList.style.display = savedFilesList.style.display === "none" ? "block" : "none";
// });


viewSavedFilesbtn.addEventListener("click", () => {
  savedFilesList.innerHTML = "";

  let closeWrapper = document.createElement("div");
  closeWrapper.style.textAlign = "center";
  closeWrapper.style.marginBottom = "10px";

  // Create a Font Awesome close icon
  let closeBtn = document.createElement("i");
  closeBtn.className = "fas fa-times"; // Close icon
  closeBtn.style.cursor = "pointer";
  closeBtn.style.fontSize = "18px";
  closeBtn.title = "Close";
  closeBtn.addEventListener("click", () => {
      savedFilesList.style.display = "none";
  });

  closeWrapper.appendChild(closeBtn);
  savedFilesList.appendChild(closeWrapper);

  for (let i = 0; i < localStorage.length; i++) {
      let fileName = localStorage.key(i);
      if (fileName.endsWith(".html") || fileName.endsWith(".css") || fileName.endsWith(".js")) {
          let fileItem = document.createElement("div");
          fileItem.classList.add("saved-file-item");
          fileItem.style.display = "flex";
          fileItem.style.justifyContent = "space-between";
          fileItem.style.alignItems = "center";
          fileItem.style.marginBottom = "8px";

          let fileNameSpan = document.createElement("span");
          fileNameSpan.textContent = fileName;
          fileNameSpan.style.cursor = "pointer";
          fileNameSpan.addEventListener("click", () => loadFile(fileName));

          // Font Awesome delete icon
          let deleteBtn = document.createElement("i");
          deleteBtn.className = "fas fa-trash";
          deleteBtn.style.cursor = "pointer";
          deleteBtn.style.fontSize = "16px";
          deleteBtn.title = "Delete file";
          deleteBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              if (confirm(`Are you sure you want to delete "${fileName}"?`)) {
                  localStorage.removeItem(fileName);
                  fileItem.remove();
              }
          });

          fileItem.appendChild(fileNameSpan);
          fileItem.appendChild(deleteBtn);
          savedFilesList.appendChild(fileItem);
      }
  }

  savedFilesList.style.display = savedFilesList.style.display === "none" ? "block" : "none";
});



function loadFile(fileName) {
    let fileContent = localStorage.getItem(fileName);
    if (fileName.endsWith(".html")) {
        document.querySelector(".html-file-name").textContent = fileName;
        document.getElementById("html-code").value = fileContent;
    } else if (fileName.endsWith(".css")) {
        document.querySelector(".css-file-name").textContent = fileName;
        document.getElementById("css-code").value = fileContent;
    } else if (fileName.endsWith(".js")) {
        document.querySelector(".js-file-name").textContent = fileName;
        document.getElementById("js-code").value = fileContent;
    }
    alert(`${fileName} loaded into the editor`);
    savedFilesList.style.display = "none";
}
