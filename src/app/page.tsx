"use client";

import React from 'react';

import { Select, SelectOption, Chart } from '@/components';
import { ChartPeriod } from '@/types';
import { getAxisYPoints, isChartPeriod } from '@/lib';
import { chartApi } from '@/api';

type ChartSelectOption = {
  title: string,
  value: 'year' | 'half_year' | 'month',
};

const chartPeriodOptions: ChartSelectOption[] = [
  {
    title: 'За последний год',
    value: 'year',
  },
  {
    title: 'За последние 6 месяцев',
    value: 'half_year',
  },
  {
    title: 'За последний месяц',
    value: 'month',
  }
];

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="grow flex flex-col justify-center items-center">
      <div className="flex flex-col gap-[1.75rem] w-[62.2rem] h-[29.75rem] overflow-hidden">
        {children}
      </div>
    </main>
  );
};

export default function Home() {
  const [selectedChartPeriod, setSelectedChartPeriod] = React.useState<SelectOption>(
    chartPeriodOptions[chartPeriodOptions.length - 1]
  );
  const [selectedChartData, setSelectedChartData] = React.useState<
    {[key: string]: number} | null
  >(null);

  const selectedPeriod = selectedChartPeriod.value;

  React.useEffect(() => {
    if (!isChartPeriod(selectedPeriod)) return;

    chartApi.getData(selectedPeriod)
      .then((result) => setSelectedChartData(result.data));
  }, [selectedPeriod]);

  const chartValues = selectedChartData
    ? Object.values(selectedChartData)
    : [];

  const axisXPoints: string[] = selectedChartData
    ? Object.keys(selectedChartData)
    : [];

  const axisYpoints = chartValues.length
    ? getAxisYPoints(Math.max(...chartValues), 6)
    : [];

  const handleSelectOption = (option: SelectOption): void => {
    setSelectedChartPeriod(option);
  };

  return (
    <PageLayout>
      <div className="flex justify-end">
        <Select
          options={chartPeriodOptions}
          selectedOption={selectedChartPeriod}
          onOptionSelect={handleSelectOption}
          className="min-w-[23.75rem]"
        />
      </div>

      <Chart
        values={chartValues}
        axisYPoints={axisYpoints}
        axisXPoints={axisXPoints}
        period={selectedPeriod as ChartPeriod}
      />
    </PageLayout>
  )
}
