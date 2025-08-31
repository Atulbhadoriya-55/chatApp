import { useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";

import ChatHeader from "./chatHeader";
import MessageInput from "./messageInput";
import MessageSkeleton from "./skeleton/messageSkeleton";
import { useAuth } from "../store/useAuth";
import { useChat } from "../store/useChat";
import { formatMessageTime } from "../lib/utils";

const ChatBox = () => {
  const {
    messages,
    getMessages,
    loadingMessages,
    selectedUser,
    sub2Messages,
    unsubFromMessages,
    deleteMessage,
  } = useChat();

  const { authUser } = useAuth();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      sub2Messages();
    }
    return () => unsubFromMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-base-content/70">👈 Select a chat to start messaging</p>
      </div>
    );
  }

  if (loadingMessages) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-sm text-base-content/50 mt-10">
            No messages yet. Say hi 👋
          </p>
        ) : (
          messages.map((message, index) => {
            const isMe = message.senderId === authUser._id;

            return (
              <div
                key={message._id || index}
                className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                ref={index === messages.length - 1 ? messageEndRef : null}
              >
                {/* Avatar */}
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border overflow-hidden">
                    <img
                      src={
                        isMe
                          ? authUser.profileImage || "/avatar.png"
                          : selectedUser?.profileImage || "/avatar.png"
                      }
                      alt="profile"
                    />
                  </div>
                </div>

                {/* Header (time) */}
                <div className="chat-header mb-1 text-xs opacity-50">
                  {formatMessageTime(message.createdAt)}
                </div>

                {/* Bubble */}
                <div
                  className={`chat-bubble relative group ${
                    isMe ? "bg-primary text-white" : "bg-base-200"
                  } flex flex-col`}>
                  {/* Image attachment */}
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"/>
                  )}

                  {/* Text or "deleted" */}
                  {message.isDeleted ? (
                    <p className="italic opacity-70">Message deleted</p>
                  ) : (
                    message.text && <p>{message.text}</p>
                  )}

                  {/* Delete button (✅ sender or receiver can delete) */}
                  {!message.isDeleted && (
                    <button
                      onClick={() => deleteMessage(message._id)}
                      className={`absolute -top-5 ${
                      isMe ? "right-0" : "left-0"
                      } opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700"/>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatBox;
