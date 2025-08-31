import { useChat } from "../store/useChat";
import Sidebar from "../components/sideBar";
import NoChatSelected from "../components/chatNotSelected";
import ChatBox from "../components/chatBox";

const Home = () => {
  const { selectedUser } = useChat();

  return (
    <div className="h-screen bg-base-200">
      <div className="fles items-center justify-center pt-20 px-4">
        <div className="bg-base-200 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar/>
            {!selectedUser ? <NoChatSelected/> : <ChatBox/>}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;