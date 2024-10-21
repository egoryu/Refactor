import {ProfileImage} from "./ProfileImage";

export function Header() {
    return (
        <header>
            <div className='logoName'>
                <div className='logo'>
                    <img src='/img/logo1.png' alt='logo'/>
                </div>
                <div>
                    <span className='name'>
                        TradePulse
                    </span>
                </div>
            </div>
            <div className={"search"}>
                <input placeholder={"Поиск TradePulse"}/>
            </div>
            <div className='profile'>
                <ProfileImage></ProfileImage>
            </div>
        </header>
    )
}
