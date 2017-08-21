module.exports = {
  /**
   * port - server port
   */
  port: 8000,

  /**
   * Settings for connecting to the database:
   * host - host mongodb
   * name - db name
   */
  db: {
    host: "mongodb://localhost:27017/parser",
    name:	"newsEditor"
  },
};