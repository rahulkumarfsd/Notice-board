import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Component {...pageProps} />
      </main>
      <Toast />
    </div>
  );
}
