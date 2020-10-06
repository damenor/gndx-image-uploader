const container = document.getElementById('container')

function handleDrop (event) {

  console.log('File(s) dropped', event.dataTransfer.items)
  event.preventDefault()

  if (event.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < event.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (event.dataTransfer.items[i].kind === 'file') {
        var file = event.dataTransfer.items[i].getAsFile();
        console.log('... file[' + i + '].name = ' + file.name);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < event.dataTransfer.files.length; i++) {
      // console.log('... file[' + i + '].name = ' + event.dataTransfer.files[i].name);
      console.log('... file[' + i + '].name = ' + event.target.files[i].name);
    }
  } 
  
  // Pass event to removeDragData for cleanup
  removeDragData(event)

}

function handleDragOver(event) {
  console.log('File(s) in drop zone')
  event.preventDefault()
}

function removeDragData(event) {
  console.log('Removing drag data')

  if (event.dataTransfer.items) {
    // Use DataTransferItemList interface to remove the drag data
    event.dataTransfer.items.clear();
  } else {
    // Use DataTransfer interface to remove the drag data
    event.dataTransfer.clearData();
  }
}

function handleChangeImage(event) {
  handleChangeElement (buildLoading)
  const file = event.target.files[0]
  const formData = new FormData()
  formData.append('image', file)
  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    console.log('response', data)
    handleChangeElement(() => {
      return buildImageUploaded(data.nameFile)
    })
  })
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
      <button onclick="copyToClipboard('${urlImage}')">Copy link</button>
    </div>
  `
}

function copyToClipboard(path) {
  const pathImageInput = document.getElementById('path-image-input')
  console.log(path, pathImageInput)
  pathImageInput.select()
  pathImageInput.setSelectionRange(0, 99999)
  document.execCommand('copy')
}
