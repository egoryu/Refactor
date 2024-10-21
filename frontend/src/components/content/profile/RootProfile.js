
import React, {useState} from "react";
import {Profile} from "./Profile";
import {Portfolio} from "./Portfolio";

export function RootProfile() {
    const [showProfile, setShowProfile] = useState(true);

    const handleProfileClick = () => {
        setShowProfile(true);
    };

    const handlePortfolioClick = () => {
        setShowProfile(false);
    };

    return (
        <div>
            <div className={"profileButtons"}>
                <div onClick={handleProfileClick} className={showProfile ? 'button' : 'buttonCommon'}>
                    Профиль
                </div>
                <div onClick={handlePortfolioClick} className={showProfile ? 'buttonCommon' : 'button'}>
                    Портфель
                </div>
            </div>
            {showProfile ? <Profile /> : <Portfolio />}
        </div>
    );
}