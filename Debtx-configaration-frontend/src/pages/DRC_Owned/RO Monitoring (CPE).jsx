/*Purpose: This template is used for the 2.4.2- RO Monitoring (CPE)
Created Date: 2025-01-07
Created By: Chamithu (chamithujayathilaka2003@gmail.com)
Last Modified Date: 2025-01-07
Version: node 20
ui number : 2.4.2
Dependencies: tailwind css
Related Files: (routes)
Notes: The following page conatins the code for the RO Monitoring (CPE)  */

import { useState } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx"; // Importing GlobalStyle
import { useNavigate } from "react-router-dom";

export default function RO_Monitoring_CPE() {
    {/* Data for the table */}
    const data = [
        {
            date:"2025.01.01",
            negotiation:"Negotiation",
            remark:"Remark"
            
        },
        {
            date:"2025.01.20",
            negotiation:"Negotiation",
            remark:"Remark"
            
        },
        {
            date:"2025.01.31",
            negotiation:"Negotiation",
            remark:"Remark"
        }

    ];

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("CPE Collect"); // Active tab
    
    {/*  tab click function*/}
    const handleTabClick = (tab) => { 
        setActiveTab(tab);
        if (tab === "Customer Negotiation") {
            navigate("/drc/ro-monitoring-arrears");
        } else if (tab === "CPE Collect") {
            alert("Already clicked"); 
        }
    };

    return (
        <div className={GlobalStyle.fontPoppins}>
            <div className="flex justify-between items-center mb-8">
                <h1 className={GlobalStyle.headingLarge}>
                   Case Updates
                 </h1>
            </div>
             {/* Tabs */}
             <div className="flex border-b mb-4">
                {["Customer Negotiation", "CPE Collect"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabClick(tab)}
                        className={`px-4 py-2 ${
                            activeTab === tab
                                ? "border-b-2 border-blue-500 font-bold"
                                : "text-gray-500"
                        }`}
                    >
                        {tab} 
                    </button>
                ))}
            </div>
        <div className="flex flex-col ">

            {/* Card box */}
            <div className="flex flex-col items-center justify-center">
            <div className={`${GlobalStyle.cardContainer} `}>
              <p className="mb-2">
                <strong>Case ID:</strong>
              </p>
              <p className="mb-2">
                <strong>Customer Ref:</strong>{" "}
              </p>
              <p className="mb-2">
                <strong>Account no:</strong>{" "}
              </p>
              <p className="mb-2">
                <strong>Telephone No:</strong>{" "}
              </p>
              <p className="mb-2">
                <strong>Service Type:</strong>{" "}
              </p>
              <p className="mb-2">
                <strong>Service Address:</strong>{" "}
              </p>
              <p className="mb-2">
                <strong>Service Status:</strong>{" "}
              </p>
            </div>
            </div>

        {/* Table Section */}
         <h2 className={`${GlobalStyle.headingMedium} mb-4`}> Last Negotiation Detail</h2>   
            <div className={GlobalStyle.tableContainer}>
                <table className={GlobalStyle.table}>
                    <thead className={GlobalStyle.thead}>
                            <tr>
                            <th className={GlobalStyle.tableHeader}>Date</th>
                            <th className={GlobalStyle.tableHeader}>Negotiation</th>
                            <th className={GlobalStyle.tableHeader}>Remark</th>
                            </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={item.date} 
                                className={
                                    index % 2 === 0
                                        ? GlobalStyle.tableRowEven
                                        : GlobalStyle.tableRowOdd
                                }
                            >
                                <td className={GlobalStyle.tableData}>{item.date}</td>
                                <td className={GlobalStyle.tableData}>{item.negotiation}</td>
                                <td className={GlobalStyle.tableData}>{item.remark}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
          </div>

        </div>
            
        </div>
    );

}
