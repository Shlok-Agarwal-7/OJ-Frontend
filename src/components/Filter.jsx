import {} from "react";

const Filter = ({ filter, toggleFilter, category, list }) => {
  return (
    <details className="dropdown">
      <summary className="btn btn-sm bg-[#3a3b3c] text-white border-none hover:bg-[#4a4b4c]">
        {category}
      </summary>
      <ul className="card-color menu dropdown-content bg-base-100 rounded-box z-10 w-40 p-2 shadow">
        {list.map((level) => (
          <li key={level}>
            <label>
              <input
                type="checkbox"
                checked={filter.has(level)}
                onChange={() => toggleFilter(level)}
                className="checkbox checckbox-sm"
              />
              <span>{level}</span>
            </label>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default Filter;
