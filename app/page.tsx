import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">HTML/CSS Chatbot Generator</h1>
      <p className="mb-6 text-gray-600">
        Generate MVP landing pages with a chatbot interface
      </p>
      <Link
        href="/dashboard"
        className="bg-black text-white px-6 py-2 rounded-xl shadow hover:bg-gray-900"
      >
        Go to Chatbot
      </Link>
    </main>
  );
}
