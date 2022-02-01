const mongoose = require('mongoose')
const Schema = mongoose.Schema



const personSchema = new Schema({
    name: String,
    age :Number,
    favoriteFoods:[String],
    email:String
})


module.exports= person=mongoose.model('person',personSchema);