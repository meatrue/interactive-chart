import React from 'react';
import clsx from 'clsx';

import { ChartPeriod } from '@/types';
import { chartGap } from './const';
import { ChartBar } from './chart-bar';
import { AxisX, AxisY } from './axes';

const ChartContainer: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  return (
    <div className="
      grid grid-cols-[3.8rem_1fr] grid-rows-[1fr_1.87rem] gap-x-[2rem] gap-y-[1rem]
      w-full h-[25rem] p-[2.5rem] text-[1.25rem] bg-chart-main rounded-[1.7rem]
    ">
      {children}
    </div>
  );
};

interface ChartBarsContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ChartBarsContainer: React.FC<ChartBarsContainerProps> = ({ children, className }) => {
  return (
    <div className={clsx('flex',className)}>
      {children}
    </div>
  );
};

interface ChartProps {
  values: number[];
  axisYPoints: number[];
  axisXPoints: string[];
  period: ChartPeriod;
}

export const Chart: React.FC<ChartProps> = ({
  values,
  axisYPoints,
  axisXPoints,
  period
}) => {
  return (
    <ChartContainer>
      <AxisY points={axisYPoints} />
      
      <ChartBarsContainer className={chartGap[period].bar}>
        {values.map((value, index) => (
          <ChartBar
            key={index}
            value={value}
            axisYPoints={axisYPoints}
          />
        ))}
      </ChartBarsContainer>

      <AxisX points={axisXPoints} variant={period} />
    </ChartContainer>
  );
}; 