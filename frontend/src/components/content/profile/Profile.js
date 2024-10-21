import React, { useState, useEffect } from 'react';
import "../../../style/profile.css"
import ProfileService from "../../../api/api.profile";

export function Profile({ userId }) {
    const [userData, setUserData] = useState({
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await ProfileService.getProfileData();
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData(userData);
    };

    const handleInputChange = (e) => {
        if (e.target.name === "age") {
            setEditedData({
                ...editedData,
                [e.target.name]: parseInt(e.target.value)
            });
        } else {
            setEditedData({
                ...editedData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSave = async () => {
        let response;
        setUserData(editedData);
        setIsEditing(false);
        try {
            response = await ProfileService.putProfileData(editedData);
            alert("Данные обновлены");
        } catch (error) {
            alert("Не сохранено. Ты слишком мал.")
            console.error(error);
        }
    };

    return (
        <div>
            {!userData && <h2>Loading...</h2>}
            {(!!userData && !isEditing) && (
                <div className="user-profile">
                    <h1>Профиль</h1>
                    <p>Имя: {userData.name}</p>
                    <p>Фамилия: {userData.surname}</p>
                    <p>email: {userData.email}</p>
                    <p>Возраст: {userData.age}</p>
                    <p>Страна: {userData.country}</p>
                    <p>Телефон: {userData.phone}</p>
                    {!isEditing && (
                        <button onClick={handleEdit}>Редактировать</button>
                    )}

                </div>
            )}
            {isEditing && (
                <div className="user-profile">
                    <h2>Редактирование профиля</h2>
                    <label>Имя:</label>
                    <input
                        type="text"
                        name="name"
                        value={editedData.name}
                        onChange={handleInputChange}
                    />
                    <label>Фамилия:</label>
                    <input
                        type="text"
                        name="surname"
                        value={editedData.surname}
                        onChange={handleInputChange}
                    />
                    <label>email:</label>
                    <input
                        type="email"
                        name="email"
                        value={editedData.email}
                        onChange={handleInputChange}
                    />
                    <label>Возраст:</label>
                    <input
                        type="number"
                        name="age"
                        value={editedData.age}
                        onChange={handleInputChange}
                    />
                    <label>Страна:</label>
                    <input
                        type="text"
                        name="country"
                        value={editedData.country}
                        onChange={handleInputChange}
                    />
                    <label>Телефон:</label>
                    <input
                        type="text"
                        name="phone"
                        value={editedData.phone}
                        onChange={handleInputChange}
                    />
                    <p></p>
                    <button onClick={handleSave}>Сохранить</button>
                </div>
            )}
        </div>
    );
}