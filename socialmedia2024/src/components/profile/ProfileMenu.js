import React, { useContext } from 'react'
import { faArrowRightFromBracket, faGear} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import MenuItem from '../sideBar/MenuItem';
import ProfileRoute from '../base/ProfileRoute';
import { UserContext } from '../../layout/Router';

const ProfileMenu = ({  }) => {
  const [user, dispatch] = useContext(UserContext);
  const nav = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    nav("/login");
    dispatch({
      type: "logout",
    });
  };

  return (
    <>
      {user === null ? (
        <div
          style={{ background: "var(--primary-color)" }}
          className="absolute top-16 right-8 p-2 w-64 rounded-lg border-2"
        >
          <MenuItem
            icon={faArrowRightFromBracket}
            content="Đăng nhập"
            link="/login"
          />
        </div>
      ) : (
        <div
          style={{ background: "var(--primary-color)" }}
          className="absolute top-16 right-8 p-3 w-64 rounded-lg border-2"
        >
          <ProfileRoute
            avatar={user?.avatar}
            userName={`${user?.lastName} ${user?.firstName}`}
            userId={user?.id}
            isHover={true}
          />
          <MenuItem icon={faGear} content="Cài đặt" link="/setting" />
          <MenuItem
            icon={faArrowRightFromBracket}
            content="Đăng xuất"
            func={logout}
          />
        </div>
      )}
    </>
  );
};

export default React.memo(ProfileMenu);
