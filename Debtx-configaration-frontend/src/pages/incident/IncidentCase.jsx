import { useState } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";



const IncidentCase = () => {

    const [showCard, setShowCard] = useState(false);

    const handleDownloadClick = () => {
        setShowCard(prevState => !prevState);

        console.log("Download button clicked");
    };

    return (
        <div className={`${GlobalStyle.cardContainer} w-full`}>
            <div className="relative">
                <div>
                    <p className="mb-2">
                        <strong>Incident Id</strong>
                    </p>
                    <p className="mb-2">
                        <strong>Account No</strong>
                    </p>
                    <p className="mb-2">
                        <strong>Customer Refference</strong>
                    </p>
                    <p className="mb-2">
                        <strong>Created Date</strong>
                    </p>
                    <p className="mb-2">
                        <strong>Implemented Date</strong>
                    </p>
                    <p className="mb-2">
                        <strong>Area</strong>
                    </p>
                    <p className="mb-2">
                        <strong>Rtom</strong>
                    </p>
                    <p className="mb-2">
                        <strong>drc_selection_rule_base</strong>
                    </p>
                    <p className="mb-2">
                        <strong>current_selection_logic</strong>
                    </p>
                    <p className="mb-2">
                        <strong>bss_arrears_amount</strong>
                    </p>
                    <p className="mb-2"> */
                        <strong>current_arrears_amount</strong>
                    </p>
                    <p className="mb-2">
                        <strong>action_type</strong>
                    </p>
                    <p className="mb-2">
                        <strong>selection_rule</strong>
                    </p>
                    <p className="mb-2">
                        <strong>last_payment_date</strong>
                    </p>
                    <p className="mb-2">
                        <strong>monitor_months</strong>
                    </p>
                    <p className="mb-2">
                        <strong>last_bss_reading_date</strong>
                    </p>
                    <p className="mb-2">
                        <strong>commission</strong>
                    </p>
                    <p className="mb-2">
                        <strong>case_current_status</strong>
                    </p>
                    <p className="mb-2">
                        <strong>case_current_status</strong>
                    </p>
                    <p className="mb-2">
                        <strong>filtered_reason</strong>
                    </p>
                    <div className="flex gap-4 mt-8">
                        <select className={`${GlobalStyle.selectBox} w-full`} onClick={handleDownloadClick}>
                            <option value="option1">Contact</option>
                        </select>
                    </div>
                    {showCard && (
                        <div className={`${GlobalStyle.cardContainer}`}>
                            <p className="mb-2">
                                <strong>Mobile : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>Email :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Land :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Address :</strong>
                            </p>
                        </div>
                    )}

                    <div className="flex gap-4 mt-8">
                        <select className={`${GlobalStyle.selectBox} w-full`} onClick={handleDownloadClick}>
                            <option value="option1">Product Details </option>
                        </select>
                    </div>
                    {showCard && (
                        <div className={`${GlobalStyle.cardContainer}`}>
                            <p className="mb-2">
                                <strong>
                                    Product Label :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Customer Refference : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>Product Sequence :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Equipment Ownership :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Product Id :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Product Name :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Product_Status :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Effective Date :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Service_Address :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Category :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Db_Cpe_Status :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Received_List_Cpe_Status :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Service Type :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Region :</strong>
                            </p>
                            <p className="mb-2">
                                <strong>Province :</strong>
                            </p>

                        </div>
                    )}

                    <div className="flex gap-4 mt-8">
                        <select className={`${GlobalStyle.selectBox} w-full`} onClick={handleDownloadClick}>
                            <option value="option1">Customer Details </option>
                        </select>
                    </div>
                    {showCard && (
                        <div className={`${GlobalStyle.cardContainer}`}>
                            <p className="mb-2">
                                <strong>
                                    Customer Name : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>Company Name : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>Company Registry Number : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>Full Address : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>Zip Code : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>CustomerType Name : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>NIC : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>CustomerType Id : </strong>
                            </p>

                        </div>
                    )}

                    <div className="flex gap-4 mt-8">
                        <select className={`${GlobalStyle.selectBox} w-full`} onClick={handleDownloadClick}>
                            <option value="option1">Account Details </option>
                        </select>
                    </div>
                    {showCard && (
                        <div className={`${GlobalStyle.cardContainer}`}>
                            <p className="mb-2">
                                <strong>
                                    Account Status : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>
                                    Account Effective Date : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>
                                    Account Activate Date : </strong>
                            </p>
                            <p className="mb-2">
                                <strong> Credit Class Id : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>Credit Class Name : </strong>
                            </p>
                            <p className="mb-2">
                                <strong> Billing Centre : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>Customer Segment : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>Mobile Contact Telphone : </strong>
                            </p>
                            <p className="mb-2">
                                <strong> Daytime Contact Telphone : </strong>
                            </p>

                        </div>
                    )}



                    <div className="flex gap-4 mt-8">
                        <select className={`${GlobalStyle.selectBox} w-full`} onClick={handleDownloadClick}>
                            <option value="option1">Remark </option>
                        </select>
                    </div>
                    {showCard && (
                        <div className={`${GlobalStyle.cardContainer}`}>
                            <p className="mb-2">
                                <strong>
                                    remark</strong>
                            </p>
                            <p className="mb-2">
                                <strong>remark_added_by : </strong>
                            </p>
                            <p className="mb-2">
                                <strong>remark_added_date :</strong>
                            </p>

                        </div>
                    )}
                </div>

                {/* Colons column */}
                <div className="absolute left-48 top-0">
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>
                    <p className="mb-2">:</p>


                </div>

                {/* Spaces for values */}
                <div className="absolute left-52 top-0">
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>
                    <p className="mb-2">{" "}</p>

                </div>
            </div>
        </div>


    );
};

export default IncidentCase;
