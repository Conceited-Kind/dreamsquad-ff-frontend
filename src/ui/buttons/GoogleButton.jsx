// src/features/auth/components/GoogleButton.jsx
import PrimaryButton from "@/ui/buttons/PrimaryButton";

export default function GoogleButton({ text = "Continue with Google", ...props }) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 bg-[#16b981] hover:bg-[#13a06d] text-white font-semibold py-2 px-4 rounded-lg shadow transition"
      {...props}
    >
      {/* Google SVG Icon */}
      <svg className="w-5 h-5" viewBox="0 0 48 48">
        <g>
          <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.1 33.3 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.5-7.6 21-17.5.1-.8.1-1.6.1-2.5 0-1.3-.1-2.6-.3-3.8z"/>
          <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.5 5.1 29.5 3 24 3c-7.2 0-13.5 4.1-17 10.2z"/>
          <path fill="#FBBC05" d="M24 45c5.5 0 10.5-1.8 14.4-4.9l-6.7-5.5C29.6 36 24 36 24 36c-5.6 0-10.1-2.7-12.7-6.7l-7 5.4C7.5 41.1 15.2 45 24 45z"/>
          <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.2 5.5-7.7 5.5-4.4 0-8-3.6-8-8s3.6-8 8-8c2.2 0 4.2.9 5.6 2.3l6.4-6.4C34.5 5.1 29.5 3 24 3c-7.2 0-13.5 4.1-17 10.2l7 5.1C15.5 16.1 19.4 13 24 13c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.5 5.1 29.5 3 24 3c-7.2 0-13.5 4.1-17 10.2z"/>
        </g>
      </svg>
      {text}
    </button>
  );
}