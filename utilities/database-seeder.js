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
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: '../config/config.env' });

// Load models
const User = require('../models/user');

// Connect to DB
mongoose.connect(process.env.DATABASE_DEV, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/sample-data/users.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);
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