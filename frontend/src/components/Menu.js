
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Menu() {
    const [selectedItem, setSelectedItem] = useState('home');

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className="menu">
            <h1>Меню</h1>
            <ul>
                <li className={selectedItem === 'home' ? 'selected' : ''} onClick={() => handleItemClick('home')}>
                    <Link className={"menuText"} to="/">Главная</Link>
                </li>
                <li className={selectedItem === 'trading' ? 'selected' : ''} onClick={() => handleItemClick('trading')}>
                    <Link className={"menuText"} to="/trading">Торговля</Link>
                </li>
                <li className={selectedItem === 'profile' ? 'selected' : ''} onClick={() => handleItemClick('profile')}>
                    <Link className={"menuText"} to="/profile">Профиль</Link>
                </li>
            </ul>
        </div>
    );
}