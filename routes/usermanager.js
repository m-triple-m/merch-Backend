const express = require('express');

const Model = require('../models/usermodel');

const router = express.Router();

router.get('/getall', (req, res) => {
   Model.find({})

      .then((data) => {

         console.log('Data successfully fetched');

         res.json(data);
      })
      .catch(() => {

         console.error(err);
         res.send('Failed');
      })


});

router.get('/getbyuserid/:_id', (req, res) => {

   let useid = req.params._id

   Model.find({ _id: useid })

      .then((data) => {

         console.log('Data successfully fetched');

         res.status(200).json(data);
      })
      .catch(() => {

         console.error(err);
         res.send('Failed');
      })


});

router.get('/getbyusername/:username', (req, res) => {

   let usename = req.params.username

   Model.findOne({ username: usename })

      .then((data) => {

         console.log('Data successfully fetched');

         res.status(200).json(data);
      })
      .catch(() => {

         console.error(err);
         res.send('Failed');
      })
})

router.get('/getbyemail/:email', (req, res) => {


   Model.findOne({ email: req.params.email })

      .then((data) => {

         console.log('Data successfully fetched');

         res.status(200).json(data);
      })
      .catch(() => {

         console.error(err);
         res.send('Failed');
      })
})

router.post('/add', (req, res) => {

   console.log('Post add request');

   let data = req.body;
   console.log(data);

   new Model(data).save()
      .then(() => {

         console.log('Data successfully added');

         res.status(200).json("message :success");
      })
      .catch(() => {

         console.error(err);
         res.status(500).json({ err });
      })
})

module.exports = router;
