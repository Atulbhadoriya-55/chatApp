import { useState } from "react";
import { useAuth } from "../store/useAuth";
import { Camera, Mail, User } from "lucide-react";

const Profile = () => {
  const { authUser, updateProfile, isUpdateProfile } = useAuth();
  const [selectImg, setSelectImg] = useState(null);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectImg(base64Image);
      await updateProfile({ profileImage: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br 
                      from-base-200 via-base-300 to-base-200 px-4 py-10">
      <div className="w-full max-w-lg bg-base-100 dark:bg-neutral-800 backdrop-blur-lg
                  rounded-3xl shadow-xl border-2 border-base-300 dark:border-neutral-600 
                md:p-5 transition-all duration-300 hover:shadow-2xl hover:border-primary">
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-primary">
          My Profile
        </h1>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-5">
          <div className="relative group w-36 h-36 md:w-35 md:h-35 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <img
              src={selectImg || authUser?.profileImage || "/avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"/>

            <label
              htmlFor="fileInput"
              className={`absolute bottom-3 right-3 bg-primary text-primary-content 
                        p-3 rounded-full cursor-pointer shadow-lg transform scale-0 
                      group-hover:scale-100 transition-transform duration-300 
                    ${isUpdateProfile ? "animate-pulse pointer-events-none" : ""}`}>
              <Camera className="w-5 h-5" />
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImage}
                disabled={isUpdateProfile}
                className="hidden"
              />
            </label>
          </div>
          {isUpdateProfile && (
            <p className="text-sm text-base-content/70 mt-3 animate-pulse">
              Updating profile...
            </p>
          )}
          <p className="p-4">Update your profile image</p>
        </div>

        {/* User Info */}
        <div className="space-y-3">
          <InfoCard
            icon={<User className="w-5 h-5 text-primary" />}
            label="Username"
            value={authUser?.userName || "Not set"}
            borderColor="border-primary"/>
          <InfoCard

            icon={<Mail className="w-5 h-5 text-secondary" />}
            label="Email"
            value={authUser?.email || "Not set"}
            borderColor="border-secondary"/>
        </div>
      </div>
    </div>
  );
};

// Reusable Info Card
const InfoCard = ({ icon, label, value, borderColor }) => (
  <div
    className={`bg-base-100 dark:bg-neutral-700 rounded-xl p-4 shadow-md 
              border ${borderColor} hover:border-accent hover:shadow-lg 
            transition-all duration-300`}>
    <div className="flex flex-wrap items-center gap-3 text-base-content">
      {icon}
      <span className="font-medium">{label}:</span>
      <span className="font-bold break-all">{value}</span>
    </div>
  </div>
);

export default Profile;