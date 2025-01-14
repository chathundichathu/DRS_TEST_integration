
//   import React, { useState } from "react";
//   import { useNavigate } from "react-router-dom";
//   import GlobalStyle from "../../../assets/prototype/GlobalStyle.jsx";

//   const Button = ({ children, className, ...props }) => (
//     <button className={`px-4 py-2 ${className}`} {...props}>
//       {children}
//     </button>
//   );

//   const Checkbox = ({ id, checked, onChange }) => (
//     <input
//       type="checkbox"
//       id={id}
//       checked={checked}
//       onChange={onChange}
//       className="h-4 w-4"
//     />
//   );

//   const Table = ({ children }) => (
//     <table className="min-w-full text-sm text-left text-gray-500">{children}</table>
//   );

//   const TableHeader = ({ children }) => (
//     <thead className="text-xs text-[#718EBF] uppercase bg-gray-50 bg-opacity-75">
//       {children}
//     </thead>
//   );

//   const TableBody = ({ children }) => <tbody>{children}</tbody>;

//   const TableRow = ({ children, isEven }) => (
//     <tr
//       className={`${
//         isEven ? "bg-white bg-opacity-75" : "bg-gray-50 bg-opacity-50"
//       } border-b`}
//     >
//       {children}
//     </tr>
//   );

//   const TableHead = ({ children }) => <th className="px-6 py-3">{children}</th>;

//   const TableCell = ({ children }) => <td className="px-6 py-4">{children}</td>;

//   const Tabs = ({ children }) => <div className="space-y-0">{children}</div>;
//   const TabsList = ({ children }) => <div className="flex">{children}</div>;

//   const TabsTrigger = ({ children, isActive, onClick }) => (
//     <button
//       className={`px-6 py-2 bg-blue-50 text-black shadow hover:bg-[#1a3b55] hover:text-white ${
//         isActive ? "bg-white" : "bg-gray-100"
//       }`}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );

//   const TabsContent = ({ children, isActive }) => (
//     <div className={isActive ? "" : "hidden"}>{children}</div>
//   );

  

//   const ranges = [
//     { label: "Total", count: "1259" },
//     { label: "5,000 - 10,000", count: "100" },
//     { label: "10,000 - 25,000", count: "250" },
//     { label: "25,000 - 50,000", count: "800" },
//     { label: "50,000 - 100,000", count: "61" },
//     { label: "> 100,000", count: "98" },
//   ];

//   const totalCount = ranges
//     .slice(1)
//     .reduce((sum, range) => sum + parseInt(range.count, 10), 0);

//   ranges[0].count = totalCount.toString();

//   export default function IncidentDetails() {
//     const [selectAll, setSelectAll] = useState(false);
//     const [activeTab, setActiveTab] = useState("open");
//     const navigate = useNavigate();

//     const handleTabClick = (tab) => {
//       setActiveTab(tab);
//       if (tab === "directLOD") {
//         navigate("/incident/log/directlod");
//       } else if (tab === "rejected") {
//         navigate("/incident/log/rejectincidents");
//       }
//     };

//     return (
//       <div className="p-6 min-h-screen opacity-80 font-poppins">
//           <h1 className={GlobalStyle.headingLarge}>Incident Details - Ready to Distribute</h1>
//           <div className="flex justify-end items-center gap-4">
//             <Button className={GlobalStyle.buttonPrimary}>
//               Export
//             </Button>
//           </div>

//         <Tabs>
//           <div className="mb-5">
//           <TabsList >
//             <TabsTrigger
//               isActive={activeTab === "open"}
//               onClick={() => handleTabClick("open")}
//             >
//               Open Incidents
//             </TabsTrigger>
//             <TabsTrigger
//               isActive={activeTab === "rejected"}
//               onClick={() => handleTabClick("rejected")}
//             >
//               Rejected Incidents
//             </TabsTrigger>
//             <TabsTrigger
//               isActive={activeTab === "directLOD"}
//               onClick={() => handleTabClick("directLOD")}
//             >
//               Direct LOD
//             </TabsTrigger>
//           </TabsList>
//           </div>

//           <TabsContent isActive={activeTab === "open"}>
//           <div className={`${GlobalStyle.caseCountBar}`}>
//         <div className="flex">
//           <span className={GlobalStyle.countBarTopic}>Open Pending Cases</span>
//         </div>
//         <div className={GlobalStyle.countBarSubTopicContainer}>
//           <div className={GlobalStyle.countBarMainBox}>
//             <span>Total:</span>
//             <p className={GlobalStyle.countBarMainTopic}>1259</p>
//           </div>
//           <div className={GlobalStyle.countBarSubBox}>
//             <span>5,000 - 10,000</span>
//             <p className={GlobalStyle.countBarSubTopic}>100</p>
//           </div>
//           <div className={GlobalStyle.countBarSubBox}>
//             <span>10,000 - 25,000</span>
//             <p className={GlobalStyle.countBarSubTopic}>250</p>
//           </div>
//           <div className={GlobalStyle.countBarSubBox}>
//             <span>25,000 - 50,000</span>
//             <p className={GlobalStyle.countBarSubTopic}>800</p>
//           </div>
//           <div className={GlobalStyle.countBarSubBox}>
//             <span>50,000 - 100,000</span>
//             <p className={GlobalStyle.countBarSubTopic}>61</p>
//           </div>
//           <div className={GlobalStyle.countBarSubBox}>
//             <span>&gt; 100,000</span>
//             <p className={GlobalStyle.countBarSubTopic}>98</p>
//           </div>
//         </div>

// import React, { useState } from "react";
// import GlobalStyle from "../../../assets/prototype/GlobalStyle";

// const Button = ({ children, className, ...props }) => (
//   <button className={`px-4 py-2 rounded ${className}`} {...props}>
//     {children}
//   </button>
// );

// const Checkbox = ({ id, checked, onChange }) => (
//   <input
//     type="checkbox"
//     id={id}
//     checked={checked}
//     onChange={onChange}
//     className="h-4 w-4"
//   />
// );

// const Table = ({ children }) => (
//   <table className="min-w-full text-sm text-left text-gray-500">
//     {children}
//   </table>
// );
// const TableHeader = ({ children }) => (
//   <thead className="text-xs text-[#718EBF] uppercase bg-gray-50 bg-opacity-75">
//     {children}
//   </thead>
// );
// const TableBody = ({ children }) => <tbody>{children}</tbody>;
// const TableRow = ({ children, isEven }) => (
//   <tr
//     className={`${
//       isEven ? "bg-white bg-opacity-75" : "bg-gray-50 bg-opacity-50"
//     } border-b`}
//   >
//     {children}
//   </tr>
// );
// const TableHead = ({ children }) => <th className="px-6 py-3">{children}</th>;
// const TableCell = ({ children }) => <td className="px-6 py-4">{children}</td>;

// const Tabs = ({ children }) => <div className="space-y-6">{children}</div>;
// const TabsList = ({ children }) => <div className="flex">{children}</div>;
// const TabsTrigger = ({ children, isActive, onClick }) => (
//   <button
//     className={`flex-1 py-2 ${isActive ? "bg-white" : "bg-gray-100"}`}
//     onClick={onClick}
//   >
//     {children}
//   </button>
// );
// const TabsContent = ({ children, isActive }) => (
//   <div className={isActive ? "" : "hidden"}>{children}</div>
// );

// const ranges = [
//   { label: "Total", count: "1259" },
//   { label: "5,000 - 10,000", count: "100" },
//   { label: "10,000 - 25,000", count: "250" },
//   { label: "25,000 - 50,000", count: "800" },
//   { label: "50,000 - 100,000", count: "61" },
//   { label: "> 100,000", count: "98" },
// ];

// const totalCount = ranges
//   .slice(1)
//   .reduce((sum, range) => sum + parseInt(range.count, 10), 0);

// ranges[0].count = totalCount.toString();

// export default function IncidentDetails() {
//   const [selectAll, setSelectAll] = useState(false);
//   const [activeTab, setActiveTab] = useState("open");

//   return (
//     <div className="p-6 max-w-[1200px] mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-semibold">
//           Incident Details - Ready to Distribute
//         </h1>
//         <Button className="px-5 py-1 text-white bg-[#00256A] rounded-lg hover:bg-blue-900 transition-all">
//           Export
//         </Button>

//       </div>

//             <div className="mt-4">
//               <div className={"overflow-hidden shadow-md border bg-[#717EBF] bg-opacity-50"}>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>
//                         <Checkbox
//                           id="selectAll"
//                           checked={selectAll}
//                           onChange={(e) => setSelectAll(e.target.checked)}
//                         />
//                       </TableHead>
//                       <TableHead>ID</TableHead>
//                       <TableHead>Account No.</TableHead>
//                       <TableHead>Action</TableHead>
//                       <TableHead>Amount</TableHead>
//                       <TableHead>Status</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {[ 
//                       { id: "RC001", account: "0115678", action: "Arrears Collect", amount: "54,000", status: "open" },
//                       { id: "RC002", account: "8765946", action: "Arrears Collect", amount: "-", status: "-" },
//                       { id: "RC003", account: "3754918", action: "Arrears Collect", amount: "43,750", status: "-" },
//                     ].map((row, index) => (
//                       <TableRow key={row.account} isEven={index % 2 === 0}>
//                         <TableCell>
//                           <Checkbox />
//                         </TableCell>
//                         <TableCell>{row.id}</TableCell>
//                         <TableCell>{row.account}</TableCell>
//                         <TableCell>{row.action}</TableCell>
//                         <TableCell className="text-red-500">{row.amount}</TableCell>
//                         <TableCell>{row.status}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </div>

//             <div className="flex justify-end items-center mt-6 gap-4">
//               <div className="flex items-center gap-2">
//                 <Checkbox id="selectAllIncidents" />
//                 <label htmlFor="selectAllIncidents" className="text-sm text-gray-700">
//                   Select All incidents
//                 </label>
//               </div>

//               <Button className={GlobalStyle.buttonPrimary}
//               onClick={() => window.location.href = '/drc/pending'}>
//                 Proceed
//               </Button>
//             </div>
//           </TabsContent>

//           <TabsContent isActive={activeTab === "rejected"}>
//             <div className="h-[200px] flex items-center justify-center text-gray-500">
//               No rejected incidents found
//             </div>
//           </TabsContent>

//           <TabsContent isActive={activeTab === "directLOD"}>
//             <div className="h-[200px] flex items-center justify-center text-gray-500">
//               Direct LOD tab content here
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     );
//   }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "../../../assets/prototype/GlobalStyle.jsx";

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded ${className}`} {...props}>
    {children}
  </button>
);

const Checkbox = ({ id, checked, onChange }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={onChange}
    className="h-4 w-4"
  />
);

const Table = ({ children }) => (
  <table className="min-w-full text-sm text-left text-gray-500">{children}</table>
);

const TableHeader = ({ children }) => (
  <thead className="text-xs text-[#718EBF] uppercase bg-gray-50 bg-opacity-75">
    {children}
  </thead>
);

const TableBody = ({ children }) => <tbody>{children}</tbody>;

const TableRow = ({ children, isEven }) => (
  <tr
    className={`${
      isEven ? "bg-white bg-opacity-75" : "bg-gray-50 bg-opacity-50"
    } border-b`}
  >
    {children}
  </tr>
);

const TableHead = ({ children }) => <th className="px-6 py-3">{children}</th>;

const TableCell = ({ children }) => <td className="px-6 py-4">{children}</td>;

const Tabs = ({ children }) => <div className="space-y-6">{children}</div>;

const TabsList = ({ children }) => <div className="flex">{children}</div>;

const TabsTrigger = ({ children, isActive, onClick }) => (
  <button
    className={`flex-1 py-2 ${
      isActive ? "bg-white" : "bg-gray-100"
    } transition-all`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TabsContent = ({ children, isActive }) => (
  <div className={isActive ? "" : "hidden"}>{children}</div>
);

const ranges = [
  { label: "Total", count: "1259" },
  { label: "5,000 - 10,000", count: "100" },
  { label: "10,000 - 25,000", count: "250" },
  { label: "25,000 - 50,000", count: "800" },
  { label: "50,000 - 100,000", count: "61" },
  { label: "> 100,000", count: "98" },
];

ranges[0].count = ranges
  .slice(1)
  .reduce((sum, range) => sum + parseInt(range.count, 10), 0)
  .toString();

export default function IncidentDetails() {
  const [selectAll, setSelectAll] = useState(false);
  const [activeTab, setActiveTab] = useState("open");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "directLOD") {
      navigate("/incident/log/directlod");
    } else if (tab === "rejected") {
      navigate("/incident/log/rejectincidents");
    }
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">
          Incident Details - Ready to Distribute
        </h1>
        <Button className="px-5 py-1 text-white bg-[#00256A] rounded-lg hover:bg-blue-900 transition-all">
          Export
        </Button>
      </div>

      <Tabs>
        <TabsList>
          <TabsTrigger
            isActive={activeTab === "open"}
            onClick={() => handleTabClick("open")}
          >
            Open Incidents
          </TabsTrigger>
          <TabsTrigger
            isActive={activeTab === "rejected"}
            onClick={() => handleTabClick("rejected")}
          >
            Rejected Incidents
          </TabsTrigger>
          <TabsTrigger
            isActive={activeTab === "directLOD"}
            onClick={() => handleTabClick("directLOD")}
          >
            Direct LOD
          </TabsTrigger>
        </TabsList>

        <TabsContent isActive={activeTab === "open"}>
          <div className="overflow-hidden shadow-md border bg-[#717EBF] bg-opacity-50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Checkbox
                      id="selectAll"
                      checked={selectAll}
                      onChange={(e) => setSelectAll(e.target.checked)}
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Account No.</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    id: "RC001",
                    account: "0115678",
                    action: "Arrears Collect",
                    amount: "54,000",
                    status: "open",
                  },
                  {
                    id: "RC002",
                    account: "8765946",
                    action: "Arrears Collect",
                    amount: "-",
                    status: "-",
                  },
                  {
                    id: "RC003",
                    account: "3754918",
                    action: "Arrears Collect",
                    amount: "43,750",
                    status: "-",
                  },
                ].map((row, index) => (
                  <TableRow key={row.account} isEven={index % 2 === 0}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.account}</TableCell>
                    <TableCell>{row.action}</TableCell>
                    <TableCell className="text-red-500">{row.amount}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent isActive={activeTab === "rejected"}>
          <div className="h-[200px] flex items-center justify-center text-gray-500">
            No rejected incidents found
          </div>
        </TabsContent>

        <TabsContent isActive={activeTab === "directLOD"}>
          <div className="h-[200px] flex items-center justify-center text-gray-500">
            Direct LOD tab content here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
