import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../Router";
import { faArrowRightFromBracket, faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMessage } from "@fortawesome/free-regular-svg-icons";
import BaseIcon from "../base/BaseIcon";
import Menu from "../base/Menu";
import ProfileRoute from "../components/Profile/ProfileRoute";

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
                    <div style={{ color: "var(--icon-color)" }} className="relative">
                        <FontAwesomeIcon className="absolute left-2 top-1/4	" icon={faMagnifyingGlass} />
                        <input style={{ background: "var(--secondary-color)" }} type="text" className="border-black border-2 w-64 rounded-full p-2" />
                    </div>
                </div>
                <div ></div>
                <div style={{ color: "var(--icon-color)" }} className="flex gap-2 justify-between items-center my-1">
                    <BaseIcon icon={faMessage} background="var(--secondary-color)" />
                    <BaseIcon icon={faBell} background="var(--secondary-color)" />

                    <div onClick={() => setIsOpen(!isOpen)} style={{ background: "var(--secondary-color)" }} className="relative rounded-full px-4 py-3">
                        <img src="" style={{ objectFit: "cover" }} alt="avatar" className="" />
                    </div>
                    {isOpen && (user === null
                        ? (
                            <div style={{ background: "var(--primary-color)" }} className="absolute top-14 right-8 p-3 w-64 rounded-lg border-2">
                                <Menu icon={faArrowRightFromBracket} content="Đăng nhập" link="/login" />
                            </div>
                        ) : (
                            <div style={{ background: "var(--primary-color)" }} className="absolute top-14 right-8 p-3 w-64 rounded-lg border-2">
                                <ProfileRoute />
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