import { useState } from "react";

const CodeDialog = ({ code }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        View Code
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="card-color text-black p-6 rounded-lg max-w-2xl w-full shadow-lg relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4 primary-text">
              Submitted Code
            </h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[400px]">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      )}
    </>
  );
};

export default CodeDialog;
