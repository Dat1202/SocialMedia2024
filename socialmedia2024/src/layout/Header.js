import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <>
            <NavLink className="nav-link" to='/'>Home</NavLink>
            <NavLink className="nav-link" to='/login'>Login</NavLink>

        </>
    )
}

export default Header