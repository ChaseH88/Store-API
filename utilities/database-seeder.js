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
const User = require('../models/user');
const Location = require('../models/location');
const Product = require('../models/product');
const Image = require('../models/image');
const Tag = require('../models/tags');
const Brand = require('../models/brand');
const Category = require('../models/category');

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


// Import into DB
const importData = async () => {
  try {
    console.log('Importing JSON data...'.white.inverse)
    await User.create(users);
    await Location.create(locations);
    await Product.create(products);
    await Image.create(images);
    await Tag.create(tags);
    await Brand.create(brands);
    await Category.create(categories);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
    console.log('Terminating Script'.red.inverse);
    process.exit();
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Location.deleteMany();
    await Product.deleteMany();
    await Image.deleteMany();
    await Tag.deleteMany();
    await Brand.deleteMany();
    await Category.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}