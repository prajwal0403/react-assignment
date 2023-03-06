const express = require('express');
const { FormDataModel } = require('../Model/formDataModal');
const router = express.Router();

router.post('/add', async (req, res) => {
  const data = req.body;
  try {
    const formData = new FormDataModel(data);
    await formData.save();
    res.send('New Data Added');
  } catch (err) {
    res.status(500).json(err);
    res.send('something went wrong');
  }
});

router.get('/', async (req, res) => {
    try {
      const data = await FormDataModel.find();
      res.send(data);
    } catch (err) {
      console.log(err);
      res.send('something went wrong');
    }
  });

  router.post("/edit", async function (req, res) {
    try {
      await FormDataModel.findOneAndUpdate({_id : req.body.userId} , req.body.payload)
      res.send("FormData Updated Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.post("/delete", async function (req, res) {
    try {
      await FormDataModel.findOneAndDelete({_id : req.body.userId})
      res.send("FormData deleted Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  });  

module.exports = router
