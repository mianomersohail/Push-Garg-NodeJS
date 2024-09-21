const express = require('express');
const path = require('path');
const router = express.Router();

// Resolve the path to the CV file
const filePath = path.resolve('public', 'Umer_Sohail_CV.pdf');

// // Route to handle CV download
// router.get('/', (req, res) => {
//   // Serve the file for download
//   res.download(filePath, 'Umer_Sohail_CV.pdf', (err) => {
//     if (err) {
//       console.log('Error downloading the CV:', err);
//       res.status(500).send('Error downloading the file.');
//     }
//   });
// });
const fs = require('fs');

router.get('/', (req, res) => {
  // Check if the file exists before serving it
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File does not exist:', err);
      return res.status(404).send('CV not found');
    }

    // Proceed to download if file exists
    res.download(filePath, 'Umer_Sohail_CV.pdf', (err) => {
      if (err) {
        console.log('Error downloading the CV:', err);
        res.status(500).send('Error downloading the file.');
      }
    });
  });
});

module.exports = router;
