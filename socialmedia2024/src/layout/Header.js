import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "./Router";
import { faArrowRightFromBracket, faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMessage } from "@fortawesome/free-regular-svg-icons";
import BaseIcon from "../components/base/BaseIcon";
import Menu from "../components/base/MenuItem";
import ProfileRoute from "../components/base/ProfileRoute";

const Header = () => {
    const [user, dispatch] = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(true)
    const nav = useNavigate()
    const logout = (e) => {
        e.preventDefault();
        nav("/login")
        dispatch({
            "type": "logout",
        })
    }

    return (
        <>
            <section style={{ background: "var(--primary-color)" }} className="flex justify-between sticky top-0 z-30	shadow-lg	">
                <div className="flex gap-2 justify-between items-center my-1">
                    {/* logo */}
                    <div className="w-12 mx-4">
                        <Link to="/" >
                            <img className="w-full bg-cover	object-contain" src="/logo192.png" alt="logo" />
                        </Link>
                    </div>
                    {/* search */}
                    <div style={{ color: "var(--icon-color)" }} className="relative group">
                        <FontAwesomeIcon className="text-slate-400 group-hover:text-slate-400 group-focus:text-slate-600 absolute left-2 top-1/2 transform -translate-y-1/2" icon={faMagnifyingGlass} />
                        <input style={{ background: "var(--secondary-color)" }} type="text" className="group-hover:border focus:border-neutral-400 focus:border focus:outline-none w-64 rounded-full p-2 pl-8" />
                    </div>
                </div>
                <div ></div>
                <div style={{ color: "var(--icon-color)" }} className="flex gap-2 justify-between items-center my-1">
                    <BaseIcon icon={faMessage} background="var(--secondary-color)" />
                    <BaseIcon icon={faBell} background="var(--secondary-color)" />

                    <div onClick={() => setIsOpen(!isOpen)} className="relative p-2">
                        <img src={user?.avatar} style={{ objectFit: "cover" }} alt="avatar" className="rounded-full w-11 h-11 " />
                    </div>
                    {isOpen && (user === null
                        ? (
                            <div style={{ background: "var(--primary-color)" }} className="absolute top-16 right-8 p-3 w-64 rounded-lg border-2">
                                <Menu icon={faArrowRightFromBracket} content="Đăng nhập" link="/login" />
                            </div>
                        ) : (
                            <div style={{ background: "var(--primary-color)" }} className="absolute top-16 right-8 p-3 w-64 rounded-lg border-2">
                                <ProfileRoute avatar={user?.avatar} userName={user?.userName} />
                                <Menu icon={faGear} content="Cài đặt" link="/setting" />
                                <Menu icon={faArrowRightFromBracket} content="Đăng xuất" func={logout} />
                            </div>
                        ))}
                </div>
            </section>
        </>
    )
}

export default Header