const addBtn = document.querySelector(".plus")
const removeBtn = document.querySelector(".minus")

function addComponent() {
  const container = document.querySelector(".container-component")
  const el = document.createElement("div")
  el.classList.add("component")
  container.appendChild(el)
}
function removeComponent() {
  const container = document.querySelector(".container-component")
  const last = container.lastElementChild
  last.remove()
}

addBtn.addEventListener("click", () => {
  addComponent()
})
removeBtn.addEventListener("click", () => {
  removeComponent()
})
