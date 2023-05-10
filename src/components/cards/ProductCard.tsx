import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProductsContext } from "../../context/ProductsContext";
import { CardProps } from "../../models/cardComponent";

export function ProductCard(props: any): JSX.Element {
  const [variant, setVariant] = useState();
  const [currImg, setCurrImg] = useState();
  const { result } = props;
 
  const { setProdId, setIsModalOpen } = useProductsContext();
  const [colors, setColors] = useState<any[]>([]);
  const [currColor, setCurrColor] = useState(0);
  const [resData, setResData] = useState(result.rawData) as unknown as any;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let nArray: any = [];
    nArray.push({
      id: result.id,
      photoGallery: resData.photoGallery,
      colorCode: resData.c_colorCode,
      oldPrice: resData.c_oldPrice ? resData.c_oldPrice.value : 0,
      price: resData.price ? resData.price.value : 0,
    });

    resData.c_colorToProd &&
      resData.c_colorToProd.map(
        (item: any) =>
          item.c_colorCode &&
          nArray.push({
            id: item.id,
            photoGallery: item.photoGallery,
            colorCode: item.c_colorCode,
            oldPrice: item.c_oldPrice ? item.c_oldPrice.value : 0,
            price: item.price ? item.price.value : 0,
          })
      );
    !colors.length && setColors([...colors, ...nArray]);
    setIsLoading(false);
  }, [result]);

  const { isGrid } = useProductsContext();

  return isGrid ? (
    <div>
      {(currImg || resData.photoGallery) && colors && !isLoading && (
        <Wrapper>
          <div>
            <div className="container">
              {colors.map((item: any, index: any) => (
                <span
                  key={index}
                  style={{
                    display: `${currColor === index ? "block" : "none"}`,
                  }}
                >
                  <img
                    src={colors[currColor].photoGallery[0].image.url}
                    alt=""
                  />
                  <Link to={`/product/${result.id}`} className="link">
                    <FaEye />
                  </Link>
                </span>
              ))}
            </div>
            <footer>
              <div className="flex flex-col gap-2">
                <h5>{result.name}</h5>
                <p
                  style={{
                    textTransform: "uppercase",
                    fontSize: "0.75em",
                    fontWeight: 700,
                    color: "#8d939a",
                  }}
                >
                  {colors[currColor].oldPrice >= 1 && (
                    <span>
                      <span style={{ color: "red" }}>on sale</span> starting
                      at&nbsp;
                    </span>
                  )}
                  ${colors[currColor].price}
                </p>
                {colors && (
                  <>
                    <ul style={{ display: "flex", gap: "0.5em" }}>
                      {colors.map((item: any, index: number) => {
                        return (
                          <li
                            key={item.id}
                            className={`${
                              currColor === index
                                ? "color-btn active"
                                : "color-btn"
                            }`}
                            onClick={() => setCurrColor(index)}
                          >
                            <div
                              style={
                                item.colorCode.includes("linear")
                                  ? {
                                      backgroundImage: item.colorCode,
                                      height: "1em",
                                      width: "1em",
                                      borderRadius: "50%",
                                      border: "1px solid",
                                    }
                                  : {
                                      backgroundColor: item.colorCode,
                                      height: "1em",
                                      width: "1em",
                                      borderRadius: "50%",
                                      border: "1px solid",
                                    }
                              }
                            ></div>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>
            </footer>
          </div>
        </Wrapper>
      )}
    </div>
  ) : (
    <>
      {resData.photoGallery && (
        <article>
          <img src={resData.photoGallery[0].image.url} alt="" />
          <div>
            <h4>{result.name}</h4>
            {colors.map((item: any, index: any) => (
              <span
                key={index}
                style={{
                  display: `${currColor === index ? "block" : "none"}`,
                }}
              >
                <h5 className="price">
                  {colors[currColor].oldPrice >= 1 && (
                    <span>
                      <span style={{ color: "red" }}>on sale</span> starting
                      at&nbsp;
                    </span>
                  )}
                  ${colors[currColor].price}
                </h5>
              </span>
            ))}
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
              inventore illo dolore cupiditate atque iure maxime dolorum nam
              architecto magni.
            </p>

            <Link to={`/product/${result.id}`} className="btn">
              Details
            </Link>
          </div>
        </article>
      )}
    </>
  );
}

const Wrapper = styled.article`
  .container {
    position: relative;
    border-radius: var(--radius);
    background: lightgray;
  }
  img {
    height: 255px !important;
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }
  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
  .active {
    border-radius: 50%;
    border: 1px solid var(--clr-primary-5) !important;
    padding: 0.25em;
  }
  ul {
    margin-top: 1em;
    align-items: center;
  }
`;
