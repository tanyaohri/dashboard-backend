const express  = require("express"),
      router   = express.Router();

const {
    store_user,
    is_valid_auth_request,
    check_user
} = require("./../controller/authController");

router.post("/register", is_valid_auth_request , store_user);
router.post("/login", is_valid_auth_request, check_user);

module.exports=router;