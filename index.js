// things I need Initially
const addBtn = document.querySelector(".plus")
const removeBtn = document.querySelector(".minus")
let counter = 0

class Component {
  constructor(id) {
    this.id = id
  }
}

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
    //console.log(numOfImages)
    this.changeInputSlider(numberID, numOfImages)
  }
  changeInputSlider(numberID, imagesNumber) {
    this.selectActiveImage(numberID)
    const component = document.getElementById(numberID)

    const inputRange = component.querySelector("#range")
    const label = component.querySelector("#label")
    inputRange.max = imagesNumber
    inputRange.value = imagesNumber
    label.textContent = imagesNumber
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
    label.textContent = numberOfRightSlide
    images.forEach((img) => img.classList.remove("active"))
    images[numberOfRightSlide - 1].classList.add("active")
  }
}

function addComponent() {
  counter++

  // Instantiante a New Component
  const component = new Component(counter)
  // Instantiate a New UI Object
  const ui = new UI()
  // console.log(component)
  // console.log(ui)

  ui.createComponent(component)

  // loadImages()
}
function removeComponent() {
  counter--
  const container = document.querySelector(".container-component")
  const last = container.lastElementChild
  last.remove()
}
// event listeners
addBtn.addEventListener("click", addComponent)
removeBtn.addEventListener("click", removeComponent)
