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
      className={`${selected ? "color-btn active" : "color-btn"}`}
      key={option.id}
      onClick={() => onClick(true)}
    >
      <div
        className="color-facets"
        style={{
          backgroundColor: `${color}`,
        }}
      ></div>
    </div>
  );
}
