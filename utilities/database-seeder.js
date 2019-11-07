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

const users = getData("users");
const locations = getData("locations");
const products = getData("products");


// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    await Location.create(locations);
    await Product.create(products);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Location.deleteMany();
    await Product.deleteMany(products);
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