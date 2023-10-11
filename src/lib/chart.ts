import { ChartPeriod } from "@/types";

export const isChartPeriod = (value: string): value is ChartPeriod => {
  return value === 'year' || value === 'half_year' || value === 'month';
};

const getAxisYSectionHeightInPercents = (axisYPoints: number[]): number =>
  100 / (axisYPoints.length - 1);

type AxisYNearestPoints = {
  currentPointNumber: number | null,
  nearestLowerPointNumber: number | null,
  nearestHigherPointNumber: number | null,
};

const findNearestAxisYPoints = (value: number, axisYPoints: number[]): AxisYNearestPoints => {
  let currentPointNumber: number | null = null;
  let nearestLowerPointNumber: number | null = null;
  let nearestHigherPointNumber: number | null = null;
  
  for (let i = 0; i < axisYPoints.length; i++) {
    if (value === axisYPoints[i]) {
      currentPointNumber = i;
      break;
    } 

    if (value > axisYPoints[i]) {
      nearestLowerPointNumber = i;
      continue;
    }

    if (value < axisYPoints[i] && nearestHigherPointNumber === null) {
      nearestHigherPointNumber = i;
    }
  }

  return {
    currentPointNumber,
    nearestLowerPointNumber,
    nearestHigherPointNumber
  };
};

const calculateBarHeightByPoints = (
  value: number,
  sectionHeight: number,
  nearestPoints: AxisYNearestPoints,
  axisYPoints: number[]
): number => {
  const {
    currentPointNumber,
    nearestLowerPointNumber,
    nearestHigherPointNumber,
  } = nearestPoints;

  let barHeight = 0;
  
  if (currentPointNumber !== null) {
    barHeight = currentPointNumber * sectionHeight;
  } else if (nearestLowerPointNumber === axisYPoints.length - 1) {
    barHeight = nearestLowerPointNumber * sectionHeight;
  } else if (nearestLowerPointNumber !== null && nearestHigherPointNumber !== null) {
    const nearestLowerValue = axisYPoints[nearestLowerPointNumber];
    const nearestHigherValue = axisYPoints[nearestHigherPointNumber];
    barHeight = nearestLowerPointNumber * sectionHeight + (value - nearestLowerValue)
      * sectionHeight / (nearestHigherValue - nearestLowerValue);
  }

  return barHeight;
};

export const getChartBarHeight = ( value: number, axisYPoints: number[]): number => {
  const sectionHeight = getAxisYSectionHeightInPercents(axisYPoints);
  const nearestPoints = findNearestAxisYPoints(value, axisYPoints);
  const barHeight = calculateBarHeightByPoints(
    value,
    sectionHeight,
    nearestPoints,
    axisYPoints
  );
  
  return barHeight;
};