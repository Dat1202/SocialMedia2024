import { faGear } from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react'
import Menu from '../../base/Menu'
import { UserContext } from '../../Router';
import ProfileRoute from '../Profile/ProfileRoute';

const MenuSideBar = ({ menu }) => {
    const [user,] = useContext(UserContext);

    return (
        <>
            <div className="overflow-y-scroll max-h-screen" style={{ background: "var(--bg-color)" }}>
                <ProfileRoute />
                <h1>{menu.success ? (menu.data.map(m => (
                    <div key={m.id}>
                        <Menu icon={faGear} content={m.menuName} link="/setting" />
                    </div>
                ))) : (menu.error.errorMessage)}</h1>
            </div>
        </>
    )
}

export default MenuSideBar
