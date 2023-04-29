import React, { createContext, useState } from 'react';

export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [donationValue, setDonationValue] = useState([]);

  return (
    <DonationContext.Provider value={{ donationValue, setDonationValue }}>
      {children}
    </DonationContext.Provider>
  );
};
