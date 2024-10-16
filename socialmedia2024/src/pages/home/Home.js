import { useEffect, useState } from "react";
import Apis, { endpoints } from "../../configs/Apis";
import Spinner from "../../components/base/Spinner";
import MenuSideBar from "../../components/sideBar/SideBar";
import Post from "../../components/post/Post";

const Home = () => {
    const [menu, setMenu] = useState(null);

    useEffect(() => {
        const loadMenu = async () => {
            let data = await Apis.get(endpoints['menu']);
            setMenu(data);
        };
        loadMenu();
    }, []);

    if (menu === null) return <Spinner />;

    return (
        <>
            <div className="flex justify-between gap-16" style={{ background: "var(--bg-color)" }}>
                {/* MenuSideBar */}
                <div className="basis-1/4">
                    <MenuSideBar menu={menu} />
                </div>
                {/* body */}
                <div className="flex-1 py-4">
                    <Post />
                </div>
                {/* message */}
                <div className="basis-1/4">12</div>
            </div>
          

        </>
    );
};

export default Home;
