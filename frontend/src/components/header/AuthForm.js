import React, {useState} from 'react';
import validator from 'validator';
import "../../style/auth.css"
import {Navigate} from "react-router-dom";
import {login, register} from "../../store/actions";
import {useDispatch} from "react-redux";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToProfile, setRedirectToProfile] = useState(false);

    const dispatch = useDispatch();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    if (redirectToProfile) {
        return <Navigate to="/profile"/>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Вход</h2>
            <label>
                Email:
                <input type="email" value={email} onChange={handleEmailChange}/>
            </label>
            <label>
                Пароль:
                <input type="password" value={password} onChange={handlePasswordChange}/>
            </label>
            <button type="submit">Войти</button>
        </form>
    );
};

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirectToProfile, setRedirectToProfile] = useState(false);

    const dispatch = useDispatch();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validator.isEmail(email)) {
            alert("You did not enter email")
        } else if (password !== confirmPassword) {
            alert("Repeated password incorrectly")
        } else {
            dispatch(register(email, password));
        }
    };

    if (redirectToProfile) {
        return <Navigate to="/"/>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            <label>
                Email:
                <input type="email" value={email} onChange={handleEmailChange}/>
            </label>
            <label>
                Пароль:
                <input type="password" value={password} onChange={handlePasswordChange}/>
            </label>
            <label>
                Подтвердите пароль:
                <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
            </label>
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleToggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="auth-form-container">
            <button onClick={handleToggleForm} className="toggle-button">
                {isLogin ? 'Регистрация' : 'Вход'}
            </button>
            {isLogin ? <LoginForm/> : <RegistrationForm/>}
        </div>
    );
};

export default AuthForm;