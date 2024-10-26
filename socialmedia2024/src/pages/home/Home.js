
import MenuSideBar from "../../components/sideBar/SideBar";
import Post from "../../components/post/Post";

const Home = () => {
  

    return (
        <>
            <div className="flex justify-between gap-16" style={{ background: "var(--bg-color)" }}>
                {/* MenuSideBar */}
                <div className="basis-1/4">
                    <MenuSideBar />
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
