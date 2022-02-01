const express = require('express')
const app= express() 
const Person = require('./model/person')
const mongoose = require ('mongoose')

const database = []

let arrayOfPeople=[
    {name:"aymen", age:25, favoriteFoods:["ma9rouna"],email:'aymen@gmail.com'},
    {name:"ahmed", age:26, favoriteFoods:["mtabga"],email:'ahmed@gmail.com'},
    {name:"malek", age:32, favoriteFoods:["charmoula"],email:'malek@gmail.com'},
    {name:"ali", age:45, favoriteFoods:["humberger"],email:'ali@gmail.com'},
    {name:"mohamed", age:55, favoriteFoods:["kosksi","humberger"],email:'mohamed@gmail.com'}]



mongoose.connect(`mongodb://localhost:27017/name`,()=>{
    console.log('connected')
})

const person = new Person({
    name: 'moetez',
    age :23,
    favoriteFoods:['lasagne'],
    email:'moetez@gmail.com'
})
person.save()
Person.create(arrayOfPeople)
Person.find({name:"aymen"})
Person.findOne({favoriteFoods:/* $all: */['mtabga']})
Person.findById ({id:"61f9199d5d30cedd070d1b87"})
Person.findOne({name:"ahmed"},(error,data)=>{

    if (error){console.log(error)}
    else{
  data.favoriteFoods.push("humberger")
  data.save()
    }
  })
var query = { name: "ahmed"};
var updatevalue = { $set: { age: 20 } };
var options = { new: true }
Person.findOneAndUpdate(query,updatevalue,options, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Removed User : ", docs);
    }
});
var user_id = '61f9199d5d30cedd070d1b86';
Person.findByIdAndRemove(user_id, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Removed User : ", docs);
    }
});
Person.remove({name:'malek'},(error,docs)=>{
    if (error){console.log(error)}
    else{
        return console.log("removed ", docs)
    }
})

Person.find({favoriteFoods: ["humberger"]})
.sort({name:'asc'})
.limit(2)
.select('age')
.exec((err,docs)=>{
    if (err){console.log(err)}
    else{
        return console.log("these are the ppl",docs)}
})


app.listen(5000,(error)=>{
    if (error) console.log('serveur is not running')
    else console.log ('sever is running on port 5000')
})