import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import GlobalStyle from "../../assets/prototype/GlobalStyle.jsx";

export default function DirectLODSendingIncident() {
    const navigate = useNavigate();

    // Table data exactly matching the image
    const tableData = [
        {
            id: "RC001",
            status: "Direct LOD",
            account_no: "0115678",
            amount: "500",
            source_type: "Pilot - Suspended"
        },
        {
            id: "RC001",
            status: "Direct LOD",
            account_no: "8765946",
            amount: "590",
            source_type: "Special"
        },
        {
            id: "RC001",
            status: "Direct LOD",
            account_no: "3754918",
            amount: "900",
            source_type: "Product Terminate"
        }
    ];

    // Filter state
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredData, setFilteredData] = useState(tableData);
    const [selectAllData, setSelectAllData] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(0); // Changed to 0-based indexing
    const [selectedSource, setSelectedSource] = useState("");

    const rowsPerPage = 7; // Number of rows per page

    // Filter data based on search query
    const filteredSearchData = filteredData.filter((row) =>
        Object.values(row)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    // Calculate total pages
    const pages = Math.ceil(filteredSearchData.length / rowsPerPage);

    // Get paginated data
    const paginatedData = filteredSearchData.slice(
        currentPage * rowsPerPage,
        (currentPage + 1) * rowsPerPage
    );

    const handleFilter = () => {
        if (startDate && endDate) {
            const filtered = tableData.filter((row) => {
                const assignedDate = new Date(row.assignedDate);
                const endDate1 = new Date(row.endDate);
                return assignedDate >= startDate && endDate1 <= endDate;
            });
            setFilteredData(filtered);
            setCurrentPage(0); // Reset to first page after filtering
        } else {
            setFilteredData(tableData);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, pages - 1));
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    const handleRowCheckboxChange = (caseId) => {
        if (selectedRows.includes(caseId)) {
            setSelectedRows(selectedRows.filter((id) => id !== caseId));
        } else {
            setSelectedRows([...selectedRows, caseId]);
        }
    };

    const handleSelectAllDataChange = (e) => {
        setSelectAllData(e.target.checked);
        if (e.target.checked) {
            setSelectedRows(filteredData.map(row => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    return (
        <div className={`p-4 ${GlobalStyle.fontPoppins}`}>
            <div className="flex justify-between items-center w-full">
                <h1 className={`${GlobalStyle.headingLarge} m-0`}>Direct LOD sending Incidents</h1>
                <Link
                    className={`${GlobalStyle.buttonPrimary}`}
                    to="/lod/ftllod/ftllod/downloadcreateftllod"
                >
                    Create task and let me know
                </Link>
            </div>

            {/* Filter Section */}
            <div className="flex justify-end gap-10 my-12">
                <div className="flex items-center gap-4">
                    <label>Source:</label>
                    <select 
                        className={GlobalStyle.inputText}
                        value={selectedSource}
                        onChange={(e) => setSelectedSource(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="Pilot - Suspended">Pilot - Suspended</option>
                        <option value="Special">Special</option>
                        <option value="Product Terminate">Product Terminate</option>
                    </select>
                    
                    <div className={GlobalStyle.datePickerContainer}>
                        <label className={GlobalStyle.dataPickerDate}>Date - From:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="To:"
                            className={GlobalStyle.inputText}
                        />
                    </div>
                </div>
                <button
                    className={`${GlobalStyle.buttonPrimary} h-[35px]`}
                    onClick={handleFilter}
                >
                    Filter
                </button>
            </div>

            {/* Table Section */}
            <div className={GlobalStyle.tableContainer}>
                <table className={GlobalStyle.table}>
                    <thead className={GlobalStyle.thead}>
                        <tr>
                            <th className={GlobalStyle.tableHeader}>
                                <input 
                                    type="checkbox" 
                                    className="rounded-lg"
                                    checked={selectAllData}
                                    onChange={handleSelectAllDataChange}
                                />
                            </th>
                            <th className={GlobalStyle.tableHeader}>ID</th>
                            <th className={GlobalStyle.tableHeader}>Status</th>
                            <th className={GlobalStyle.tableHeader}>Account No.</th>
                            <th className={GlobalStyle.tableHeader}>Amount</th>
                            <th className={GlobalStyle.tableHeader}>Source Type</th>
                            <th className={GlobalStyle.tableHeader}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 === 0
                                        ? "bg-white bg-opacity-75"
                                        : "bg-gray-50 bg-opacity-50"
                                } border-b`}
                            >
                                <td className={GlobalStyle.tableData}>
                                    <input
                                        type="checkbox"
                                        className="rounded-lg"
                                        checked={selectedRows.includes(row.id)}
                                        onChange={() => handleRowCheckboxChange(row.id)}
                                    />
                                </td>
                                <td className={GlobalStyle.tableData}>
                                    <a href={`#${row.id}`} className="hover:underline">
                                        {row.id}
                                    </a>
                                </td>
                                <td className={GlobalStyle.tableData}>{row.status}</td>
                                <td className={GlobalStyle.tableData}>{row.account_no}</td>
                                <td className={GlobalStyle.tableData}>{row.amount}</td>
                                <td className={GlobalStyle.tableData}>{row.source_type}</td>
                                <td className={`${GlobalStyle.tableData} text-center px-6 py-4`}>
                                    <button className={`${GlobalStyle.buttonPrimary} mx-auto`}>
                                        Proceed
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {paginatedData.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


                <div className="flex items-center p-4">
                    <Link
                        className={`${GlobalStyle.buttonPrimary} ml-4`}
                        to="/lod/ftllod/ftllod/downloadcreateftllod"
                    >
                        Create
                    </Link>
                </div>
            </div>
        
    );
}