const express = require('express');
const path = require('path');
const router = express.Router();

// Resolve the path to the CV file
const filePath = path.resolve('public', 'Umer_Sohail_CV.pdf');

// Route to handle CV download
router.get('/', (req, res) => {
  // Serve the file for download
  res.download(filePath, 'Umer_Sohail_CV.pdf', (err) => {
    if (err) {
      console.log('Error downloading the CV:', err);
      res.status(500).send('Error downloading the file.');
    }
  });
});

module.exports = router;
