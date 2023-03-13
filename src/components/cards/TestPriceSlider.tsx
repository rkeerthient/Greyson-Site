import Slider from "@material-ui/core/Slider";
import { useEffect } from "react";
import { useState } from "react";
import { useProductsContext } from "../../context/ProductsContext";
const TestPriceSlider = ({ min, max }: any) => {
  const { setPriceValues, tempPriceValues } = useProductsContext();

  const [value, setValue] = useState([min, max]);
  const [range, setRange] = useState([min, max]);
  console.log(value);
  console.log(range);

  const rangeSelector = (event: any, newValue: any) => {
    setValue(newValue);
    setPriceValues(newValue);
  };

  return (
    <>
      {value && range && (
        <div
          style={{
            margin: "auto",
            display: "block",
            width: "85%",
          }}
        >
          <Slider
            value={value}
            min={range[0]}
            max={range[1]}
            onChange={rangeSelector}
            valueLabelDisplay="auto"
          />
          <div
            style={{
              width: "85%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>${value[0]}</div>
            <div>-</div>
            <div>${value[1]}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestPriceSlider;
