import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { userAuthSore } from "../store/userAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = userAuthSore();

  return (
    <div className="p-4 border-b border-base-300 relative">
      {/* Close Button */}
      <button 
        onClick={() => setSelectedUser(null)} 
        className="absolute right-4 top-4 text-base-content/70 hover:text-red-500"
      >
        <X />
      </button>

      {/* Left section with avatar and user info */}
      <div className="flex items-center gap-4 pr-10"> {/* <-- pr-10 prevents overlap with ❌ */}
        <div className="avatar">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium">{selectedUser.fullName}</h3>
          <p className="text-sm text-base-content/70">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
