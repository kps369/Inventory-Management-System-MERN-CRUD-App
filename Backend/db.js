const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/IMS";

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log("Error connecting to mongo",error);
    process.exit(1);
  }
};
module.exports = connectToMongo;
