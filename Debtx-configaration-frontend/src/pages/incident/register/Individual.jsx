// Purpose: This template is used for the agent registration page.
// Created Date: 2024-12-02
// Created By: Chathundi Sakumini (sakuminic@gmail.com)
// Last Modified Date: 2024-12-03
// Modified By: 
// Version: 
// Dependencies: React
// Related Files: bulk.jsx, individual.jsx
// Notes: completed individual.jsx using plugin with tailwind styles

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalStyle from "../../../assets/prototype/GlobalStyle";

const IncidentRegister = () => {
  const [formData, setFormData] = useState({
    accountNo: '',
    actionType: '',
    calendarMonth: '1',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <h1 className={GlobalStyle.headingLarge}>Incident Register</h1>
    <div className="flex items-center justify-center p-8">
    <div className="relative bg-[#E1E4F5] rounded-lg p-8 max-w-3xl">
  <h2 className={`${GlobalStyle.headingMedium} mb-6`}>Incident Details</h2>

  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="space-y-6">
      {/* Account Number */}
      <div className="flex flex-col gap-4">
        <label className={`${GlobalStyle.headingSmall}`}>
          Account No
        </label>
        <input
          type="text"
          className={`${GlobalStyle.inputText} text-lg p-3`}
          value={formData.accountNo}
          onChange={(e) =>
            setFormData({ ...formData, accountNo: e.target.value })
          }
        />
      </div>

      {/* Action Type */}
      <div className="flex flex-col gap-4">
        <label className={`${GlobalStyle.headingSmall}`}>
          Action
        </label>
        <select
          className={`${GlobalStyle.selectBox} text-lg p-3 w-full`}
          value={formData.actionType}
          onChange={(e) =>
            setFormData({ ...formData, actionType: e.target.value })
          }
        >
          <option value="">Action Type</option>
          <option value="arrears">Collect Arrears</option>
          <option value="arrears&CPE">Collect Arrears and CPE</option>
          <option value="CPE">Collect CPE</option>
        </select>
      </div>

      {/* Calendar Month */}
      <div className="flex flex-col gap-4">
        <label className={`${GlobalStyle.headingSmall}`}>
          Calendar Month
        </label>
        <input
          type="number"
          min="1"
          max="12"
          className={`${GlobalStyle.inputText} text-lg p-3`}
          value={formData.calendarMonth}
          onChange={(e) =>
            setFormData({ ...formData, calendarMonth: e.target.value })
          }
        />
      </div>

      {/* Date without Icon */}
      <div className="flex flex-col gap-4">
        <label className={`${GlobalStyle.headingSmall}`}>
          Date
        </label>
        <input
          type="date"
          className={`${GlobalStyle.inputText} text-lg p-3`}
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
        />
      </div>
    </div>
    <div className="flex justify-end mt-6">
      <Link
        type="submit"
        className={`${GlobalStyle.buttonPrimary} text-lg p-4`}
        to="/pages/incident/details"
      >
        Submit
      </Link>
    </div>
  </form>
</div>

      </div>
    </div>
  );
};

export default IncidentRegister;
