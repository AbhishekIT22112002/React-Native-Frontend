const OTP = require('../models/otpModel');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const sendOtp = async (req, res) => {
  const { mobile } = req.body;

  const otpCode = Math.floor(1000 + Math.random() * 9000);

  const newOtp = new OTP({ mobile, otp: otpCode });
  await newOtp.save();

  // Read the HTML template
  const templatePath = path.join(__dirname, '../templates/otpTemplate.html');
  let htmlTemplate = fs.readFileSync(templatePath, 'utf8');
  htmlTemplate = htmlTemplate.replace('{{otpCode}}', otpCode);

  // Simulating OTP sending via email (replace with SMS API if needed)
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${mobile}`, // Use an SMS Gateway in real-world apps
    subject: 'Your OTP Code',
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).json({ error: 'Error sending OTP' });
    }
    res.status(200).json({ message: 'OTP sent successfully' });
  });
};

const verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  const otpEntry = await OTP.findOne({ mobile, otp });

  if (!otpEntry) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  res.status(200).json({ message: 'OTP verified successfully' });
};

module.exports = { sendOtp, verifyOtp };
