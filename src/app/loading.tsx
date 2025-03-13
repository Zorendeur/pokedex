'use client'

export default function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <div className="loader"></div>
        <style jsx>{`
          .loader {
            border: 4px solid rgba(255, 255, 255, 0.3); // Gris clair
            border-top: 4px solid #3498db; // Bleu
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 2s linear infinite;
          }
  
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }