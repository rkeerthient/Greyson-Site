import React, { useState } from "react";
import { useContext } from "react";

const ProductsContext = React.createContext<any>({});

export const ProductsProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [isGrid, setIsGrid] = useState<any>(true);
  const [sortType, setSortType] = useState<string>("");
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [prodId, setProdId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceValues, setPriceValues] = useState<number[]>([]);
  const [tempPriceValues, setTempPriceValues] = useState<number[]>([]);
  const [initLoad, setInitLoad] = useState(true);
  return (
    <ProductsContext.Provider
      value={{
        isGrid,
        setIsGrid,
        sortType,
        setSortType,
        price,
        setPrice,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        prodId,
        setProdId,
        isModalOpen,
        setIsModalOpen,
        priceValues,
        setPriceValues,
        initLoad,
        setInitLoad,
        tempPriceValues,
        setTempPriceValues,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
