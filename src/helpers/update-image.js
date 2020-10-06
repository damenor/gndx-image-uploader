const fs = require('fs')

const User = require('../models/user')
const Doctor = require('../models/doctor')
const Hospital = require('../models/hospital')

const updateImage = async (collection, id, nameFile) => {
  try{
    switch(collection) {
      case 'users': return handleSaveImageByModel(collection, id, nameFile, User)
      case 'hospitals': return handleSaveImageByModel(collection, id, nameFile, Hospital)
      case 'doctors': return handleSaveImageByModel(collection, id, nameFile, Doctor)
    }
  } catch (error) {  }
}

module.exports = {
  updateImage
}

const handleSaveImageByModel = async (collection, id, nameFile, model) => {
  const value = await model.findById(id)
  if(!value) false
  handleExistFile(collection, value)
  value.img = nameFile
  await value.save()
  return true
}

const handleExistFile = (collection, { img }) => {
  const pathOld = `./uploads/${collection}/${img}`
  if(fs.existsSync(pathOld)) fs.unlinkSync(pathOld)
}
