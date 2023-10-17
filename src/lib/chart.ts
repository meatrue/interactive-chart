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

const complementToInteger = (value: number, degree: number): number => (
  Math.floor(value * Math.pow(10, degree))
);

const getDigitsAfterComma = (value: number): number => {
  let digits = 0;

  while (complementToInteger(value, digits) === 0) {
    digits++;
  }

  return digits;
};

const getRoundedValue = (value: number): number => {
  let roundedValue = 0;

  if (value >= 1) {
    const degree = value.toString().length - 1;
    const firstDigit = Number(value.toString()[0]);
    roundedValue = firstDigit * Math.pow(10, degree);
    return roundedValue;
  }

  const degree = getDigitsAfterComma(value);
  
  return complementToInteger(value, degree) / Math.pow(10, degree);
};

const getIntermediatePoints = (maxValue: number, pointsCount: number): number[] => {
  const points: number[] = [];

  if (pointsCount <= 0) return points;

  for (let i = 0; i < pointsCount; i++) {
    const prevValue = !points.length ? maxValue : points[0];
    const currentValue = getRoundedValue(prevValue / 2);

    points.unshift(currentValue);
  }

  return points;
};

export const getAxisYPoints = (maxValue: number, pointsCount: number): number[] => {
  const MIN_POINT = 0;
  let maxPoint = 0;

  if (maxValue >= 1) {
    const degree = maxValue.toString().length - 1;
    const firstDigit = Math.min(Number(maxValue.toString()[0]) * 2, 10);

    maxPoint = firstDigit * Math.pow(10, degree);
  } else {
    const degree = getDigitsAfterComma(maxValue);
    
    maxPoint = (complementToInteger(maxValue, degree) + 2) / Math.pow(10, degree);
  }

  const intermediatePoints = getIntermediatePoints(maxPoint, pointsCount - 2);

  return [MIN_POINT, ...intermediatePoints, maxPoint];
};