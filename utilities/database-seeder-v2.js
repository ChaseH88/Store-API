/**
 * MongoDB Database Seeder
 * 
 * ===Commands===
 * node database-seeder -d  === Deletes all data in database.
 * node database-seeder -i  === Imports local JSON data into Database
 * 
 */

const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
require('dotenv').config({ path: `${__dirname}\\..\\config\\config.env` });

// Load models
require('../models');
(async () => {
  const models = await mongoose.modelNames();

  console.log(models);
})();


return


const User = require('../models/user');
const Location = require('../models/location');
const Product = require('../models/product');
const Image = require('../models/image');
const Tag = require('../models/tag');
const Brand = require('../models/brand');
const Category = require('../models/category');
const Role = require('../models/role');

// Connect to DB
mongoose.connect(process.env.DATABASE_DEV, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

/**
 * 
 * @param {*} fileName String of the file name
 */
const getData = (fileName) => {
  let path = `${__dirname}/sample-data`;
  return(
    JSON.parse(fs.readFileSync(`${path}/${fileName}.json`), 'utf-8')
  );
}

// Pass the name of the json file to the function 'getData'
const users = getData("users");
const locations = getData("locations");
const products = getData("products");
const images = getData("images");
const tags = getData("tags");
const brands = getData("brands");
const categories = getData("categories");
const roles = getData("roles");


// Import into DB
const importData = async () => {
  try {
    
  }
  catch(err){
    
  }
};

// Delete data
const deleteData = async () => {
  try {
    
  }
  catch(err){

  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}