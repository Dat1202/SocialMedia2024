import React, {useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "./Router";
import { faArrowRightFromBracket, faGear} from "@fortawesome/free-solid-svg-icons";
import { faBell, faMessage } from "@fortawesome/free-regular-svg-icons";
import BaseIcon from "../components/base/BaseIcon";
import Menu from "../components/base/MenuItem";
import ProfileRoute from "../components/base/ProfileRoute";
import Notification from "../components/base/Notification";
import { setOnMessageReceived, startConnection, stopConnection } from "../service/HubService";
import { authApis, endpoints } from "../configs/Apis";
import Logo from "../components/base/Logo";
import Search from "../components/base/Search";

const Header = () => {
    const [user, dispatch] = useContext(UserContext);
    const nav = useNavigate()
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [isOpenNotify, setIsOpenNotify] = useState(false);
    const [notification, setNotification] = useState([]);
    // console.log(notification);

    useEffect(() => {
        // console.log("header")
        GetNotifications();
        startConnection();

        const onMessageReceived = (notificationAction) => {
            console.log("Notification received:", notificationAction);

            setNotification((notifications) => [
                {
                    id: notificationAction.id,
                    userId: notificationAction.userId,
                    senderName: notificationAction.senderName,
                    avatar: notificationAction.avatar,
                    reaction: notificationAction.reaction,
                    postID: notificationAction.postID,
                    createdAt: notificationAction.createdAt,
                    actionType: notificationAction.actionType,
                    seen: notificationAction.seen,
                },
                ...notifications,
            ]);
        };

        setOnMessageReceived(onMessageReceived);

        return () => {
            stopConnection();
            setOnMessageReceived(null);
        };
    }, []);

    const GetNotifications = async () =>{
        const res = await authApis().get(endpoints['notification']);
        setNotification(res.data);
        // console.log(res.data)
    }

    const logout = (e) => {
        e.preventDefault();
        nav("/login")
        dispatch({
            "type": "logout",
        })
    }
    const OpenProfile = () => {
        if (isOpenNotify) {
            setIsOpenNotify(!isOpenNotify);
        }
        setIsOpenProfile(!isOpenProfile);
    }

    const OpenNotify = () => {
        if (isOpenProfile) {
            setIsOpenProfile(!isOpenProfile);
        }
        setIsOpenNotify(!isOpenNotify);
    }

    return (
      <>
        <section
          style={{ background: "var(--primary-color)" }}
          className="flex justify-between items-center sticky top-0 z-30 shadow-lg h-16 px-4"
        >
          <div className="flex gap-2 justify-between items-center my-1">
            {/* logo */}
            <div className="w-12 mx-4">
              <Logo />
            </div>
            {/* search */}
            <div style={{ color: "var(--icon-color)" }} className="relative group" >
              <Search />
            </div>
          </div>
          <div></div>
          <div
            style={{ color: "var(--icon-color)" }}
            className="flex gap-2 justify-between items-center my-1"
          >
            <Link to="/chat" className="relative">
              <BaseIcon icon={faMessage} background="var(--secondary-color)" />
            </Link>

            <span onClick={OpenNotify} className="relative">
              <BaseIcon icon={faBell} background="var(--secondary-color)" />
            </span>

            {isOpenNotify && (
              <div
                style={{ background: "var(--primary-color)" }}
                className="absolute top-16 right-8 p-2 w-80 rounded-lg border-2"
              >
                <Notification
                  notifications={notification}
                  getNotifications={GetNotifications}
                />
              </div>
            )}

            <div onClick={OpenProfile} className="relative p-2">
              {/* <ProfileRoute avatar={user?.avatar} /> */}
              <img
                src={user?.avatar}
                style={{ objectFit: "cover" }}
                alt="avatar"
                className="rounded-full w-11 h-11 "
              />
            </div>

            {isOpenProfile &&
              (user === null ? (
                <div
                  style={{ background: "var(--primary-color)" }}
                  className="absolute top-16 right-8 p-2 w-64 rounded-lg border-2"
                >
                  <Menu
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
                  />
                  <Menu icon={faGear} content="Cài đặt" link="/setting" />
                  <Menu
                    icon={faArrowRightFromBracket}
                    content="Đăng xuất"
                    func={logout}
                  />
                </div>
              ))}
          </div>
        </section>
      </>
    );
}

export default React.memo(Header);