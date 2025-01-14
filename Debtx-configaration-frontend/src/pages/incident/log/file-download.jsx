// import React, { useState, useEffect } from "react";
// import { Download } from "lucide-react";
// import GlobalStyle from "../../../assets/prototype/GlobalStyle";

// const Button = ({ children, className, ...props }) => (
//   <button className={`px-4 py-2 rounded ${className}`} {...props}>
//     {children}
//   </button>
// );

// export default function IncidentFileDownload() {
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = [
//         {
//           id: 1,
//           dateTime: "2024.11.04",
//           createdTime: "1 pm",
//           createdBy: "ABCD",
//           fileName: "Unit Collection 11.05.csv",
//         },

//         {
//           id: 1,
//           dateTime: "2024.11.04",
//           createdTime: "1 pm",
//           createdBy: "ABCD",
//           fileName: "Unit Collection 11.05.csv",
//         },
//         {
//           id: 1,
//           dateTime: "2024.11.04",
//           createdTime: "1 pm",
//           createdBy: "ABCD",
//           fileName: "Unit Collection 11.05.csv",
//         },


//       ];
//       setFilteredData(data);
//     };
//     fetchData();
//   }, []);

//   return (

//     <div className={GlobalStyle.fontPoppins}>

//     <div>

//       <br />
//       <br />
//       <div>
//         <h1 className={GlobalStyle.headingLarge}>
//           Proceed Incident File Download
//         </h1>
//       </div>
//       <br />
//       <br />
//       <br />


//       <div className={GlobalStyle.tableContainer}>

//       <div className="overflow-x-auto">

//         <table className={GlobalStyle.table}>
//           <thead className={GlobalStyle.thead}>
//             <tr>
//               <th scope="col" className={GlobalStyle.tableHeader}>
//                 Date & Time
//               </th>
//               <th scope="col" className={GlobalStyle.tableHeader}>
//                 Created Time
//               </th>
//               <th scope="col" className={GlobalStyle.tableHeader}>
//                 Created By
//               </th>
//               <th scope="col" className={GlobalStyle.tableHeader}>
//                 File Name
//               </th>
//               <th
//                 scope="col"
//                 className={`${GlobalStyle.tableHeader} w-[100px]`}
//               >
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((row, index) => (
//                 <tr
//                   key={row.id}
//                   className={
//                     index % 2 === 0
//                       ? GlobalStyle.tableRowEven
//                       : GlobalStyle.tableRowOdd
//                   }
//                 >
//                   <td className={GlobalStyle.tableData}>{row.dateTime}</td>
//                   <td className={GlobalStyle.tableData}>{row.createdTime}</td>
//                   <td className={GlobalStyle.tableData}>{row.createdBy}</td>
//                   <td className={GlobalStyle.tableData}>{row.fileName}</td>
//                   <td className={GlobalStyle.tableData}>

                    
//                     <Button className="p-2" onClick={() => window.location.href = '/incident/register/bulk'}>

//                     <Button className="p-2">

//                       <Download className="h-4 w-4" />
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className={GlobalStyle.errorText}>
//                   No results found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import GlobalStyle from "../../../assets/prototype/GlobalStyle";

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded ${className}`} {...props}>
    {children}
  </button>
);

export default function IncidentFileDownload() {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          dateTime: "2024.11.04",
          createdTime: "1 pm",
          createdBy: "ABCD",
          fileName: "Unit Collection 11.05.csv",
        },
        {
          id: 2,
          dateTime: "2024.11.05",
          createdTime: "2 pm",
          createdBy: "EFGH",
          fileName: "Unit Collection 11.06.csv",
        },
        {
          id: 3,
          dateTime: "2024.11.06",
          createdTime: "3 pm",
          createdBy: "IJKL",
          fileName: "Unit Collection 11.07.csv",
        },
      ];
      setFilteredData(data);
    };
    fetchData();
  }, []);

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div>
        <h1 className={GlobalStyle.headingLarge}>
          Proceed Incident File Download
        </h1>
        <div className={GlobalStyle.tableContainer}>
          <div className="overflow-x-auto">
            <table className={GlobalStyle.table}>
              <thead className={GlobalStyle.thead}>
                <tr>
                  <th scope="col" className={GlobalStyle.tableHeader}>
                    Date & Time
                  </th>
                  <th scope="col" className={GlobalStyle.tableHeader}>
                    Created Time
                  </th>
                  <th scope="col" className={GlobalStyle.tableHeader}>
                    Created By
                  </th>
                  <th scope="col" className={GlobalStyle.tableHeader}>
                    File Name
                  </th>
                  <th
                    scope="col"
                    className={`${GlobalStyle.tableHeader} w-[100px]`}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr
                      key={row.id}
                      className={
                        index % 2 === 0
                          ? GlobalStyle.tableRowEven
                          : GlobalStyle.tableRowOdd
                      }
                    >
                      <td className={GlobalStyle.tableData}>{row.dateTime}</td>
                      <td className={GlobalStyle.tableData}>
                        {row.createdTime}
                      </td>
                      <td className={GlobalStyle.tableData}>{row.createdBy}</td>
                      <td className={GlobalStyle.tableData}>{row.fileName}</td>
                      <td className={GlobalStyle.tableData}>
                        <Button
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all"
                          onClick={() =>
                            alert(`Downloading: ${row.fileName}`)
                          }
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={GlobalStyle.errorText}>
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
