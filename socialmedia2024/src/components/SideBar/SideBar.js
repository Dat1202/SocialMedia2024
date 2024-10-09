import { faGear } from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react'
import Menu from '../base/MenuItem'
import ProfileRoute from '../base/ProfileRoute';
import { UserContext } from '../../Router';

const MenuSideBar = ({ menu }) => {
    const [user,] = useContext(UserContext);

    return (
        <>
            <div className="overflow-y-scroll max-h-screen">
                <ProfileRoute avatar={user?.avatar} userName={user?.userName} />
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
