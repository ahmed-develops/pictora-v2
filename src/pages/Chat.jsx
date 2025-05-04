import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

function Chat() {
  return (
    <div className="flex">
      <div className="flex-1 ml-64">
        <div className="p-6 mt-6">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default Chat;
