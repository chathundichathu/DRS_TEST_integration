/* Purpose: This template is used for the 1.2 Sup - Bulk Upload LOG.
Created Date: 2024-12-03
Created By: Sanjaya (sanjayaperera80@gmail.com)
Last Modified Date: 2024-12-03
Modified By: Sanjaya (sanjayaperera80@gmail.com)
Version: node 20
ui number : v1.0.1
Dependencies: tailwind css
Related Files: (routes)
Notes:  */

import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import GlobalStyle from "../../../assets/prototype/GlobalStyle";

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded ${className}`} {...props}>
    {children}
  </button>
);

const Calendar = ({ selected, onSelect }) => (
  <div className="p-2 bg-white rounded shadow">
    <input type="date" onChange={(e) => onSelect(new Date(e.target.value))} />
  </div>
);

const Table = ({ children }) => <table className="w-full">{children}</table>;
const TableHeader = ({ children }) => <thead>{children}</thead>;
const TableBody = ({ children }) => <tbody>{children}</tbody>;
const TableRow = ({ children }) => <tr>{children}</tr>;
const TableHead = ({ children }) => (
  <th className="p-2 text-left">{children}</th>
);
const TableCell = ({ children }) => <td className="p-2">{children}</td>;

export default function IncidentUploadLog() {
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState("all");
  const [filteredData, setFilteredData] = useState([]);

  const data = [
    {
      date: "2024.11.04",
      createdTime: "1 pm",
      uploadedBy: "ABCD",
      status: "Pending",
      fileName: "Unit Collection 11.05.csv",
      type: "Incident creation",
    },
    {
      date: "2024.11.05",
      createdTime: "3 pm",
      uploadedBy: "XYZ",
      status: "Completed",
      fileName: "Unit Report 11.05.csv",
      type: "Incident report",
    },
  ];

  const handleFilter = () => {
    const filtered = data.filter((item) => {
      const statusMatch =
        status === "all" || item.status.toLowerCase() === status.toLowerCase();
      const dateMatch =
        !date || new Date(item.date).toDateString() === date.toDateString();
      return statusMatch && dateMatch;
    });
    setFilteredData(filtered);
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <h1 className="text-3xl font-semibold mb-8">Incident Upload Log</h1>

      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
          <select
            className="py-1 border-2 border-[#0056A2] border-opacity-30 rounded-lg bg-white text-left"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Date:</span>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 h-4 w-4" />
            <input
              type="date"
              className="w-[240px] px-3 py-2 bg-white border rounded"
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </div>
        </div>

        <Button
          className="px-5 py-1 text-white bg-[#00256A] rounded-lg hover:bg-blue-900 transition-all"
          onClick={handleFilter}
        >
          Filter
        </Button>
      </div>

      <div className={GlobalStyle.tableContainer}>
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
                Uploaded By
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Status
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>
                File Name
              </th>
              <th scope="col" className={GlobalStyle.tableHeader}>
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? GlobalStyle.tableRowEven
                    : GlobalStyle.tableRowOdd
                }
              >
                <td className={GlobalStyle.tableData}>{row.dateTime}</td>
                <td className={GlobalStyle.tableData}>{row.createdTime}</td>
                <td className={GlobalStyle.tableData}>{row.uploadedBy}</td>
                <td className={GlobalStyle.tableData}>
                  <span
                    className={`${
                      row.status === "Completed"
                        ? "text-green-500"
                        : "text-red-500"
                    } font-bold`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className={GlobalStyle.tableData}>{row.fileName}</td>
                <td className={GlobalStyle.tableData}>{row.type}</td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="6" className={GlobalStyle.errorText}>
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-6">
        <Button className="px-5 py-1 text-white bg-[#00256A] rounded-lg hover:bg-blue-900 transition-all">
          Go Forward
        </Button>
      </div>
    </div>
  );
}