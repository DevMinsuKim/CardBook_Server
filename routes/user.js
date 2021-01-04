let express = require('express');
let router = express.Router();
const {users} = require('../controllers');
const {auth} = require('../controllers')
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const moment = require('moment');
const momenttz = require('moment-timezone');
const dotenv = require('dotenv');
dotenv.config();

const {accessTokenRequest} = require('../controllers/users/accessTokenRequest')

momenttz().tz("Asia/Seoul").format();
let date = moment().format('YYYY-MM-DD HH:mm:ss')

const S3 = new AWS.S3({
    AWS_ACCESSKEY_ID: process.env.AWS_ACCESSKEY_ID,
    AWS_SECRETKEY: process.env.AWS_SECRETKEY,
    region: "ap-northeast-2"
})

const upload = multer({
    storage: multerS3({
        s3: S3,
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, `user_profile_images/${date} ${file.originalname}`)
        }
    })
})

//POST /users/login
router.post('/login',users.login.post);
//POST /users/signup
router.post('/signup',users.signUp.post);
//POST /users/signout
router.post('/logout',users.signOut.post)
//GET /users/userinfo
router.get('/userinfo',accessTokenRequest,users.userInfo.get);
//GET /users/refreshToken
router.get('/refreshToken',users.refreshToken.get)
//POST /users/userinfo
router.post('/userinfo/modify',users.userInfo.post)
//POST /users/upload
router.post('/upload',upload.single('singup_img_upload'),users.upload.post);
//POST /user/findemail
router.post('/findemail',users.findEmail.post)
//POST /user/findpassword
router.post('/findemail',users.findPassword.post)

// -----------------------Auth Login------------------------------------------------------------
//POST /users/gitlogin
router.post('/gitlogin',auth.gitlogin.post);
//POST /users/kakaologin
router.post('/kakaologin',auth.kakaologin.post);



module.exports = router;