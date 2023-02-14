// things I need Initially
const addBtn = document.querySelector(".plus")
const removeBtn = document.querySelector(".minus")
const switchBtn = document.querySelector(".switch")
const darkmode = document.querySelector(".dark-mode")
let counter = 0

// Component Class
class Component {
  constructor(id) {
    this.id = id
  }
}
// UI Class
class UI {
  createComponent(item) {
    const container = document.querySelector(".container-component")
    const el = document.createElement("div")
    el.classList.add("component")
    el.id = item.id
    el.innerHTML = `
    <div class="input-range d-none">
      <label for="range" id="label">1</label>
      <input type="range" id="range" class="range" min="1" max="1" value="1" />
    </div>
    <div class="image-container d-none"></div>
    <div class="upload">
      <input type="file" class="file-input" />
    </div>
    `
    container.appendChild(el)
    this.loadImages(item.id)
  }
  loadImages(numberID) {
    const component = document.getElementById(numberID)
    const fileInput = component.querySelector(".file-input")
    console.log(fileInput)

    fileInput.addEventListener("change", (event) => {
      // create a new object FileReader for reading images with FRApi
      const fileReader = new FileReader()
      fileReader.readAsDataURL(fileInput.files[0])

      fileReader.addEventListener("load", () => {
        const inputRange = component.querySelector(".input-range")
        const imageContainer = component.querySelector(".image-container")
        inputRange.classList.remove("d-none")
        imageContainer.classList.remove("d-none")

        const url = fileReader.result
        const image = document.createElement("img")
        image.src = url
        imageContainer.appendChild(image)
        this.countImages(numberID)
      })
    })
  }
  countImages(numberID) {
    const component = document.getElementById(numberID)
    const images = component.querySelectorAll(".image-container > img")
    const numOfImages = images.length

    this.changeInputSlider(numberID, numOfImages)
  }
  changeInputSlider(numberID, imagesNumber) {
    this.selectActiveImage(numberID)
    const component = document.getElementById(numberID)

    const inputRange = component.querySelector("#range")
    const label = component.querySelector("#label")
    inputRange.max = imagesNumber
    inputRange.value = imagesNumber
    label.textContent = `Uploaded ${imagesNumber} images`
    console.log(inputRange)

    inputRange.addEventListener("click", (e) => {
      const number = parseInt(e.target.value)
      this.showRightImage(numberID, number)
    })
  }
  selectActiveImage(numberID) {
    const component = document.getElementById(numberID)
    const containerImages = component.querySelector(".image-container")
    const images = component.querySelectorAll(".image-container > img")
    images.forEach((img) => img.classList.remove("active"))

    // get last image
    const active = containerImages.lastElementChild
    active.classList.add("active")
  }
  showRightImage(numberID, numberOfRightSlide) {
    const component = document.getElementById(numberID)
    const images = component.querySelectorAll(".image-container > img")
    const label = component.querySelector("#label")
    label.textContent = `Selected ${numberOfRightSlide}/${images.length} slide`
    images.forEach((img) => img.classList.remove("active"))
    images[numberOfRightSlide - 1].classList.add("active")
  }
}
// functions
function addComponent() {
  counter++
  // Instantiate a New Component
  const component = new Component(counter)
  // Instantiate a New UI Object
  const ui = new UI()

  // Rendering Component
  ui.createComponent(component)
}
function removeComponent() {
  counter--
  const container = document.querySelector(".container-component")
  const last = container.lastElementChild
  last.remove()
}
function changeLayout() {
  const container = document.querySelector(".container-component")
  container.classList.toggle("change-layout")
}
function changeMode() {
  const body = document.body
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode")
  } else {
    body.classList.add("dark-mode")
  }
}

// event listeners
addBtn.addEventListener("click", addComponent)
removeBtn.addEventListener("click", removeComponent)
switchBtn.addEventListener("click", changeLayout)
darkmode.addEventListener("click", changeMode)
// zoom
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("active")) {
    e.target.classList.toggle("zoom")
  }
})
