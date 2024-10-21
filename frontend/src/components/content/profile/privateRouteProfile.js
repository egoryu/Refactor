import { Navigate, Outlet } from "react-router-dom";
import authStore from "../../../store/store.js";
import { observer } from "mobx-react-lite";

const PrivateRoute = (props) => {

    if (authStore.isAuthInProgress) {
        return <div>Checking auth...</div>;
    }
    if (authStore.isAuth) {
        return <Outlet/>
    } else {
        return <Navigate to="/" />;
    }
};

export default observer(PrivateRoute);