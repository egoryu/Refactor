import {useEffect, useState} from "react";
import Modal from "./Modal";
import AuthForm from "./AuthForm";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth, logoutUser} from "../../store/actions";

export function ProfileImage() {
    const [isModalActive, setModalActive] = useState(false);
    const dispatch = useDispatch();
    const {isAuth} = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    const handleModalOpen = () => {
        setModalActive(true);
    };
    const handleModalClose = () => {
        setModalActive(false);
    };

    const handleClick = event => {
        if (event.detail === 2) {
            dispatch(logoutUser());
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
                            <AuthForm/>
                        </Modal>
                    )}
                </div>
            </div>
        );
    }
}
