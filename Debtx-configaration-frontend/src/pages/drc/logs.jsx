import { Link } from "react-router-dom";

const Logs = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="mb-8 text-4xl text-center font-poppins">Logs</h2>

      {/* Log Labels */}
      <div className="flex flex-col items-center space-y-4">
        <Link to="/drc/assigned-DRC-log">
          <label className="text-lg font-medium cursor-pointer hover:text-blue-500">
            Assigned DRC Log
          </label>
        </Link>

        <Link to="/drc/case-list">
          <label className="text-lg font-medium cursor-pointer hover:text-blue-500">
            Assigned DRC's LOG
          </label>
        </Link>

        <Link to="/drc/mediation-board-requests">
          <label className="text-lg font-medium cursor-pointer hover:text-blue-500">
            <label className="text-lg font-medium">
              Mediation Board Request Log
            </label>
          </label>
        </Link>

        <Link to="/drc/mediation-board-response-log">
          <label className="text-lg font-medium cursor-pointer hover:text-blue-500">
            Mediation Board Response Log
          </label>
        </Link>
      </div>
    </div>
  );
};

export default Logs;
