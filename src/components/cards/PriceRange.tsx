import { Range, getTrackBackground } from "react-range";
import { useProductsContext } from "../../context/ProductsContext";

export const PriceRange = () => {
  const { tempPriceValues, priceValues, setPriceValues, setInitLoad } =
    useProductsContext();

  let step = 1;

  const handleChange = (values: number[]) => {
    setInitLoad(false);
    if (values[0] > values[1]) {
      values[0] = values[1];
    }
    if (values[1] < values[0]) {
      values[1] = values[0];
    }
    setPriceValues(values);
  };

  return (
    <>
      {
        <div style={{ width: "100%", maxWidth: "90%" }}>
          <div className="mb-8 text-gray-900 text-sm font-medium text-left">
            Price
          </div>
          <div className="p-4 mt-4 mb-4">
            <Range
              step={step}
              min={tempPriceValues[0]}
              max={tempPriceValues[1]}
              values={priceValues}
              onChange={(values) => handleChange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values: priceValues,
                      colors: [
                        "#c4c4c442",
                        "var(--clr-primary-3)",
                        "#c4c4c442",
                      ],
                      min: tempPriceValues[0],
                      max: tempPriceValues[1],
                    }),
                  }}
                  className="h-2 w-full"
                >
                  {children}
                </div>
              )}
              renderThumb={({ index, props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                  }}
                  className="thumbs"
                >
                  <div className="priceValues">{`$${
                    priceValues[index] === priceValues.length - 1
                      ? priceValues[index] + "+"
                      : priceValues[index]
                  }`}</div>
                </div>
              )}
            />
          </div>

          <div className="rangeBoxesContainer">
            <div className="rangeBox">
              <div className="flex">$</div>
              <input
                className="rangeInputbox"
                type="number"
                value={priceValues[0]}
                onChange={(e) => {
                  if (Number(e.target.value) < priceValues[1])
                    setPriceValues([Number(e.target.value), priceValues[1]]);
                }}
              />
            </div>
            <div className="rangeBox">
              <div className="flex">$</div>
              <input
                className="rangeInputbox"
                type="number"
                value={priceValues[1]}
                onChange={(e) => {
                  if (Number(e.target.value) > priceValues[1])
                    setPriceValues([priceValues[0], Number(e.target.value)]);
                }}
              />
            </div>
          </div>
        </div>
      }
    </>
  );
};
