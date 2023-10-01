const mongoose = require("mongoose");
const connectionString = process.env.NODE_ENV === "production" ? process.env.DB_PATH_PROD : process.env.DB_PATH;
mongoose.connect(connectionString);
module.exports = { mongoose };