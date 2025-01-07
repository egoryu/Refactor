import {Navigate, Outlet} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useSelector} from "react-redux";

const PrivateRoute = (props) => {
    const {isAuth, isAuthInProgress} = useSelector((state) => state.auth);

    if (isAuthInProgress) {
        return <div>Checking auth...</div>;
    }
    if (isAuth) {
        return <Outlet/>
    } else {
        return <Navigate to="/"/>;
    }
};

export default observer(PrivateRoute);