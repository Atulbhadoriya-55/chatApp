import { useEffect, useState } from "react";

const themes = [
  "light", "dark", /* "cupcake", "bumblebee", "emerald",
  "corporate", "synthwave", "retro", "cyberpunk", "valentine",
  "halloween", "garden", "forest", "aqua", "lofi",
  "pastel", "fantasy", "wireframe", "black", "luxury", "dracula"  */
];

export default function Settings() {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // ✅ Apply theme to <html> when it changes
  useEffect(() => {
    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);
      localStorage.setItem("theme", currentTheme);
    }
  }, [currentTheme]);

  return (
    <div className="min-h-screen p-8 bg-base-200">
      <h1 className="text-4xl font-bold mb-8 text-center mt-10">🎨 Theme Settings</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {themes.map((theme) => (
          <div
            key={theme}
            className={`cursor-pointer rounded-2xl shadow-xl overflow-hidden border-2 
                        transition-all duration-300 ${
                currentTheme === theme
                ? "border-primary scale-105"
                : "border-transparent hover:scale-105"
                }`} onClick={() => setCurrentTheme(theme)}>

            {/* Theme Preview */}
            <div
              data-theme={theme}
              className="p-6 bg-base-100 text-base-content">
              <h2 className="font-bold capitalize">{theme}</h2>
              <p className="text-sm opacity-60">Click to apply</p>
              <button className="btn btn-primary btn-sm mt-4">Button</button>
              <button className="btn btn-secondary btn-sm mt-2">Alt Btn</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-lg">
          Current theme:{" "}
          <span className="font-bold text-primary">{currentTheme}</span>
        </p>
      </div>
    </div>
  );
}
