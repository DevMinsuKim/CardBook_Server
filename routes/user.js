let multer = require('multer');
let upload = multer({ dest:'images/users'})
let express = require('express');
let router = express.Router();

const {users} = require('../controllers');
//POST /users/signin
router.post('/login',users.signIn.post);
//POST /users/signup
router.post('/signup',users.signUp.post);
//POST /users/signout
router.post('/logout',users.signOut.post)
//GET /users/userinfo
router.get('/userinfo',upload.single(),users.userInfo.get);
//POST /users/userinfo
router.post('/userinfo/modify',users.userInfo.post)
module.exports = router;