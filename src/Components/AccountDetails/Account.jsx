import { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import SecuritySection from "./SecuritySection";
import Preferences from "./Preferences";
import OrderHistory from "./OrderHistory";
import Sidebar from "./SideBar";

export default function Account() {
    const [activePage, setActivePage] = useState("Personal Details");

    const renderPage = () => {
        switch (activePage) {
            case "Personal Details":
                return <PersonalInfo />;
            case "Security":
                return <SecuritySection />;
            case "Preferences":
                return <Preferences />;
            case "Order History":
                return <OrderHistory />;
            default:
                return <PersonalInfo />;
        }
    };

    return (
        <div className="h-screen flex bg-[#FCFAF8] overflow-hidden">

            <Sidebar
                activepage={activePage}
                setActivePage={setActivePage}
            />

            <main className="flex-1 h-screen overflow-y-auto px-16 no-scrollbar">
                {renderPage()}
            </main>

        </div>
    );
}