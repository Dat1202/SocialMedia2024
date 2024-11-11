import { faGear } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useEffect, useState } from 'react'
import Menu from '../base/MenuItem'
import ProfileRoute from '../base/ProfileRoute';
import { UserContext } from '../../layout/Router';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Apis, { endpoints } from "../../configs/Apis";
import Spinner from "../../components/base/Spinner";

const MenuSideBar = () => {
    const [user,] = useContext(UserContext);
    const [menu, setMenu] = useState(null);
    // console.log(menu);

    useEffect(() => {
        const loadMenu = async () => {
            let data = await Apis.get(endpoints['menu']);
            setMenu(data.data);
        };
        loadMenu();
    }, []);
    if (menu === null) return <Spinner />;

    return (
        <div className="h-screen sticky top-16 overflow-hidden ">
            <PerfectScrollbar >
                <div className='p-1 hover:rounded-lg transition duration-150 ease-in-out hover:bg-[var(--hover-color)]'>
                    <ProfileRoute avatar={user?.avatar} userName={`${user?.lastName} ${user?.firstName}`} userId={user?.id} />
                </div>
                <h1>{menu.data && (menu.map(m => (
                    <div key={m.id}>
                        <Menu icon={faGear} content={m.menuName} link="/setting" />
                    </div>
                )))}</h1>
            </PerfectScrollbar>
        </div>
    )
}

export default MenuSideBar
