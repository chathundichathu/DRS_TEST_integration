// Purpose: This  is the litigation page.
// Created Date: 2024-12-07
// Created By: Buthmi Mithara Abeysena (buthmimithara1234@gmail.com)
// Last Modified Date: 2024-12-07
// Modified By: Buthmi Mithara Abeysena (buthmimithara1234@gmail.com)
// Version: node 22.2.0
// ui number : litigation
// Dependencies: tailwind css
// Notes : This component renders a page with two buttons: one linking to the "Litigation Log" and the other (placeholder) linking to "Post Litigation Log".

import React from "react";
import { Link } from "react-router-dom";
import GlobalStyle from "../../../../assets/prototype/GlobalStyle";

const LitigationPage = () => {
  return (
    <div className="p-20">
      {/* Buttons Section */}
      <div className="flex flex-col items-center justify-center mt-20 space-y-4">
        {/* Link to Litigation Log */}
        <Link to="/lod/ftl_lod/litigation/LitigationLog">
          <button className={`${GlobalStyle.buttonPrimary} w-48 h-12`}>
            Litigation Log &gt;
          </button>
        </Link>

        {/* Post Litigation Log Button (Placeholder) */}
        <Link to={"/lod/ftl_lod/litigation/PostLitigationLog"}>
        <button className={`${GlobalStyle.buttonPrimary} w-48 h-12`}>
          Post Litigation Log &gt;
        </button>
        </Link>
      </div>
    </div>
  );
};

export default LitigationPage;
