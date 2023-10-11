import React from 'react';

import { getChartBarHeight } from "@/lib";

const ChartBarLabel: React.FC<{ children: number }> = ({ children }) => {
  return (
    <span className="
      absolute top-[-0.2rem] translate-y-[-100%] right-[50%] translate-x-1/2
      py-1 px-2 bg-[#65ff8e] rounded-md opacity-0
      group-hover:opacity-100 transition-opacity duration-300
    ">
      {children}
    </span>
  );
};

interface ChartBarProps {
  value: number;
  axisYPoints: number[];
}

export const ChartBar: React.FC<ChartBarProps> = ({ value, axisYPoints }) => {
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const barHeight = getChartBarHeight(value, axisYPoints);
    setHeight(barHeight);
  }, [value, axisYPoints]);

  return (
    <div className="grow relative flex justify-center items-end">
      <div
        className="
          relative w-[1rem] bg-[#000aff] rounded transition-all duration-300
          hover:shadow-[0_0_6px_4px_rgba(0,10,255,0.2)] group group-hover:opacity-100
        "
        style={{height: `${height}%`}}
      >
        <ChartBarLabel>{value}</ChartBarLabel>
      </div>
    </div>
  );
};