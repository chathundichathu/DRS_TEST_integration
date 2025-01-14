import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { Link } from "react-router-dom";

const Config = () => {
  return (
    <div className={`${GlobalStyle.fontPoppins}`}>
  <div className="flex justify-start gap-4">
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/regi-drc">
      Register DRC
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/edit-drc">
      Edit DRC
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/drc-list">
      DRC List
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/drc-info">
      DRC Info
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/drc-edit-history">
      DRC Edit History
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/drc-edit-details">
      DRC Edit Details
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/drc-end">
      DRC End
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/drc's-info">
      DRC's Info
    </Link>
  </div>
  <br />
  <div className="flex justify-start gap-4">
  <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/ro-list">
      RO List
    </Link>
  <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/ro-edit">
      RO Edit History
    </Link>
  <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/ro-edit-details">
      RO Edit Details
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/add-ro">
      Add Ro
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/ro-details/:roId">
      Ro Details
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/ro-list-drc">
      RO List DRC
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/ro-end">
      RO End
    </Link>
  </div>
  <br />
  <div className="flex justify-start gap-4">
  <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/rtom-list">
      RTOM List
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/rtom-log">
      RTom Log
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/regi-rtom">
      Register RTOM
    </Link>
    <Link
      className={`${GlobalStyle.buttonPrimary}`}
      to="/config/rtom-edit-history"
    >
      RTom Edit History
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/rtom-info">
      RTOM Info
    </Link>
    <Link className={`${GlobalStyle.buttonPrimary}`} to="/config/rtom-edit-details">
      RTOM Edit Details
    </Link><Link className={`${GlobalStyle.buttonPrimary}`} to="/config/rtom-end">
      RTOM End
    </Link>
  </div>
  <br />
  <div className="flex justify-start gap-4">
    <Link
      className={`${GlobalStyle.buttonPrimary}`}
      to="/config/service-types-list"
    >
      Service Type List
    </Link>
  </div>
</div>
  );
};

export default Config;
