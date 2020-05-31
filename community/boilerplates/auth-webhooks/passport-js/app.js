/**
 * Module dependencies.
 */

const express = require("express")
const bodyParser = require("body-parser")
const chalk = require("chalk")
const dotenv = require("dotenv")
const passport = require("passport")
const cors = require("cors")
const expressValidator = require("express-validator")

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: ".env.example" })

/**
 * Controllers (route handlers).
 */
const userController = require("./controllers/user")

/**
 * Create Express server.
 */
const app = express()

/**
 * Express configuration.
 */

// cors configuration
var whitelist = ["http://localhost:3000", "http://example2.com"]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
}
app.set("host", "0.0.0.0")
app.set("port", process.env.PORT || 8081)
app.set("json spaces", 2) // number of spaces for indentation
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(passport.initialize())
app.use(passport.session())

app.post("/login", userController.postLogin)
app.post("/signup", userController.postSignup)
app.get("/webhook", userController.getWebhook)

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(
    "%s App is running at http://localhost:%d in %s mode",
    chalk.green("✓"),
    app.get("port"),
    app.get("env")
  )
  console.log("  Press CTRL-C to stop\n")
})

module.exports = app
