import { useRef, useState } from "react";
import { useChat } from "../store/useChat";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const fileRef = useRef(null);
  const { sendMessage } = useChat();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")){
      toast.error("Select an image")
      return
    }
    const reader = new FileReader();
    reader.onloadend = () => { setImage(reader.result) }
    reader.readAsDataURL(file)
  };

  const clearImage = () => {
    setImage(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;
    try {
      await sendMessage({ text: text.trim(), image : image });
      setText("");
      setImage(null);

      if (fileRef.current)
        fileRef.current.value
    } catch (e) {
      console.error("Send failed:", e);
    }
  };

  return (
    <div className="p-4 w-full">
      {image && (
        <div className="mb-3 relative w-20 h-20">
          <img 
            src={image} 
            alt="Preview" 
            className="w-full h-full object-cover rounded-lg border"/>

          <button 
            type="button" 
            onClick={clearImage} 
            className="absolute -top-1.5 -right-1.5 bg-base-300 rounded-full p-0.5">
            <X size={12}/>
          </button>
        </div>
      )}

      <form onSubmit={handleSend} className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 input input-bordered rounded-lg"
          value={text}
          onChange={(e) => setText(e.target.value)}/>

        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileRef} 
          onChange={handleImage} />

        <button 
          type="button" 
          onClick={() => fileRef.current.click()} 
          className={`btn btn-circle ${image ? "text-emerald-500" : "text-zinc-400"}`}>
          <Image size={20} />
        </button>

        <button 
          type="submit"
          className="btn btn-circle" 
          disabled={!text.trim() && !image}>
          <Send size={20} />
        </button>
        
      </form>
    </div>
  );
}
