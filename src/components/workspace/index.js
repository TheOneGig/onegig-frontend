import React, { useState } from 'react';
import CompanyProfileForm from './CompanyProfileForm';


const App = () => {
  const [companyProfile, setCompanyProfile] = useState({
  });

  // Save the profile (You can replace this with your API call or storage logic)
  const saveProfile = (profileData) => {
    setCompanyProfile(profileData);
  };

  return (
    <div className="container mt-5">
      <h1>Company Workspace Profile</h1>
      <CompanyProfileForm existingProfile={companyProfile} onSave={saveProfile} />
    </div>
  );
};

export default App;
