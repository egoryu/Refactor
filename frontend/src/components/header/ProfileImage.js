import {useEffect, useState} from "react";
import Modal from "./Modal";
import AuthForm from "./AuthForm";
import authStore from "../../store/store";
import {Link} from "react-router-dom";

export function ProfileImage() {
    const [isModalActive, setModalActive] = useState(false);
    const [isAuth, setAuth] = useState(authStore.isAuth);

    useEffect(() => {
        setAuth(authStore.isAuth);
    }, [authStore.isAuth]);

    const handleModalOpen = () => {
        setModalActive(true);
    };
    const handleModalClose = () => {
        setModalActive(false);
    };

    const handleClick = event => {
        if (event.detail === 2) {
            localStorage.removeItem("token");
            authStore.isAuth = false;
            setAuth(false);
        }
    };

    if (isAuth) {
        return (
            <div>
                <Link to="/profile" onClick={handleClick}>
                    <img src={"img/Group.png"} alt={"Logo"}/>
                </Link>
            </div>
        );
    } else {
        return (
            <div className="App">
                <button className="button" onClick={handleModalOpen}>
                    Log in
                </button>
                <div>
                    {isModalActive && (
                        <Modal title="" onClose={handleModalClose}>
                            <AuthForm />
                        </Modal>
                    )}
                </div>
            </div>
        );
    }
}
