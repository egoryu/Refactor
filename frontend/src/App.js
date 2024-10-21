import './App.css';
import {Footer} from "./components/Footer";
import {Header} from "./components/header/Header";
import {Menu} from "./components/Menu";
import {MainPage} from "./components/content/main/MainPage";
import {Trade} from "./components/content/trading/Trade";
import {Route, Routes} from "react-router-dom";
import {Stock} from "./components/content/trading/Stock";
import {RootProfile} from "./components/content/profile/RootProfile";
import PrivateRouteProfile from "./components/content/profile/privateRouteProfile";
import {useEffect} from "react";
import authStore from "./store/store";

function App() {
    useEffect(() => {
        authStore.checkAuth();
    }, []);

    return (
    <div className='wrapper'>
        <Header />
        <div className={'menuContent'}>
            <Menu />

            <Routes>
                <Route path="/" element={<MainPage/> } />
                <Route path="trading" element={<Trade />} />
                <Route path="profile" element={<PrivateRouteProfile />}>
                    <Route path="" element={<RootProfile />} />
                </Route>
                <Route path="trading/stock/:id" element={<Stock />}/>
            </Routes>
        </div>
        <Footer />
    </div>
    );
}

export default App;
