
const authService = require("./services/auth");
const authController = require("./controllers/auth");

module.exports = (app) =>
{
    app.post("/signin", authService.requireCreds, authController.signin);
    app.post("/signup", authController.signup);
}