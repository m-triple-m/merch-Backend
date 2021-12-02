const express = require('express');

const Model = require('../models/ordermodel');

const router = express.Router();

const multer = require('multer')

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './uploads');
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname);
   }
});

const upload = multer({ storage: storage })

//for uploading file
router.post('/upload', upload.single('merch-image'), (req, res) => {
   res.json({ message: "file upload success" })
})

router.post('/add', (req, res) => {

   model = new Model(req.body);
   model.save()
      .then(() => {
         res.status(200).json({ message: 'success' });
      })
      .catch(err => {
         console.error(err);
         res.status(500).json(err);
      })
})

router.get('/getbyuser/:id', (req, res) => {
   Model.find({ user: req.params.id }).populate('user').populate('merch')
      .then((data) => {
         console.log("data fetched successfully...!");
         res.status(200).json(data);
      })
      .catch((r) => {
         console.log(r);
         res.status(500).json(r);
      })
})

router.get('/getall', (req, res) => {
   Model.find().populate('user').populate('merch')
      .then((data) => {
         console.log("data fetched successfully...!");
         res.status(200).json(data);
      })
      .catch((r) => {
         console.log(r);
         res.status(500).json(r);
      })
})

module.exports = router