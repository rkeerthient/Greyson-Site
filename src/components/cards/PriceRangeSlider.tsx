import Slider from "@mui/material/Slider";
import { useState, useEffect } from "react";
import { useProductsContext } from "../../context/ProductsContext";
const PriceRangeSlider = () => {
  const { setPriceValues, priceValues, tempPriceValues, setInitLoad } =
    useProductsContext();

  const [value, setValue] = useState<any>([]);
  const [range, setRange] = useState<any>([]);
  const rangeSelector = (event: any, newValue: any) => {
    setValue(newValue);
    setPriceValues(newValue);
    setInitLoad(false);
  };
  useEffect(() => {
    setValue(priceValues);
    setRange(tempPriceValues);
    setInitLoad(false);
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
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                className="flex"
                style={{
                  border: "1px solid",
                  alignItems: "center",
                  width: "40%",
                  padding: "0.5em",
                }}
              >
                <span
                  style={{
                    marginRight: "0.25em",
                    marginLeft: "0.25em",
                  }}
                >
                  $
                </span>
                <input
                  type="number"
                  value={value[0]}
                  style={{ outline: "none" }}
                  className="w-full"
                  onChange={(e) => {
                    setPriceValues([Number(e.target.value), value[1]]);
                    setValue([Number(e.target.value), value[1]]);
                  }}
                />
              </div>
              <div style={{ marginTop: "auto", marginBottom: "auto" }}>-</div>
              <div
                className="flex"
                style={{
                  border: "1px solid",
                  alignItems: "center",
                  width: "40%",
                }}
              >
                <span
                  style={{
                    marginRight: "0.25em",
                    marginLeft: "0.25em",
                  }}
                >
                  $
                </span>
                <input
                  type="number"
                  value={value[1]}
                  className="w-full"
                  style={{ outline: "none" }}
                  onChange={(e) => {
                    setPriceValues([value[0], Number(e.target.value)]);
                    setValue([value[0], Number(e.target.value)]);
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PriceRangeSlider;

{
  /* <>
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
          display: "flex",
        }}
      >
        <div
          className="flex"
          style={{
            border: "1px solid",
            alignItems: "center",
            width: "40%",
          }}
        >
          $
          <input
            type="number"
            value={value[0]}
            style={{ outline: "none" }}
            className="w-full"
            onChange={(e) => {
              setPriceValues([Number(e.target.value), value[1]]);
              setValue([Number(e.target.value), value[1]]);
            }}
          />
        </div>
        <div>-</div>
        <div
          className="flex"
          style={{
            border: "1px solid",
            alignItems: "center",
            width: "40%",
          }}
        >
          $
          <input
            type="number"
            value={value[1]}
            className="w-full"
            style={{ outline: "none" }}
            onChange={(e) => {
              setPriceValues([value[0], Number(e.target.value)]);
              setValue([value[0], Number(e.target.value)]);
            }}
          />
        </div>
      </div>
    </div>
  </>
)}
</> */
}
