import MenuSideBar from "../../components/sideBar/SideBar";
import Post from "../../components/post/Post";
import ChatListUser from "../../components/chatListUser/ChatListUser";

const Home = () => {
    return (
      <>
        <div
          className="flex justify-between gap-16"
          style={{ background: "var(--bg-color)" }}
        >
          {/* MenuSideBar */}
          <div className="basis-1/4">
            <MenuSideBar />
          </div>
          {/* body */}
          <div className="flex-1 py-4">
            <Post />
          </div>
          {/* ChatListUser */}
          <div className="basis-1/4">
            <ChatListUser />
          </div>
        </div>
      </>
    );
};

export default Home;
