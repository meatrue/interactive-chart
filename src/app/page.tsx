"use client";

import React from 'react';
import clsx from 'clsx';

import { Select, SelectOption } from '@/components/ui';

const ChartContainer: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  return (
    <div className="
      grid grid-cols-[3.8rem_1fr] grid-rows-[1fr_1.87rem] gap-x-[2rem] gap-y-[1rem]
      w-full h-[25rem] p-[2.5rem] bg-chart-main rounded-[1.7rem]
    ">
      {children}
    </div>
  );
};

interface AxisProps {
  direction: 'x' | 'y',
  points: number[],
}

const Axis: React.FC<AxisProps> = ({ direction, points }) => {
  return (
    <div className={clsx(
      'flex text-[1.25rem]',
      {'flex-row': direction === 'x'},
      {'flex-col-reverse gap-[1.25rem]': direction === 'y'},
    )}>
      {points.map((point, index) => (
        <span key={index}>{point}</span>
      ))}
    </div>
  );
};

const ChartLabel: React.FC<{ children: number }> = ({ children }) => {
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
  maxValue: number;
}

const ChartBar: React.FC<ChartBarProps> = ({ value, maxValue }) => {
  return (
    <div className="group relative group-hover:opacity-100">
      <ChartLabel>{value}</ChartLabel>
      <div
        className="w-[1rem] bg-[#000aff] rounded transition-shadow hover:shadow-[0_0_6px_4px_rgba(0,10,255,0.2)]"
        style={{height: `${(value / maxValue) * 17.5}rem`}}
      />
    </div>
  );
};

interface ChartProps {
  data: {};
}

const Chart: React.FC<ChartProps> = () => {
  return (
    <div className='flex items-end justify-between'>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value, index) => (
        <ChartBar
          key={index}
          value={10000}
          maxValue={10000}
        />
      ))}
    </div>
  );
};


const selectOptions = [
  {
    title: 'За последний год',
    value: 'year',
  },
  {
    title: 'За последние 6 месяцев',
    value: 'six_months',
  },
  {
    title: 'За последний месяц',
    value: 'month',
  }
];

export default function Home() {
  const [selectedOption, setSelectedOption] = React.useState<SelectOption>(
    selectOptions[selectOptions.length - 1]
  );

  return (
    <main className="grow flex flex-col justify-center items-center">
      <div className="flex flex-col gap-[1.75rem] w-[62.2rem] h-[29.75rem]">
        <div className="flex justify-end">
          <Select
            options={selectOptions}
            selectedOption={selectedOption}
            onOptionSelect={setSelectedOption}
            className="min-w-[23.75rem]"
          />
        </div>
          <ChartContainer>
            <Axis
              direction='y'
              points={[0, 500, 1000, 2000, 5000, 10000]}
            />
            <Chart data={{}} />
            <div className="col-start-2 col-span-1">
              X
            </div>
        </ChartContainer>
      </div>
    </main>
  )
}
