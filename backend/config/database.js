var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

// Connecting to the database
mongoose
  .connect("mongodb://localhost/smashq", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
