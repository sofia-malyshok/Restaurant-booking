import { useState } from "react";
import "./Restaurant.css";

const Restaurant = ({ availableTables, selectedTable, setSelectedTable }) => {
  const [hoveredTable, setHoveredTable] = useState(null);

  const getTableColor = (tableId) => {
    if (!availableTables.includes(tableId)) {
      return "#1C1C1C";
    } else if (tableId === selectedTable) {
      return "#36FF36";
    } else if (tableId === hoveredTable) {
      return "#FFCE69";
    } else {
      return "#FFAB00";
    }
  };

  const selectTable = (tableId) =>
    setSelectedTable(
      selectedTable === tableId || !availableTables.includes(tableId)
        ? 0
        : tableId
    );
  return (
    <>
      <h3 className="mt-3">Choose your table</h3>
      <div className="restaurant-preview rounded shadow-lg mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="632"
          version="1.1"
          viewBox="0 0 270.933 167.217"
          xmlSpace="preserve"
        >
          <defs>
            <image
              preserveAspectRatio="xMidYMid slice"
              width="866.104"
              height="718"
              xlinkHref="../../assets/scheme.jpg"
            />
          </defs>
          <g
            fill="#85d000"
            fillOpacity="1"
            fillRule="evenodd"
            stroke="none"
            strokeDasharray="none"
            strokeWidth="0.265"
          >
            <path
              fill={getTableColor(1)}
              onMouseEnter={() => setHoveredTable(1)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(1)}
              d="M91.687 125.363l16.455 13.387 11.504-7.739-16.385-12.202z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(2)}
              onMouseEnter={() => setHoveredTable(2)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(2)}
              d="M108.42 139.03l18.199 14.432 11.643-8.367-18.267-13.944z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(3)}
              onMouseEnter={() => setHoveredTable(3)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(3)}
              d="M126.897 153.671l11.575-8.506 20.359 15.34-8.227 6.763-6.973-.14z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(4)}
              onMouseEnter={() => setHoveredTable(4)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(4)}
              d="M87.364 163.712l14.433-9.831-11.156-9.553-.488-.348-14.084 9.134z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(5)}
              onMouseEnter={() => setHoveredTable(5)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(5)}
              d="M47.97 162.805l14.154-8.506-10.406-10.09-13.805 8.086z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(6)}
              onMouseEnter={() => setHoveredTable(6)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(6)}
              d="M60.05 138.391l14.248-8.48-9.663-8.332-14.1 7.494z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(7)}
              onMouseEnter={() => setHoveredTable(7)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(7)}
              d="M24.552 138.046l13.46-7.297-8.579-8.48-13.311 6.755z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(8)}
              onMouseEnter={() => setHoveredTable(8)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(8)}
              d="M35.547 115.762l13.755-7.346-7.888-6.804-13.755 6.705z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(9)}
              onMouseEnter={() => setHoveredTable(9)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(9)}
              d="M6.064 115.022l10.502-5.226-7.297-7.395L0 106.838l.099 5.67 1.134 1.134z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(10)}
              onMouseEnter={() => setHoveredTable(10)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(10)}
              d="M171.522 124.636l20.165 13.262 9.466-7.642-20.362-12.424z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(11)}
              onMouseEnter={() => setHoveredTable(11)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(11)}
              d="M217.67 116.945l7.888-6.41-19.77-10.895-7.938 5.965z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(12)}
              onMouseEnter={() => setHoveredTable(12)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(12)}
              d="M231.523 92.737l23.912 11.685 6.064-5.768-23.123-11.241z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(13)}
              onMouseEnter={() => setHoveredTable(13)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(13)}
              d="M194.793 74.496l20.165 9.86 6.902-4.832-19.82-9.613z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(14)}
              onMouseEnter={() => setHoveredTable(14)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(14)}
              d="M170.191 98.309l14.347-9.516-9.86-5.275-14.446 8.874z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(15)}
              onMouseEnter={() => setHoveredTable(15)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(15)}
              d="M143.223 103.09l10.107 6.312 9.12-6.36-9.81-6.065z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(16)}
              onMouseEnter={() => setHoveredTable(16)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(16)}
              d="M121.678 108.711l11.34-6.655-9.368-6.015-11.192 6.458z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(17)}
              onMouseEnter={() => setHoveredTable(17)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(17)}
              d="M122.96 90.272l9.663-5.374-8.48-5.226-9.86 5.128z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(18)}
              onMouseEnter={() => setHoveredTable(18)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(18)}
              d="M139.92 80.905l14.642-8.332-8.627-4.536-14.298 7.84z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(19)}
              onMouseEnter={() => setHoveredTable(19)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(19)}
              d="M163.437 73.362l9.22 4.93 8.529-5.325-8.973-4.831z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(20)}
              onMouseEnter={() => setHoveredTable(20)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(20)}
              d="M159.295 49.45l15.777 7.642 1.972-1.183.395-5.72-10.255-4.831z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(21)}
              onMouseEnter={() => setHoveredTable(21)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(21)}
              d="M61.915 78.474l5.578 4.079 9.343-4.532-5.474-4.183z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(22)}
              onMouseEnter={() => setHoveredTable(22)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(22)}
              d="M76.766 77.777l10.005-4.741-5.682-3.521-9.587 4.323z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(23)}
              onMouseEnter={() => setHoveredTable(23)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(23)}
              d="M86.841 72.966l9.552-4.532-5.02-3.521-10.145 4.671z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(24)}
              onMouseEnter={() => setHoveredTable(24)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(24)}
              d="M96.672 68.364l9.273-4.462-4.81-3.59-9.413 4.461z"
              opacity="0.55"
            ></path>
            <path
              fill={getTableColor(25)}
              onMouseEnter={() => setHoveredTable(25)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => selectTable(25)}
              d="M101.762 60.207l4.706 3.486 8.507-3.765-5.787-3.173z"
              opacity="0.55"
            ></path>
          </g>
        </svg>
      </div>
    </>
  );
};

export default Restaurant;
