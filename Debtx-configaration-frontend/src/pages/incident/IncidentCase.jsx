import { useState } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";

const IncidentCase = () => {
    const [showSection, setShowSection] = useState({
        contact: false,
        product: false,
        customer: false,
        account: false,
        last_actions: false,
        marketing_details: false,
    });

    const toggleSection = (section) => {
        // Close all sections first
        const allClosed = Object.keys(showSection).reduce((acc, key) => {
            acc[key] = false;
            return acc;
        }, {});
        
        // Then toggle the clicked section
        setShowSection({
            ...allClosed,
            [section]: !showSection[section]
        });
    };

    return (
        <div>
            <div className={`${GlobalStyle.cardContainer} w-full`}>
             <div className="grid grid-cols-2 gap-8">
                 {/* Left Column */}
                 <div>
                     <div className="mb-4">
                         <p className="font-semibold">Incident Id : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Account No : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Area : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Rtom : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Current Selection Logic : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">bss arrears amount : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Action Type : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Last Payment Date : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Monitor Months : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Case Current Status : </p>
                     </div>
                 </div>

                 {/* Right Column */}
                 <div>
                     <div className="mb-4">
                         <p className="font-semibold">Customer Reference : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Created Date : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Implemented Date : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">DRC Selection Rule Base : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Current Arrears Amount : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Selection Rule : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Last bss Reading Date : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Commission : </p>
                     </div>
                     <div className="mb-4">
                         <p className="font-semibold">Filtered Reason : </p>
                     </div>
                 </div>
             </div>
</div>


            {/* Expandable Sections */}
            <div className="mt-8 space-y-4">
                {/* Contact Section */}
                <div>
                    <button 
                        className={`${GlobalStyle.selectBox} w-full text-left px-4 py-2 flex justify-between items-center`}
                        onClick={() => toggleSection('contact')}
                    >
                        Contact
                        <span>{showSection.contact ? '▲' : '▼'}</span>
                    </button>
                    {showSection.contact && (
                        <div className="mt-2 p-4 border border-gray-200 rounded">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="mb-2"><strong>Mobile : </strong></p>
                                    <p className="mb-2"><strong>Email : </strong></p>
                                </div>
                                <div>
                                    <p className="mb-2"><strong>Land : </strong></p>
                                    <p className="mb-2"><strong>Address : </strong></p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Product Details Section */}
                <div>
                    <button 
                        className={`${GlobalStyle.selectBox} w-full text-left px-4 py-2 flex justify-between items-center`}
                        onClick={() => toggleSection('product')}
                    >
                        Product Details
                        <span>{showSection.product ? '▲' : '▼'}</span>
                    </button>
                    {showSection.product && (
                        <div className="mt-2 p-4 border border-gray-200 rounded">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="mb-2"><strong>Product Label : </strong></p>
                                    <p className="mb-2"><strong>Customer Reference : </strong></p>
                                    <p className="mb-2"><strong>Product Sequence : </strong></p>
                                    <p className="mb-2"><strong>Equipment Ownership : </strong></p>
                                    <p className="mb-2"><strong>Product Id : </strong></p>
                                    <p className="mb-2"><strong>Product Name : </strong></p>
                                    <p className="mb-2"><strong>Product Status : </strong></p>
                                    <p className="mb-2"><strong>Effective Date : </strong></p>

                                </div>
                                <div>
                                        
                                    <p className="mb-2"><strong>Service Address : </strong></p>
                                    <p className="mb-2"><strong>Category : </strong></p>
                                    <p className="mb-2"><strong>Db_Cpe_Status : </strong></p>
                                    <p className="mb-2"><strong>Received_List_Cpe_Status : </strong></p>
                                    <p className="mb-2"><strong>Service Type : </strong></p>
                                    <p className="mb-2"><strong>Region : </strong></p>
                                    <p className="mb-2"><strong>Province : </strong></p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Customer Details Section */}
                <div>
                    <button 
                        className={`${GlobalStyle.selectBox} w-full text-left px-4 py-2 flex justify-between items-center`}
                        onClick={() => toggleSection('customer')}
                    >
                        Customer Details
                        <span>{showSection.customer ? '▲' : '▼'}</span>
                    </button>
                    {showSection.customer && (
                        <div className="mt-2 p-4 border border-gray-200 rounded">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="mb-2"><strong>Customer Name : </strong></p>
                                    <p className="mb-2"><strong>Company Name : </strong></p>
                                    <p className="mb-2"><strong>Company Registry Number : </strong></p>
                                    <p className="mb-2"><strong>Full Address : </strong></p>
                                </div>
                                <div>
                                    <p className="mb-2"><strong>Zip code : </strong></p>
                                    <p className="mb-2"><strong>Customer Type Name : </strong></p>
                                    <p className="mb-2"><strong>NIC : </strong></p>
                                    <p className="mb-2"><strong>Customer Type Id : </strong></p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Account Details Section */}
                <div>
                    <button 
                        className={`${GlobalStyle.selectBox} w-full text-left px-4 py-2 flex justify-between items-center`}
                        onClick={() => toggleSection('account')}
                    >
                        Account Details
                        <span>{showSection.account ? '▲' : '▼'}</span>
                    </button>
                    {showSection.account && (
                        <div className="mt-2 p-4 border border-gray-200 rounded">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="mb-2"><strong>Account Status : </strong></p>
                                    <p className="mb-2"><strong>Account Effective Date : </strong></p>
                                    <p className="mb-2"><strong>Account Active Date : </strong></p>
                                    <p className="mb-2"><strong>Credit Class Id : </strong></p>
                                    <p className="mb-2"><strong>Credit Class Name : </strong></p>
                                    <p className="mb-2"><strong>Billing Centre : </strong></p>
                                </div>
                                <div>
                                    <p className="mb-2"><strong>Customer Segment : </strong></p>
                                    <p className="mb-2"><strong>Mobile Contact Telephone : </strong></p>
                                    <p className="mb-2"><strong>Daytime Contact Telephone : </strong></p>
                                    <p className="mb-2"><strong>Email Address : </strong></p>
                                    <p className="mb-2"><strong>Last Rated Date : </strong></p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Last Actions Section */}
                <div>
                    <button 
                        className={`${GlobalStyle.selectBox} w-full text-left px-4 py-2 flex justify-between items-center`}
                        onClick={() => toggleSection('last_actions')}
                    >
                        Last Actions
                        <span>{showSection.last_actions ? '▲' : '▼'}</span>
                    </button>
                    {showSection.last_actions && (
                        <div className="mt-2 p-4 border border-gray-200 rounded">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="mb-2"><strong>Billed Sequence : </strong></p>
                                    <p className="mb-2"><strong>Billed Created : </strong></p>
                                </div>
                                <div>
                                    <p className="mb-2"><strong>Payment Sequence : </strong></p>
                                    <p className="mb-2"><strong>Billed Sequence : </strong></p>
                                    <p className="mb-2"><strong>Payment Created : </strong></p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Remark Section */}
                <div>
                    <button 
                        className={`${GlobalStyle.selectBox} w-full text-left px-4 py-2 flex justify-between items-center`}
                        onClick={() => toggleSection('marketing_details')}
                    >
                        Remark
                        <span>{showSection.marketing_details ? '▲' : '▼'}</span>
                    </button>
                    {showSection.marketing_details && (
                        <div className="mt-2 p-4 border border-gray-200 rounded">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="mb-2"><strong>Account Manager : </strong></p>
                                    <p className="mb-2"><strong>Consumer Market : </strong></p>
                                </div>
                                <div>
                                    <p className="mb-2"><strong>Informed To : </strong></p>
                                    <p className="mb-2"><strong>Informed On : </strong></p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IncidentCase;