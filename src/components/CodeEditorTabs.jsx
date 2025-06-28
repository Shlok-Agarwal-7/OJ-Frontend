
const renderTabContent = ({
  activeTab,
  output,
  setInput,
  loading,
  input,
  verdict,
}) => {
  switch (activeTab) {
    case "input":
      return (
        <textarea
          className="bg-[#3a3b3c] text-sm text-gray-200 p-3 rounded h-28 w-full resize-none outline-none font-mono"
          placeholder="// Input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      );
    case "output":
      return (
        <textarea
          className="bg-[#3a3b3c] text-sm text-gray-200 p-3 rounded h-28 w-full resize-none outline-none font-mono"
          placeholder={loading ? "loading.." : "//output"}
          value={output}
          readOnly
        />
      );
    case "verdict":
      return (
        <textarea
          className="bg-[#3a3b3c] text-sm text-gray-200 p-3 rounded h-28 w-full font-mono overflow-y-auto"
          placeholder={loading ? "loading.." : "//verdict"}
          value={verdict}
          readOnly
        />
      );
    default:
      return null;
  }
};

export default renderTabContent;
