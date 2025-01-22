import { useState } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function OpenIncident() {
  const [error, setError] = useState(""); // for error message
  const [searchQuery, setSearchQuery] = useState(""); // for searching
  const [selectAllData, setSelectAllData] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const rowsPerPage = 7;


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const data = [
    {
      id : "RC001",
      status : "open no agent",
      account_number : "0115678",
      action : "arreas collect",
      amount : "54000",
      source_type :"pilot - suspended"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "7000",
        source_type :"special"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "5000",
        source_type :"product terminal"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "4000",
        source_type :"pilot - suspended"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "60000",
        source_type :"pilot - suspended"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "54000",
        source_type :"pilot - suspended"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "56000",
        source_type :"special"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "54000",
        source_type :"pilot - suspended"
    },
    {
        id : "RC001",
        status : "open no agent",
        account_number : "0115678",
        action : "arreas collect",
        amount : "60000",
        source_type :"special"
    },
  ];

  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const navi = () => {
    navigate("/lod/ftl-log/preview");
  };

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleRowCheckboxChange = (caseId) => {
    if (selectedRows.includes(caseId)) {
      setSelectedRows(selectedRows.filter((id) => id !== caseId));
    } else {
      setSelectedRows([...selectedRows, caseId]);
    }
  };

  const handleSelectAllDataChange = () => {
    if (selectAllData) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.caseId));
    }
    setSelectAllData(!selectAllData);
  };


  return (  
    <>

<div className={`p-4 ${GlobalStyle.fontPoppins}`}>
    
<div className="flex justify-between items-center w-full">
  <h1 className={`${GlobalStyle.headingLarge} m-0`}>Incidents Open for Distribution</h1>
  <Link
    className={`${GlobalStyle.buttonPrimary}`}
    to="/lod/ftllod/ftllod/downloadcreateftllod"
  >
    Create task and let me know
  </Link>
</div>
      {/* case count Bar */}
      <div className={`${GlobalStyle.caseCountBar}`}>
        <div className="flex">
          <span className={GlobalStyle.countBarTopic}>Open Pending Cases</span>
        </div>
        <div className={GlobalStyle.countBarSubTopicContainer}>
          <div className={GlobalStyle.countBarMainBox}>
            <span>Total:</span>
            <p className={GlobalStyle.countBarMainTopic}>1259</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>5,000 - 10,000</span>
            <p className={GlobalStyle.countBarSubTopic}>100</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>10,000 - 25,000</span>
            <p className={GlobalStyle.countBarSubTopic}>250</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>25,000 - 50,000</span>
            <p className={GlobalStyle.countBarSubTopic}>800</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>50,000 - 100,000</span>
            <p className={GlobalStyle.countBarSubTopic}>61</p>
          </div>
          <div className={GlobalStyle.countBarSubBox}>
            <span>&gt; 100,000</span>
            <p className={GlobalStyle.countBarSubTopic}>98</p>
          </div>
        </div>
      </div>
</div>

<div className="flex flex-col">
        {/* Search Bar Section */}
        <div className="mb-4 flex justify-start">
          <div className={GlobalStyle.searchBarContainer}>
            <input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={GlobalStyle.inputSearch}
            />
            <FaSearch className={GlobalStyle.searchBarIcon} />
          </div>
        </div>

        {/* table */}
        <div className={GlobalStyle.tableContainer}>
          <table className={GlobalStyle.table}>
            <thead className={GlobalStyle.thead}>
              <tr>
                <th scope="col" className={GlobalStyle.tableHeader}></th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  ID
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Status
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Account No
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Action
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Amount
                </th>
                <th scope="col" className={GlobalStyle.tableHeader}>
                  Source Type
                </th>
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
                      className={"rounded-lg"}
                      checked={selectedRows.includes(row.caseId)}
                      onChange={() => handleRowCheckboxChange(row.caseId)}
                    />
                  </td>
                  <td className={GlobalStyle.tableData}>
                    <a href={`#${row.id}`} className="hover:underline">
                      {row.id}
                    </a>
                  </td>
                  <td className={GlobalStyle.tableData}>{row.status}</td>
                  <td className={GlobalStyle.tableData}>{row.account_number}</td>
                  <td className={GlobalStyle.tableData}>{row.action}</td>
                  <td className={GlobalStyle.tableData}>{row.amount}</td>
                  <td className={GlobalStyle.tableData}>{row.source_type}</td>
                  
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          
          </div>

          <div className="flex justify-end items-center w-full mt-6">
        {/* Select All Data Checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded-lg"
            checked={selectAllData}
            onChange={handleSelectAllDataChange}
          />
          Select All
        </label>

        <Link
          className={`${GlobalStyle.buttonPrimary} ml-4`}
          to="/lod/ftllod/ftllod/downloadcreateftllod"
        >
          Proceed
        </Link>
      </div>
          </div>
    </>
  );    
}   


















// <div className={GlobalStyle.tableContainer}>
//                     <table className={GlobalStyle.table}>
//                         <thead className={GlobalStyle.thead}>
//                             <tr>
//                                 <th scope="col" className={GlobalStyle.tableHeader}></th>
//                                 <th scope="col" className={GlobalStyle.tableHeader}>
//                                     ID
//                                 </th>
//                                 <th scope="col" className={GlobalStyle.tableHeader}>
//                                     Status
//                                 </th>
//                                 <th scope="col" className={GlobalStyle.tableHeader}>
//                                     Account No
//                                 </th>
//                                 <th scope="col" className={GlobalStyle.tableHeader}>
//                                     Action
//                                 </th>
//                                 <th scope="col" className={GlobalStyle.tableHeader}>
//                                     Amount
//                                 </th>
//                                 <th scope="col" className={GlobalStyle.tableHeader}>
//                                     Source Type
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {paginatedData.map((row, index) => (
//                                 <tr
//                                     key={index}
//                                     className={`${index % 2 === 0
//                                             ? "bg-white bg-opacity-75"
//                                             : "bg-gray-50 bg-opacity-50"
//                                         } border-b`}
//                                 >
//                                     <td className={GlobalStyle.tableData}>
//                                         <input
//                                             type="checkbox"
//                                             className={"rounded-lg"}
//                                             checked={selectedRows.includes(row.caseId)}
//                                             onChange={() => handleRowCheckboxChange(row.caseId)}
//                                         />
//                                     </td>
//                                     <td className={GlobalStyle.tableData}>
//                                         <a href={`#${row.id}`} className="hover:underline">
//                                             {row.id}
//                                         </a>
//                                     </td>
//                                     <td className={GlobalStyle.tableData}>{row.status}</td>
//                                     <td className={GlobalStyle.tableData}>{row.account_number}</td>
//                                     <td className={GlobalStyle.tableData}>{row.action}</td>
//                                     <td className={GlobalStyle.tableData}>{row.amount}</td>
//                                     <td className={GlobalStyle.tableData}>{row.source_type}</td>

//                                 </tr>
//                             ))}
//                             {paginatedData.length === 0 && (
//                                 <tr>
//                                     <td colSpan="6" className="text-center py-4">
//                                         No results found
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>


//                 </div>