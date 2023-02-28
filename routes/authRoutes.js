const router = require("express").Router();
const {register,login} = require("../controllers/authCrolllers")

//create a new user
router.post("/register",register )

//login a user
router.post("/login",login )

module.exports = router