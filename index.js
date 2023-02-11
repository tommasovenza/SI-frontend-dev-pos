// things I need
const addBtn = document.querySelector(".plus")
const removeBtn = document.querySelector(".minus")

function loadImages() {
  const fileInput = document.getElementById("fileInput")
  //console.log(fileInput.files[0])

  fileInput.addEventListener("change", (event) => {
    // create a new object FileReader for reading images with FRApi
    const fileReader = new FileReader()
    fileReader.readAsDataURL(fileInput.files[0])

    //console.log(fileReader.result)

    fileReader.addEventListener("load", () => {
      const imageContainer = document.querySelector("#image-container")
      const url = fileReader.result
      console.log(url)
      const image = document.createElement("img")
      image.src = url

      console.log(image)
      console.log(imageContainer)
      imageContainer.appendChild(image)
      //imageContainer.appendChild(image)
    })
  })
}

function addComponent() {
  const container = document.querySelector(".container-component")
  const el = document.createElement("div")
  el.classList.add("component")
  el.innerHTML = `
    <div id="image-container"></div>
    <div class="upload">
      <input type="file" id="fileInput" />
      <button class="btn">Upload</button>
    </div>
  `
  container.appendChild(el)
}
function removeComponent() {
  const container = document.querySelector(".container-component")
  const last = container.lastElementChild
  last.remove()
}
// event listeners
addBtn.addEventListener("click", addComponent)
removeBtn.addEventListener("click", removeComponent)

document.addEventListener("click", (e) => {
  // console.log(e.target.textContent)
  const uploadBtn = document.querySelector(".upload > .btn")

  if (e.target.textContent === "Upload") {
    loadImages()
  }
})
