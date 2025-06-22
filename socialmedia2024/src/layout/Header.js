import React, {useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "./Router";
import { faBell, faMessage } from "@fortawesome/free-regular-svg-icons";
import BaseIcon from "../components/base/BaseIcon";
import { setOnMessageReceived, startConnection, stopConnection } from "../service/HubService";
import { authApis, endpoints } from "../configs/Apis";
import Logo from "../components/base/Logo";
import Search from "../components/base/Search";
import ProfileMenu from "../components/profile/ProfileMenu";
import Notification from "../components/notification/Notification";

const Header = () => {
    const [user] = useContext(UserContext);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [isOpenNotify, setIsOpenNotify] = useState(false);
    const [notifications, setNotification] = useState([]);
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
            <div
              style={{ color: "var(--icon-color)" }}
              className="relative group"
            >
              <Search />
            </div>
          </div>
          <div></div>
          <div
            style={{ color: "var(--icon-color)" }}
            className="flex gap-2 justify-between items-center my-1"
          >
            <Link to="/chat/" className="relative">
              <BaseIcon icon={faMessage} background="var(--secondary-color)" />
            </Link>

            <span onClick={OpenNotify} className="relative">
              <BaseIcon icon={faBell} background="var(--secondary-color)" />
            </span>

            {isOpenNotify && <Notification notifications={notifications}  getNotifications={GetNotifications}/>}

            <div onClick={OpenProfile} className="relative p-2">
              {/* <ProfileRoute avatar={user?.avatar} /> */}
              <img
                src={user?.avatar}
                style={{ objectFit: "cover" }}
                alt="avatar"
                className="rounded-full w-11 h-11 "
              />
            </div>

            {isOpenProfile && <ProfileMenu />}
          </div>
        </section>
      </>
    );
}

export default React.memo(Header);