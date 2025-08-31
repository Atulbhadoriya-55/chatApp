import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosIns } from "../lib/axios";
import { useAuth } from "./useAuth";

export const useChat = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  loadingUsers: false,
  loadingMessages: false,

  // ✅ Fetch users
  getUsers: async () => {
    set({ loadingUsers: true });
    try {
      const res = await axiosIns.get("/messages/users");
      set({ users: res.data });
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ loadingUsers: false });
    }
  },

  // ✅ Fetch messages for a user
  getMessages: async (userId) => {
    set({ loadingMessages: true });
    try {
      const res = await axiosIns.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ loadingMessages: false });
    }
  },

  // ✅ Send message
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosIns.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (e) {
      toast.error(e.response.data.message || "Failed to send message");
    }
  },

  // ✅ Delete message
  deleteMessage: async (messageId) => {
    try {
      await axiosIns.delete(`/messages/${messageId}`);
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== messageId),
      }));
      toast.success("Message deleted");
    } catch (e) {
      toast.error(e.response.data.message || "Failed to delete message");
    }
  },

  // ✅ Subscribe to real-time events
  sub2Messages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuth.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      // Only add message if it's from the selected user
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });

    // ✅ Listen for deleted messages
    socket.on("messageDeleted", ({ messageId }) => {
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== messageId),
      }))
    })
  },

  // ✅ Unsubscribe from events
  unsubFromMessages: () => {
    const socket = useAuth.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
    socket.off("messageDeleted");
  },

  // ✅ Select a user
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));