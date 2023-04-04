const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://haywelton:9l7UxJPWvpRzRPdu@myservice.oqtkrzk.mongodb.net/?`;

const client = new MongoClient(url);
const userCollection = client.db('startup').collection('users');
const burgerCollection = client.db('startup').collection('burgers');

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function addBurger(burger) {
  burgerCollection.insertOne(burger);
}

function getAllBurgers() {
    // Return all burgers from mongo burger collection
    return burgerCollection.all();
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addBurger,
  getAllBurgers,
};
