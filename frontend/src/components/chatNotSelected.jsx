import { MessageSquare } from "lucide-react";

export default function NoChatSelected() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-10 bg-base-100/50">
      <div className="max-w-md text-center space-y-4">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-base-content">Welcome to Chitchat</h2>
        <p className="text-base-content/60">
          Select a friend from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
}
