import { FlCompareFunction } from "../types/compare-fn";

export const FL_DEFAULT_COMPARE: FlCompareFunction = (value1: unknown, value2: unknown) => value1 === value2;
