import { useEffect, useState } from "react";
import Apis, { endpoints } from "../../configs/Apis";
import Spinner from "../../layout/Spinner";
import MenuSideBar from "../MenuSideBar/MenuSideBar";

const Home = () => {
    const [menu, setMenu] = useState(null);

    useEffect(() => {
        const loadMenu = async () => {
                let data = await Apis.get(endpoints['menu']);
                setMenu(data);
            };
            loadMenu();
        }, []);

    if (menu===null) return <Spinner />;

    return (
        <>
            <div className="flex justify-between gap-10">
                <div className="basis-1/4">
                    <MenuSideBar menu={menu} />
                </div>
                <div className="flex-1">12</div>
                <div className="basis-1/4">12</div>
            </div>
            

        </>
    );
};

export default Home;
