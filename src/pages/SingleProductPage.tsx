import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useCartContext } from "../context/CartContext";
import Cart from "../components/CartComponents/Cart";
import { Markdown } from "react-showdown";
import StarRating from "../components/starRating";
import { FaCheck } from "react-icons/fa";

type ParamTypes = {
  id: string;
};

export interface Root {
  meta: Meta;
  response: Response;
}

export interface Meta {
  uuid: string;
  errors: any[];
}

export interface Response {
  docs: Doc[];
  count: number;
}

export interface Doc {
  $key: Key;
  c_additionalFeatures: string[];
  c_colorCode: string;
  c_oldPrice: COldPrice;
  c_onSale: boolean;
  c_productVariants: CProductVariant[];
  c_reviewsCount: string;
  c_shortDecription: string;
  c_stars: string;
  color: string;
  id: string;
  name: string;
  photoGallery: PhotoGallery2[];
  price: Price;
  richTextDescription: string;
  size: string;
}

export interface Key {
  locale: string;
  primary_key: string;
}

export interface COldPrice {
  currencyCode: string;
  value: string;
}

export interface CProductVariant {
  c_colorCode: string;
  color: string;
  id: string;
  photoGallery: PhotoGallery[];
  size: string;
  c_oldPrice: COldPrice;
  price: Price;
}

export interface PhotoGallery {
  image: Image;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface PhotoGallery2 {
  image: Image2;
}

export interface Image2 {
  height: number;
  url: string;
  width: number;
}

export interface Price {
  currencyCode: string;
  value: string;
}

const SingleProductPage = () => {
  const { id } = useParams<ParamTypes>();
  const [data, setData] = useState<any | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState<any[]>([]);
  const [currColor, setCurrColor] = useState(0);
  const [sizeTypes, setSizeTypes] = useState([
    {
      txt: ["s", "m", "l", "xl", "xxl", "xxxl"],
    },
    {
      num: [30, 31, 32, 33, 34, 35, 36, 38, 40],
    },
  ]);
  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://streams.yext.com/v2/accounts/me/api/allProducts?api_key=492b4f850dc811953f9419b7574ca389&v=20220101&id=${id}`
      );
      const responseJson = await response.json();
      setData(await responseJson.response.docs[0]);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      JSON.stringify(data);
      let nArray: any = [];
      nArray.push({
        id: data.id,
        photoGallery: data.photoGallery,
        colorCode: data.c_colorCode,
        oldPrice: data.c_oldPrice ? data.c_oldPrice.value : 0,
        price: data.price ? data.price.value : 0,
      });
      data.c_colorToProd &&
        data.c_colorToProd.map((item: any) =>
          nArray.push({
            id: item.id,
            photoGallery: item.photoGallery,
            colorCode: item.c_colorCode,
            oldPrice: item.c_oldPrice ? item.c_oldPrice.value : 0,
            price: item.price ? item.price.value : 0,
          })
        );
      setColors([...colors, ...nArray]);

      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        {data && colors && !isLoading && (
          <Wrapper>
            <PageHero title={data?.name} product="product" />
            <div className="section section-center page">
              <Link to="/products" className="btn">
                back to products
              </Link>
              <div className="product-center">
                {data.photoGallery && (
                  <ImageWrapper>
                    <img
                      src={colors[currColor].photoGallery[0].image.url}
                      className="main"
                      alt={data.name}
                    />
                  </ImageWrapper>
                )}
                <section className="content">
                  <h2>{data?.name}</h2>
                  <div className="flex" style={{ gap: "2em" }}>
                    {colors[currColor].c_oldPrice && (
                      <h5
                        className="price "
                        style={{ textDecoration: "line-through" }}
                      >
                        ${colors[currColor].c_oldPrice}
                      </h5>
                    )}
                    {colors[currColor] && (
                      <h5 className="price">${colors[currColor].price}</h5>
                    )}
                    <p className="text-xl text-gray-700">
                      <StarRating selectedStars={data.c_stars} />
                      <span style={{ marginLeft: "0.5em" }}>
                        {data.c_reviewsCount} REVIEWS
                      </span>
                    </p>
                  </div>

                  <span className="desc">
                    <Markdown markdown={data.c_shortDecription} />
                  </span>
                  <hr />
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
                                        height: "1.5em",
                                        width: "1.5em",
                                        borderRadius: "50%",
                                        border: "1px solid",
                                      }
                                    : {
                                        backgroundColor: item.colorCode,
                                        height: "1.5em",
                                        width: "1.5em",
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
                  <div
                    className="flex"
                    style={{
                      gap: "2em",
                      textTransform: "uppercase",
                      marginTop: "1em",
                    }}
                  >
                    {isNaN(parseInt(data.size.split(",")[0]))
                      ? sizeTypes[0].txt?.map((item: any, index: number) =>
                          data.size.split(",").includes(item) ? (
                            <div style={{ margin: "0 1rem 1rem 0;" }}>
                              <span
                                style={{
                                  lineHeight: 1,
                                  minWidth: "4.6rem",
                                  minHeight: "4.6rem",
                                  padding: "0.5rem 1rem 0",
                                  border: "0.1rem solid black",
                                }}
                              >
                                {item}
                              </span>
                            </div>
                          ) : (
                            <span
                              style={{
                                lineHeight: 1,
                                minWidth: "4.6rem",
                                minHeight: "4.6rem",
                                padding: "0.5rem 1rem 0",
                                border: "0.1rem solid black",
                              }}
                              className="notAvailable"
                            >
                              {item}
                            </span>
                          )
                        )
                      : "Number"}
                  </div>
                </section>
              </div>
            </div>
          </Wrapper>
        )}
      </>
    );
  }
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  img {
    margin-left: auto;
    margin-right: auto;
  }
  ul {
    margin-top: 1em;
    align-items: center;
  }
  .active {
    border-radius: 50%;
    border: 1px solid var(--clr-primary-5) !important;
    padding: 0.25em;
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

const CartWrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: flex;
    gap: 0.5em;
    // grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: white;
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }
  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;

const ImageWrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;
export default SingleProductPage;
