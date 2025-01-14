import React from "react";
import { Link } from "react-router-dom";

const Logs = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="mb-8 text-4xl text-center font-poppins"> DRC Logs</h2>

      {/* DRC Labels */}
      <div className="flex flex-col items-center space-y-4">
        <Link to="/drc/assigned-case-list-for-drc">
          <label className="text-lg font-medium cursor-pointer hover:text-blue-500">
            Assigned case list for DRC
          </label>
        </Link>
        <Link to="/drc/ro-monitoring-arrears">
            <label className="text-lg font-medium cursor-pointer hover:text-blue-500">
            RO Monitoring (Arrears)
            </label>
        </Link> 
        <Link to="/drc/ro-monitoring-cpe">
            <label className="text-lg font-medium cursor-pointer hover:text-blue-500">
            RO Monitoring (CPE)
            </label>
        </Link>
        <Link to="/pages/DRC/Re-AssignRo">
          <label className="text-lg font-medium cursor-pointer hover:text-blue-500">
            Re_AssignRo
          </label>

        </Link>
      </div>
    </div>
  );
};

export default Logs;
