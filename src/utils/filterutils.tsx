/**
 * Check if the object follows NearFilterValue interface
 */
export function isNearFilterValue(obj: any): obj is any {
  return (
    typeof obj === "object" && "radius" in obj && "lat" in obj && "long" in obj
  );
}

/**
 * Get a filter's display value or label in string format
 */
export function getFilterDisplayValue(filter: any): string {
  const value = filter.value;
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value.toString();
  }
  if (isNearFilterValue(value)) {
    return `within ${value.radius}m radius`;
  }
  throw Error("unrecognized filter value type");
}

/**
 * Check if the object follows CombinedFilter interface
 */
export function isCombinedFilter(obj: any): obj is any {
  return "filters" in obj && "combinator" in obj;
}

/**
 * Flatten the given filter, such as if the given filter is of type CombinedFilter
 * with possible nested layers of Filter objects, into a 1-dimension array of Filter objects
 */
export function flattenFilters(filter: any | null | undefined): Array<any> {
  let filters: Array<any> = [];
  if (!filter) {
    return filters;
  }
  if (isCombinedFilter(filter)) {
    filter.filters.forEach(
      (fltr: any) => (filters = filters.concat(flattenFilters(fltr)))
    );
  } else {
    filters.push(filter);
  }
  return filters;
}

/**
 * Returns true if the two given filters are the same
 */
export function isDuplicateFilter(thisFilter: any, otherFilter: any): boolean {
  if (thisFilter.fieldId !== otherFilter.fieldId) {
    return false;
  }
  if (thisFilter.matcher !== otherFilter.matcher) {
    return false;
  }
  if (thisFilter.value !== otherFilter.value) {
    return false;
  }
  return true;
}
