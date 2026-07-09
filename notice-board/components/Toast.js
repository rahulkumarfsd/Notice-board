import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3200,
        style: {
          borderRadius: "0.75rem",
          background: "#111a11",
          color: "#d6f0d6",
          fontSize: "0.875rem",
          padding: "0.75rem 1rem",
          border: "1px solid rgba(0,255,65,0.2)",
        },
        success: { iconTheme: { primary: "#00ff41", secondary: "#0a0f0a" } },
        error: { iconTheme: { primary: "#ff4444", secondary: "#0a0f0a" } },
      }}
    />
  );
}
