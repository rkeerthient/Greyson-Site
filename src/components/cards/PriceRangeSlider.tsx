import Slider from "@mui/material/Slider";
import { useState, useEffect } from "react";
import { useProductsContext } from "../../context/ProductsContext";
const PriceRangeSlider = () => {
  const { setPriceValues, priceValues, tempPriceValues, setInitLoad } =
    useProductsContext();

  const [value, setValue] = useState([]);
  const [range, setRange] = useState([]);
  const rangeSelector = (event: any, newValue: any) => {
    setValue(newValue);
    setPriceValues(newValue);
    setInitLoad(false);
  };
  useEffect(() => {
    setValue(priceValues);
    setRange(tempPriceValues);
  }, [tempPriceValues, priceValues]);
  return (
    <>
      {value && range && (
        <>
          <div className="mb-4 font-bold">Price range</div>
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
        </>
      )}
    </>
  );
};

export default PriceRangeSlider;
