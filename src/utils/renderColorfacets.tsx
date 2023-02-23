import { FaCheck } from "react-icons/fa";
import {
  CheckboxOptionCssClasses,
  CheckboxOption,
} from "./renderCheckboxOption";

//prettier-ignore
interface ImageOptionProps {
  option: CheckboxOption,
  color?: string,
  onClick: (isChecked: boolean) => void,
  selected?: boolean,
  customCssClasses?: CheckboxOptionCssClasses,
 }

export default function renderColorFacets({
  option,
  color,
  selected,
  onClick,
}: ImageOptionProps) {
  return (
    <div
      id={option.id}
      className={`${selected ? "color-facets active" : "color-facets"}`}
      style={{
        backgroundColor: `${color}`,
      }}
      key={option.id}
      onClick={() => onClick(true)}
    >
      {selected ? <FaCheck /> : null}
    </div>
  );
}
