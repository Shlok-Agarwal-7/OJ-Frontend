const RangeSelector = ({
  setRange,
  fetchTopUsers,
  fetchLocalRanks,
  localRank,
  range,
}) => {
  const handleRangeChange = (e) => {
    const val = e.target.value;
    if (val >= 1 && val <= 50) {
      setRange(val);
    }
  };

  return (
    <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        <label htmlFor="rangeInput" className="text-md font-bold">
          Range (1-50):
        </label>
        <input
          id="rangeInput"
          type="number"
          min={1}
          max={50}
          value={range}
          onChange={(e) => {
            handleRangeChange(e);
          }}
          className="bg-[#3a3b3c] text-white px-3 py-1 rounded w-20 text-center outline-none"
        />
      </div>
      <div className="flex gap-2">
        {!localRank ? (
          <button
            onClick={fetchLocalRanks}
            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white"
          >
            Show My Neighbours
          </button>
        ) : (
          <button
            onClick={fetchTopUsers}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white"
          >
            Back to Global Top
          </button>
        )}
      </div>
    </div>
  );
};

export default RangeSelector;
