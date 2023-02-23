export interface DisplayableFilter {
  filterType: "NLP_FILTER" | "STATIC_FILTER" | "FACET";
  filter: any;
  groupLabel: string;
  label: string;
}
