const container = document.getElementById('container')

function handleDrop (event) {
  event.preventDefault()
  const file =  event.dataTransfer.files[0]
  fetchImage(file)
  removeDragData(event)
}

function handleDragOver(event) {
  event.preventDefault()
}

function removeDragData(event) {
  event.dataTransfer.items ? event.dataTransfer.items.clear() : event.dataTransfer.clearData()
}

function handleChangeImage(event) {
  handleChangeElement (buildLoading)
  const file = event.target.files[0]
  fetchImage(file)
}

function handleChangeElement (builder) {
  container.classList.remove('open')
  container.innerHTML = builder()
  setTimeout(() => container.classList.add('open'), 10)
}

function buildLoading () {
  return `
    <h2>Loading</h2>
    <div id="progress-bar"></div>
  `
}

function buildImageUploaded (nameImage) {
  const urlImage = `${window.location.origin}/upload/${nameImage}`
  return `
    <h2>Upload Successfully!</h2>

    <div class="image-container">
      <img id="image-uploaded" src="${urlImage}" alt="image uploaded">
    </div>

    <div id="path-image">
      <input 
        id="path-image-input"
        type="text" 
        disabled
        value="${urlImage}">
      <button onclick="copyToClipboard()">Copy link</button>
    </div>
  `
}

function copyToClipboard() {
  const pathImageInput = document.getElementById('path-image-input')
  pathImageInput.select()
  document.execCommand('copy')
}

function fetchImage (file) {
  const formData = new FormData()
  formData.append('image', file)
  fetch('/upload', {
    method: 'POST',
    body: formData, 
  })
  .then(res => res.json())
  .then(data => handleChangeElement(() => buildImageUploaded(data.nameFile)))
}
