/*
Purpose: 
Created Date: 2024-12-3
Created By: Chamath Jayasanka - chamathjayasanka20@gmail.com
Last Modified Date: 2024-12-03
Modified By: Chamath Jayasanka - chamathjayasanka20@gmail.com
Version: node 11
ui number : 
Dependencies: tailwind css
Related Files: 
Notes: 

*/

import React from 'react';
import { useLocation } from 'react-router-dom';
import AccordionSection from './AccordionSection';


const CaseDetails = () => {
  const location = useLocation();
  const { rowData } = location.state || {}; // Extract rowData from the state

  // Log the rowData to the console (you can remove this once confirmed)
  console.log('Row Data:', rowData);

  return (
    <div className="min-h-screen p-8">
      <div className="w-full mx-auto p-8 rounded-lg shadow-lg relative">
        
        {/* Header Section */}
        <header className="mb-8">
          <div className="grid grid-cols-2 gap-6 text-gray-600">
            <h1 className="text-[40px] font-semibold mb-8">Case Details</h1>

            <div className="space-y-2 justify-self-end">
              <p className='text-lg'>
                <strong>Case ID</strong> : {rowData?.caseId || 'N/A'}
              </p>
              <p>
                <strong>Created Date</strong> : {rowData?.createdDate || 'N/A'}
              </p>
              <p>
                <strong>Days Count</strong> : {rowData?.daysCount || 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <p><strong>Account No</strong>: {rowData?.accountNo || 'N/A'}</p>
              <p><strong>Customer Ref</strong>: {rowData?.customerRef || 'N/A'}</p>
              <p><strong>RTOM</strong>: {rowData?.rtoM || 'N/A'}</p>
              <p><strong>Area</strong>: {rowData?.area || 'N/A'}</p>
              <p><strong>Arrears Amount</strong>: ${rowData?.arrearsAmount || '0'}</p>
              <p><strong>Action Type</strong>: {rowData?.actionType || 'N/A'}</p>
              <p><strong>Remark</strong>: {rowData?.remark || 'N/A'}</p>
            </div>
            
            <div className="space-y-2">
              <p><strong>Current Status</strong>: {rowData?.status || 'N/A'}</p>
              <p><strong>Last Payment Date</strong>: {rowData?.lastPaymentDate || 'N/A'}</p>
              <p><strong>Last BSS Reading Date</strong>: {rowData?.lastBssReadingDate || 'N/A'}</p>
            </div>
          </div>
        </header>

        <section>
          {/* Accordion Sections */}
          <AccordionSection title="DRC">{rowData?.drcDetails || 'No details available'}</AccordionSection>
          <AccordionSection title="RO - Negotiate | Arrears">{rowData?.negotiateArrears || 'No details available'}</AccordionSection>
          <AccordionSection title="RO - Negotiate | CPE">{rowData?.negotiateCpe || 'No details available'}</AccordionSection>
          <AccordionSection title="RO - Customer Updated Data">{rowData?.customerUpdate || 'No details available'}</AccordionSection>
          <AccordionSection title="Mediation Board">{rowData?.mediationBoard || 'No details available'}</AccordionSection>
          <AccordionSection title="Settlement">{rowData?.settlement || 'No details available'}</AccordionSection>
          <AccordionSection title="Payment">{rowData?.paymentDetails || 'No details available'}</AccordionSection>
          <AccordionSection title="Commission | Arrears Collection">{rowData?.commissionArrears || 'No details available'}</AccordionSection>
          <AccordionSection title="Commission | CPE Collection">{rowData?.commissionCpe || 'No details available'}</AccordionSection>
          <AccordionSection title="LOD">{rowData?.lodDetails || 'No details available'}</AccordionSection>
          <AccordionSection title="Dispute">{rowData?.dispute || 'No details available'}</AccordionSection>
          <AccordionSection title="Write OFF">{rowData?.writeOff || 'No details available'}</AccordionSection>
        </section>

        <div className="text-right mt-8">
          <button className="bg-[#002342] text-white px-8 py-2 rounded-lg shadow hover:bg-[#1a3b55]">
            Download
          </button>
        </div>
      </div>
    </div>
  );

};

export default CaseDetails;
