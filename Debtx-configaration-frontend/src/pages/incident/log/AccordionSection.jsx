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



import { useState } from 'react';

const AccordionSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden my-4  m-8 shadow-sm">
      {/* Accordion Header */}
      <button
        className="w-full flex justify-between items-center px-4 py-3 text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-opacity-80 w-fit"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title}`}
      >
        <span className="font-medium">{title}</span>
        <span className="ml-2 transform transition-transform duration-200">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 10.707a1 1 0 01-1.414 0L10 7.414 6.707 10.707a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div
          id={`accordion-content-${title}`}
          className="px-4 py-4 bg-white text-gray-700 transition-all duration-300 ease-in-out"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionSection;
