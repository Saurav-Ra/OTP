import React, { useEffect, useRef, useState } from 'react';

const OtpInput = ({ len = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(len).fill(''));
  const inputrefs = useRef([]);
  const handleChange = (index, e) => {
    // onOtpSubmit(otp.join(''));
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    // Submit trigger
    const combinedOtp = newOtp.join('');
    if (combinedOtp.length === len) {
      onOtpSubmit(combinedOtp);
    }
    // Move to next input if current field is filled
    if (value && index < len - 1 && inputrefs.current[index + 1]) {
      inputrefs.current[index + 1].focus();
    }
  };
  const handleClick = (index) => {
    inputrefs.current[index].setSelectionRange(1, 1);
  };
  const handleKeyDown = (index, e) => {
    if (
      e.key === 'Backspace' &&
      !otp[index] &&
      index > 0 &&
      inputrefs.current[index - 1]
    ) {
      inputrefs.current[index - 1].focus();
    }
  };
  useEffect(() => {
    if (inputrefs.current[0]) {
      inputrefs.current[0].focus();
    }
  }, []);
  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            type="text"
            ref={(input) => (inputrefs.current[index] = input)}
            value={value}
            key={index}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
