import { Result } from "@yext/search-headless-react";
import LocationMap from "./LocationMap";
interface VerticalResultsDisplayProps {
  isLoading?: boolean;
  results: Result[];
}
const MapCard = (props: VerticalResultsDisplayProps): JSX.Element | null => {
  const { results, isLoading } = props;

  return <>{results.length >= 1 && <LocationMap results={results} />}</>;
};

export default MapCard;
