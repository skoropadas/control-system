import { FlCompareFunction } from "../types/compare-fn";

/** Uses to implement host with compare function */
export abstract class FlCompareHost<T> {
	/** Uses to compare two values (usefull to compare two objects, for example by id) */
	public abstract compareFn: FlCompareFunction<T>;
}
