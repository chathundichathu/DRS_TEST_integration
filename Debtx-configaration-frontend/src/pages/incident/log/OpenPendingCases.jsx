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



import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const OpenPendingCases = () => {
    const [selectedAgent, setSelectedAgent] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const tableData = [
        { id: "RC001", accountNo: "0115678", action: "Arrears Collect", amount: "54,000", reason: "Credit Class = VIP" },
        { id: "RC002", accountNo: "8765946", action: "Arrears Collect", amount: "-", reason: "-" },
        { id: "RC003", accountNo: "3754918", action: "Arrears Collect", amount: "43,750", reason: "-" },
    ];

    const handleRowSelection = (id) => {
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.includes(id)
                ? prevSelectedRows.filter((rowId) => rowId !== id)
                : [...prevSelectedRows, id]
        );
    };

    return (
        <div className="container mx-auto px-6 py-8 mt-16 font-poppins">
            <div className="flex justify-between items-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-4 rounded-lg shadow-lg mb-8">
                <div>
                    <h2 className="text-3xl font-semibold text-gray-800">Open Pending Cases</h2>
                    <p className="text-gray-600">Total: <strong>1259</strong></p>
                </div>
                <div className="space-x-4">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full">5,000 - 10,000</span>
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full">10,000 - 25,000</span>
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full">25,000 - 50,000</span>
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full">50,000 - 100,000</span>
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full"> 100,000</span>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg shadow-md border border-[#0087FF] border-opacity-15 bg-[#77BFFF] bg-opacity-25">
                <div className="p-4 flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Distribute to Agent</h3>
                    <div>
                        <select
                            className="px-2 py-1 border rounded"
                            value={selectedAgent}
                            onChange={(e) => setSelectedAgent(e.target.value)}
                        >
                            <option value="">Select Agent</option>
                            <option value="agent1">Agent 1</option>
                            <option value="agent2">Agent 2</option>
                            <option value="agent3">Agent 3</option>
                        </select>
                        <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">Add</button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-lg shadow-md border border-[#0087FF] border-opacity-15 bg-[#77BFFF] bg-opacity-25">
                    <table className="min-w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-[#718EBF] uppercase bg-gray-50 bg-opacity-75">
                            <tr>
                                <th className="px-6 py-3">
                                    <input type="checkbox" className="form-checkbox" />
                                </th>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Account No.</th>
                                <th className="px-6 py-3">Action</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Filtered Reason</th>
                                <th className="px-6 py-3">Selector</th>
                                <th className="px-6 py-3">Agent</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-6 py-4">
                                    <input type="checkbox" className="form-checkbox" />
                                </td>
                                <td className="px-6 py-4">RC001</td>
                                <td className="px-6 py-4">0115678</td>
                                <td className="px-6 py-4">Arrears Collect</td>
                                <td className="px-6 py-4">54,000</td>
                                <td className="px-6 py-4">Credit Class = VIP</td>
                                <td className="px-6 py-4">
                                    <select className="px-2 py-1 border rounded">
                                        <option value="remark">Remark</option>
                                        
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="px-5 py-1 text-white bg-[#00256A] rounded-lg hover:bg-blue-900 transition-all">
                                        Add
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-6 py-4">
                                    <input type="checkbox" className="form-checkbox" />
                                </td>
                                <td className="px-6 py-4">RC002</td>
                                <td className="px-6 py-4">8765946</td>
                                <td className="px-6 py-4">Arrears Collect</td>
                                <td className="px-6 py-4">-</td>
                                <td className="px-6 py-4">-</td>
                                <td className="px-6 py-4">
                                    <select className="px-2 py-1 border rounded">
                                        <option value="remark">Remark</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="px-5 py-1 text-white bg-[#00256A] rounded-lg hover:bg-blue-900 transition-all">
                                        Add
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">
                                    <input type="checkbox" className="form-checkbox" />
                                </td>
                                <td className="px-6 py-4">RC003</td>
                                <td className="px-6 py-4">3754918</td>
                                <td className="px-6 py-4">Arrears Collect</td>
                                <td className="px-6 py-4">43,750</td>
                                <td className="px-6 py-4">-</td>
                                <td className="px-6 py-4">
                                    <select className="px-2 py-1 border rounded">
                                        <option value="remark">Remark</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="px-5 py-1 text-white bg-[#00256A] rounded-lg hover:bg-blue-900 transition-all">
                                        Add
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-center items-center gap-6 p-4">
                
                <button
                    className="flex items-center gap-2 px-2 py-2 text-[#00256A] border-2 border-[#00256A] rounded-full hover:bg-blue-100 transition-all"
                    onClick={() => navigate("/previous-page")}
                >
                    <FaArrowLeft />
                </button>
                
                <button
                    className="flex items-center gap-2 px-2 py-2 text-[#00256A] border-2 border-[#00256A] rounded-full hover:bg-blue-100 transition-all"
                    onClick={() => navigate("/prototypeB")}
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default OpenPendingCases;
