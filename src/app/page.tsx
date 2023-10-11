"use client";

import React from 'react';

import { Select, SelectOption } from '@/components/ui';
import { ChartPeriod } from '@/types';
import { Chart } from '@/components/chart';
import { isChartPeriod } from '@/lib';
import { chartApi } from '@/api';

type ChartSelectOption = {
  title: string,
  value: 'year' | 'half_year' | 'month',
};

const selectOptions: ChartSelectOption[] = [
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

export default function Home() {
  const [selectedOption, setSelectedOption] = React.useState<SelectOption>(
    selectOptions[selectOptions.length - 1]
  );
  const [selectedChartData, setSelectedChartData] = React.useState<
    {[key: string]: number} | null
  >(null);

  const selectedValue = selectedOption.value;

  React.useEffect(() => {
    if (!isChartPeriod(selectedValue)) return;

    chartApi.getData(selectedValue)
      .then((result) => setSelectedChartData(result.data));
  }, [selectedValue]);

  const chartValues: number[] = selectedChartData
    ? Object.values(selectedChartData)
    : [];

  const axisXPoints: string[] = selectedChartData
    ? Object.keys(selectedChartData)
    : [];

  const handleSelectOption = (option: SelectOption): void => {
    setSelectedOption(option);
  };

  return (
    <main className="grow flex flex-col justify-center items-center">
      <div className="flex flex-col gap-[1.75rem] w-[62.2rem] h-[29.75rem] overflow-hidden">
        <div className="flex justify-end">
          <Select
            options={selectOptions}
            selectedOption={selectedOption}
            onOptionSelect={handleSelectOption}
            className="min-w-[23.75rem]"
          />
        </div>

        <Chart
          values={chartValues}
          axisYPoints={[0, 500, 1000, 2000, 5000, 10000]}
          axisXPoints={axisXPoints}
          period={selectedValue as ChartPeriod}
        />
      </div>
    </main>
  )
}
