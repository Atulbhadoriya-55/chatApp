import cloudinary from "../lib/cloudinary.js";
import Message from "../model/messagemodel.js";
import User from "../model/usermodel.js";
import { getRSocketId , io } from "../lib/socket.js"
 
export const getUsersForSidebar = async (req , res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id : { $ne : loggedInUserId }}).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch (error) {
        console.error("Error in getUsersForSidebar : " , error.message);
        res.status(500).json({ error : "Internal server error" })
    }
};

export const getMessages = async (req ,res) => {
    try {
        const { id : user2ChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [{senderId:myId , receiverId:user2ChatId},
                  {senderId:user2ChatId , receiverId:myId}]
            })
        res.status(200).json(messages)
        }
    catch (error) {
        console.log("Error in getMessages controller : " , error.message);
        res.status(500).json({ error: "internal server error" });        
    }
};

export const sendMessage = async (req ,res) => {
    try {
        const { text , image } = req.body;
        const { id : receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
            })

        await newMessage.save();

        const RSocketId = getRSocketId(receiverId)
        if(RSocketId) {
            io.to(RSocketId).emit("newMessage", newMessage)
        }
        res.status(201).json(newMessage)
        } 
        catch (error) {
            console.log("Error in sendMessage controller: " , error.message);
            res.status(500).json({ error: "Internal server error"});
        }
};

// ✅ Delete message for both sender and receiver
export const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const userId = req.user._id;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Only sender OR receiver can delete
    if (
      message.senderId.toString() !== userId.toString() &&
      message.receiverId.toString() !== userId.toString()
    ) {
      return res.status(403).json({ error: "Not authorized to delete this message" });
    }

    await Message.findByIdAndDelete(messageId);

    // ✅ Emit delete event to both users
    const senderSocket = getRSocketId(message.senderId.toString());
    const receiverSocket = getRSocketId(message.receiverId.toString());

    if (senderSocket) {
      io.to(senderSocket).emit("messageDeleted", { messageId });
    }
    if (receiverSocket) {
      io.to(receiverSocket).emit("messageDeleted", { messageId });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log("Error in deleteMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

