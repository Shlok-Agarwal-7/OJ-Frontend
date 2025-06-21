const renderTabContent = ({ activeTab }) => {
  switch (activeTab) {
    case "input":
      return (
        <textarea
          className="bg-[#3a3b3c] text-sm text-gray-200 p-3 rounded h-28 w-full resize-none outline-none font-mono"
          placeholder="// Input"
        />
      );
    case "output":
      return (
        <textarea
          className="bg-[#3a3b3c] text-sm text-gray-200 p-3 rounded h-28 w-full resize-none outline-none font-mono"
          placeholder="// Output"
          readOnly
        />
      );
    case "verdict":
      return (
        <div className="bg-[#3a3b3c] text-sm text-gray-200 p-3 rounded h-28 w-full font-mono overflow-y-auto">
          ✅ Accepted
        </div>
      );
    default:
      return null;
  }
};

export default renderTabContent;
