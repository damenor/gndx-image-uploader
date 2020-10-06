const path = require('path')
const fs = require('fs')
const { v4:uuidv4 } = require('uuid')

const fileUpload = async (req, res) => {
  // console.log(req.files)
  try {

    const extensionFileValids = ['png', 'jpg', 'jpeg', 'gif', 'svg']

    if (!req.files || Object.keys(req.files).length === 0) throw Error('No files were uploaded')
  
    const file = req.files.image
    const nameSplit = file.name.split('.')
    const extensionFile = nameSplit[nameSplit.length - 1].toLowerCase()
    if(!extensionFileValids.includes(extensionFile)) throw Error('Extension file invalid')
  
    const nameFile = `${uuidv4()}.${extensionFile}`
    const path = `./src/uploads/${nameFile}`
  
    file.mv(path, async error => {
      if (error) throw Error(error)
      res.status(200).json({ msg: 'File uploaded', nameFile })
    })
    
  } catch (error) { res.status(500).json({error, msg: error.message}) }

}

const getImage = (req, res) => {
  const { image } = req.params
  let pathImg = path.join(__dirname, `../uploads/${image}`)
  if(!fs.existsSync(pathImg)) pathImg = path.join(__dirname, `../uploads/no-img.png`)
  res.sendFile(pathImg)
}

module.exports = {
  fileUpload,
  getImage
}
