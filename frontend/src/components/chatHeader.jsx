import { X } from "lucide-react";
import { useAuth } from "../store/useAuth";
import { useChat } from "../store/useChat";

export default function ChatHeader() {
  const { selectedUser , setSelectedUser } = useChat();
  const { onlineUsers } = useAuth();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <header className="p-3 border-b border-base-300 flex items-center justify-between">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={selectedUser.profileImage || "/avatar.png"}
            alt={selectedUser.userName}
            className="size-10 rounded-full object-cover"
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100 animate-pulse" />
          )}
        </div>
        <div>
          <h3 className="font-medium">{selectedUser.userName}</h3>
          <p className="text-sm text-base-content/70">{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="p-1 rounded-full hover:bg-base-200 transition"
      >
        <X className="size-5" />
      </button>
    </header>
  );
}
