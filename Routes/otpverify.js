routes.post('/', async (req, res) => {
    const { email, otp } = req.body;
  
    // Find the user with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }
  
    if (user.otp === otp && user.otpExpiry > Date.now()) {
     
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save(); 

      return res.status(200).send('User account created successfully');
    } else {
      return res.status(400).send('Invalid or expired OTP');
    }
  });
  
  module.exports = routes;