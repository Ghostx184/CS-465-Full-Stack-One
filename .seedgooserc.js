// .seedgooserc.js
module.exports = {
  modelBaseDirectory:"app_api/database/models",
  //odelBaseDirectory:"app_api/models",
  models: ["*.js", "!db.js"],
  data: "data",
  db: "mongodb://localhost:27017/travlr",
};