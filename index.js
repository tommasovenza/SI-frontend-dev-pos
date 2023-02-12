// things I need Initially
const addBtn = document.querySelector(".plus")
const removeBtn = document.querySelector(".minus")

function showRightImage(numberOfRightSlide) {
  const images = document.querySelectorAll(".image-container > img")
  const label = document.querySelector("#label")
  label.textContent = numberOfRightSlide
  images.forEach((img) => img.classList.remove("active"))
  images[numberOfRightSlide - 1].classList.add("active")
}

function selectActiveImage() {
  const containerImages = document.querySelector(".image-container")
  const images = document.querySelectorAll(".image-container > img")
  images.forEach((img) => img.classList.remove("active"))

  // get last image
  const active = containerImages.lastElementChild
  active.classList.add("active")
}

function changeInputSlider(number) {
  selectActiveImage()

  const inputRange = document.getElementById("range")
  const label = document.getElementById("label")
  inputRange.max = number
  inputRange.value = number
  label.textContent = number

  console.log(inputRange)

  inputRange.addEventListener("click", (e) => {
    const number = parseInt(e.target.value)
    showRightImage(number)
  })
}
function countImages() {
  const images = document.querySelectorAll(".image-container > img")
  const numOfImages = images.length

  changeInputSlider(numOfImages)
}

function loadImages() {
  const fileInput = document.getElementById("fileInput")

  fileInput.addEventListener("change", (event) => {
    // create a new object FileReader for reading images with FRApi
    const fileReader = new FileReader()
    fileReader.readAsDataURL(fileInput.files[0])

    fileReader.addEventListener("load", () => {
      const inputRange = document.querySelector(".input-range")
      const imageContainer = document.querySelector(".image-container")
      inputRange.classList.remove("d-none")
      imageContainer.classList.remove("d-none")

      const url = fileReader.result
      console.log(url)
      const image = document.createElement("img")
      image.src = url
      imageContainer.appendChild(image)
      countImages()
    })
  })
}

function addComponent() {
  const container = document.querySelector(".container-component")
  const el = document.createElement("div")
  el.classList.add("component")
  el.innerHTML = `
    <div class="input-range d-none">
      <label for="range" id="label">1</label>
      <input type="range" id="range" class="range" min="1" max="1" value="1" />
    </div>  
    <div class="image-container d-none"></div>
    <div class="upload">
      <input type="file" id="fileInput" />
    </div>
  `
  container.appendChild(el)
  loadImages()
}
function removeComponent() {
  const container = document.querySelector(".container-component")
  const last = container.lastElementChild
  last.remove()
}
// event listeners
addBtn.addEventListener("click", addComponent)
removeBtn.addEventListener("click", removeComponent)
