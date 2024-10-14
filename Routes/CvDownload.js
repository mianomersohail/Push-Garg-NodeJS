const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const filePath = path.resolve('public', 'Umer_Sohail_CV.pdf');
router.get('/', (req, res) => {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File does not exist:', err);
      return res.status(404).send('CV not found');
    }

    res.download(filePath, 'Umer_Sohail_CV.pdf', (err) => {
      if (err) {
        console.log('Error downloading the CV:', err);
        res.status(500).send('Error downloading the file.');
      }
    });
  });
});

module.exports = router;
