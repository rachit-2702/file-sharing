const dropZone = document.querySelector(".drop-zone")
const fileInput= document.querySelector("#fileInput")
const browsebtn= document.querySelector(".browseBtn")
const bgProgress = document.querySelector(".bg-progress")
const percentDiv = document.querySelector("#percent")
const progressBar = document.querySelector(".progress-bar")
const progressContainer = document.querySelector(".progress-container")
const fileURLInput=document.querySelector('#fileURL');
const sharingContainer = document.querySelector(".sharing-container");
const copyBtn = document.querySelector("#copyBtn");
const emailForm = document.querySelector("#emailform") 


const baseURL = "https://file-share-api.herokuapp.com";
const uploadURL = `${baseURL}/api/files`;
const emailURL = `${baseURL}/api/files/send`;

dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';

    if(!dropZone.classList.contains("dragged"))
        dropZone.classList.add("dragged")
        return false;
})

dropZone.addEventListener("dragleave",(e)=>{
    // e.preventDefault();

    // if(!dropZone.classList.contains("dragged"))
        dropZone.classList.remove("dragged")
})
dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged")
    files=e.dataTransfer.files;
    console.log(e.dataTransfer);
    if(files.length){
        fileInput.files = files;
        console.log("drop");
        uploadFile();
    }
    else {
        console.log("no");
    }
})

fileInput.addEventListener("change",()=>{
    console.log("change");
    uploadFile();
})

browsebtn.addEventListener("click",()=>{
    fileInput.click()
})

copyBtn.addEventListener("click", ()=>{
fileURLInput.select()
document.execCommand("copy")
})

const uploadFile =()=>{
    
    progressContainer.style.display="block";
    console.log("file");
    const file= fileInput.files[0];
    const formData = new FormData()
    formData.append("myfile",file)

    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange= ()=>{
        if(xhr.readyState=== XMLHttpRequest.DONE){
            console.log(xhr.response);
            onUploadsuccess(JSON.parse(xhr.response));
        }
    }


    xhr.upload.onprogress= updateProgress;
    
    xhr.open("POST", uploadURL);
    xhr.send(formData);
}

const updateProgress= (e)=>{
    console.log(e.loaded);
    const percent =Math.round((e.loaded / e.total)*100);
    bgProgress.style.width= `${percent}%`
    percentDiv.innerHTML=percent;
    progressBar.style.transform= `scaleX(${percent/100})`

}

const onUploadsuccess =({file:url})=>{
    fileInput.value="";
    emailForm[2].removeAttribute("disabled");
    progressContainer.style.display="none";
    sharingContainer.style.display="block";

    fileURLInput.value=url;
}


emailForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const formData ={
        uuid: fileURLInput.value.split("/").splice(-1,1)[0],
        emailTo: emailForm.elements["to-email"].value,
        emailFrom:  emailForm.elements["from-email"].value,
    };

emailForm[2].setAttribute("disabled", "true");

fetch(emailURL, {
    method: "POST",
    headers:{
        "content-Type": "application/json"
    },
    body: JSON.stringify(formData)
})
.then(res=> res.json())
.then(({success})=>{
        if(success){
            sharingContainer.style.display="none";
        }
    }
)

})