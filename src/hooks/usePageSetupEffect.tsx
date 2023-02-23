import { useLayoutEffect } from "react";
import { useSearchActions, SearchIntent } from "@yext/search-headless-react";
import {
  executeSearch,
  getSearchIntents,
  updateLocationIfNeeded,
} from "../utils";

/**
 * Sets up the state for a page
 * @param verticalKey - The verticalKey associated with the page, or undefined for universal pages
 */
export default function usePageSetupEffect(verticalKey?: string) {
  const answersActions = useSearchActions();
  useLayoutEffect(() => {
    const stateToClear = {
      filters: {},
      universal: {},
      vertical: {},
    };
    answersActions.setState({
      ...answersActions.state,
      ...stateToClear,
    });
    verticalKey
      ? answersActions.setVertical(verticalKey)
      : answersActions.setUniversal();
    const executeQuery = async () => {
      let searchIntents: SearchIntent[] = [];
      if (!answersActions.state.location.userLocation) {
        searchIntents =
          (await getSearchIntents(answersActions, !!verticalKey)) || [];
        await updateLocationIfNeeded(answersActions, searchIntents);
      }
      executeSearch(answersActions, !!verticalKey);
    };
    executeQuery();
  }, [answersActions, verticalKey]);
}
