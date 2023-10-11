import { axios } from ".";

import { ChartPeriod } from "@/types";

export const chartApi = {
  getData: (period: ChartPeriod) => axios.get(`/${period}`),
};
