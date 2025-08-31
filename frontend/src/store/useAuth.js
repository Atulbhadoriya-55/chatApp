import { create } from "zustand";
import { axiosIns } from "../lib/axios.js";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuth = create((set, get) => ({
  authUser: null,
  isSignUp: false,
  isLogin: false,
  isUpdateProfile: false,
  isCheckAuth: true,
  onlineUsers: [],
  socket: null,

  // ✅ Check if user is authenticated
  checkAuth: async () => {
    try {
      const res = await axiosIns.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckAuth: false });
    }
  },

  // ✅ Sign Up
  signup: async (data) => {
    set({ isSignUp: true });
    try {
      const res = await axiosIns.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (e) {
      toast.error(e.response?.data?.message || "Sign Up failed");
    } finally {
      set({ isSignUp: false });
    }
  },

  // ✅ Login
  login: async (data) => {
    set({ isLogin: true });
    try {
      const res = await axiosIns.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login successful");
      get().connectSocket();
    } catch (e) {
      toast.error(e.response?.data?.message || "Login failed");
    } finally {
      set({ isLogin: false });
    }
  },

  // ✅ Logout
  logout: async () => {
    try {
      await axiosIns.post("/auth/logout");
      get().disconnectSocket();
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (e) {
      toast.error(e.response?.data?.message || "Logout failed");
    }
  },

  // ✅ Update profile
  updateProfile: async (data) => {
    set({ isUpdateProfile: true });
    try {
      const res = await axiosIns.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile successfully updated");
    } catch (e) {
      toast.error(e.response?.data?.message || "Profile update failed");
    } finally {
      set({ isUpdateProfile: false });
    }
  },

  // ✅ Connect socket.io (only when _id exists)
  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser) return;

    // Prevent duplicate connections
    if (socket && socket.connected) return;

    const newSocket = io(BASE_URL, {
      query: { userId: authUser._id },
      transports: ["websocket"], // 👈 avoid polling 404
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("✅ Connected to socket:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Disconnected from socket server");
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket: newSocket });
  },

  // ✅ Disconnect socket
  disconnectSocket: () => {
    const { socket } = get();
    if (socket && socket.connected) {
      socket.disconnect(); // 👈 correct method
      set({ socket: null });
    }
  },
}));
