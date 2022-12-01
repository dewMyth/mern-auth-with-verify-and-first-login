const otpGenerator = require("otp-generator");
const OTP_LENGTH = 6;
const OTP_CONFIG = {
  digits: 6,
  alphabets: false,
  upperCase: false,
  specialChars: false,
};

module.exports.generateOTP = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
};
