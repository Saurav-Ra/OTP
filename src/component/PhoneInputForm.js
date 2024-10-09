import React, { useState } from 'react';
import OtpInput from './OtpInput';

const PhoneInputForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    // Phone Number Validation
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (regex.test(phoneNumber)) {
      setShowOtp(true);
    } else {
      return;
    }
  };
  const onOtpSubmit = (otp) => {
    console.log('login  otp', otp);
  };
  return (
    <div>
      {!showOtp ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            className="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Phone Number"
          />
          <input type="submit" />
        </form>
      ) : (
        <>
          <p>Enter Otp Sent to {phoneNumber}</p>
          <OtpInput len={4} onOtpSubmit={onOtpSubmit} />
        </>
      )}
    </div>
  );
};

export default PhoneInputForm;
