import clsx from "clsx";

import { chartGap, month } from "./const";
import { ChartPeriod } from "@/types";

export const AxisY: React.FC<{ points: number[] }> = ({ points }) => {
  return (
    <div className=
      "flex flex-col-reverse justify-between gap-[1.25rem] leading-[1]"
    >
      {points.map((point, index) => (
        <span key={index}>{point}</span>
      ))}
    </div>
  );
};

interface AxiosXPointProps {
  children: React.ReactNode;
  className?: string;
}

const AxiosXPoint: React.FC<AxiosXPointProps> = ({ children, className }) => {
  return (
    <div className="grow relative">
      <span className={clsx(
        'absolute top-0 right-[50%] translate-x-1/2',
        className
      )}>
        {children}
      </span>
    </div>
  )  
};

interface AxisXProps {
  variant: ChartPeriod;
  points: string[];
  className?: string;
}

export const AxisX: React.FC<AxisXProps> = ({ variant, points, className }) => {
  return (
    <div className={clsx(
      'col-start-2 col-span-1 flex',
      chartGap[variant].axis,
      className
    )}>
      {points.map((point, index) => {
        let pointValue: string = '';

        if (variant === 'year' || variant === 'half_year') {
          pointValue = month[point];
          return (
            <AxiosXPoint key={index}>
              {pointValue}
            </AxiosXPoint>
            );
        } 
        
        if ((variant === 'month') &&
            ((Number(point) === 1) || (Number(point) % 5 === 0))
        ) {
          pointValue = point.padStart(2, "0");
          return (
            <AxiosXPoint key={index} className=" w-[1.25rem] -translate-x-[50%]">
              {pointValue}
            </AxiosXPoint>
            );
        }
        
        return;
      })}
    </div>
  );
};