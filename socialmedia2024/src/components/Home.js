import { useContext, useEffect, useState } from "react";
import Apis, { endpoints } from "../configs/Apis";
import Spinner from "../layout/Spinner";
import { UserContext } from "../Router";

const Home = () => {
    // const [menu, setMenu] = useState(null);
    // const [user, ] = useContext(UserContext);
    // useEffect(() => {
    //     const loadMenu = async () => {
    //             let data = await Apis.get(endpoints['menu']);
    //             setMenu(data);
    //         };
    //         loadMenu();
    //     }, []);

    // if (menu===null) return <Spinner />;

    return (
        <>
            {/* {user === null ? <hi>dat</hi> : <div>hello {user.email}</div>}
            <h1>{menu.success ? (menu.data.map(m => (
                <p key={m.id}>{m.menuName}</p>
            ))) : (menu.error.errorMessage)}</h1> */}
        </>
    );
};

export default Home;
