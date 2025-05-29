import { faGear } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState, useCallback} from 'react';
import Menu from '../base/MenuItem';
import ProfileRoute from '../base/ProfileRoute';
import { UserContext } from '../../layout/Router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Apis, { endpoints } from '../../configs/Apis';
import Spinner from '../../components/base/Spinner';

const MenuSideBar = () => {
    const [user] = useContext(UserContext);
    const [menu, setMenu] = useState(null);

    const loadMenu = useCallback(async () => {
        try {
            const { data } = await Apis.get(endpoints['menu']);
            setMenu(data);
        } catch (error) {
            console.error('Error loading menu:', error);
        }
    }, []);

    useEffect(() => {
        loadMenu();
    }, [loadMenu]);

    if (!menu) return <Spinner />;

    return (
        <div className='h-screen sticky top-16 overflow-hidden bg-white shadow-md rounded-lg'>
            <PerfectScrollbar>
                <div className='p-2 hover:rounded-lg transition duration-150 ease-in-out hover:bg-gray-100'>
                    <ProfileRoute avatar={user?.avatar} userName={`${user?.lastName} ${user?.firstName}`} userId={user?.id} />
                </div>
                <div className='mt-4'>
                    {menu.map((m) => (
                        <Menu key={m.id} icon={faGear} content={m.menuName} link='/setting' />
                    ))}
                </div>
            </PerfectScrollbar>
        </div>
    );
};

export default React.memo(MenuSideBar);
