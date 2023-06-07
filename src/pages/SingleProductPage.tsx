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
import { dummyReviews } from "../utils/data";
import { margin } from "@mui/system";

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
  const [prodDet, setProdDet] = useState<boolean | null>(false);
  const [care, setCare] = useState<boolean | null>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [sizeTypes, setSizeTypes] = useState([
    {
      txt: ["s", "m", "l", "xl", "xxl", "xxxl"],
    },
    {
      num: [30, 31, 32, 33, 34, 35, 36, 38, 40],
    },
  ]);

  const addFeatures: any = {
    QUICK_DRY:
      "https://cdn.shopify.com/s/files/1/0041/1018/8642/files/quick_dry.png?v=1660166389&width=112",
    ANTIMICROBIAL:
      "https://cdn.shopify.com/s/files/1/0041/1018/8642/files/anti-microbial_a52cc90e-46c3-491a-87f5-82e29d11aab8.png?v=1660166389&width=112",
    GREYSON_TRADEMARK:
      "https://cdn.shopify.com/s/files/1/0041/1018/8642/files/GTM.webp?v=1660245960&width=112",
    ANTIFADE:
      "https://cdn.shopify.com/s/files/1/0041/1018/8642/files/antifade_2x_453559aa-e28c-4629-9150-5921fca15ad2.png?v=1652421556&width=112",
    STRETCH:
      "https://cdn.shopify.com/s/files/1/0041/1018/8642/files/stretch_51e0f8be-75a8-47c7-8406-2583569a23c9.png?v=1660166389&width=112",
    COOLING_TECHNOLOGY:
      "https://cdn.shopify.com/s/files/1/0041/1018/8642/files/cooling_ab5419d4-9583-418d-891b-b19cf5dd2187.png?v=1660166389&width=112",

    UV_AB:
      "https://cdn.shopify.com/s/files/1/0041/1018/8642/files/uv_ab.png?v=1660166389&width=112",

    WATER_RESISTANT:
      "https://cdn.shopify.com/s/files/1/0041/1018/8642/files/water-resistant.png?v=1660245971&width=112",
  };

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://streams.yext.com/v2/accounts/me/api/allProducts?api_key=${proxess.env.REACT_APP_CONTENTAPI_KEY!}&v=20220101&id=${id}`
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
                {data.photoGallery &&
                  colors.map((item: any, index: any) => (
                    <span
                      key={index}
                      style={{
                        display: `${currColor === index ? "block" : "none"}`,
                      }}
                    >
                      <ImageWrapper>
                        <img
                          src={
                            colors[currColor].photoGallery[selectedImage].image
                              .url
                          }
                          className="main"
                          alt={data.name}
                        />
                      </ImageWrapper>
                      <div
                        style={{
                          marginTop: "3em",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                        className="flex"
                      >
                        {item.photoGallery.map(
                          (subItem: any, subIndex: any) => (
                            <div
                              key={subIndex}
                              style={{
                                border: `${
                                  selectedImage === subIndex
                                    ? "1px solid black"
                                    : "0px"
                                }`,
                                cursor: "pointer",
                              }}
                            >
                              <img
                                onClick={() => setSelectedImage(subIndex)}
                                src={subItem.image.url}
                                alt=""
                                style={{ width: "6em" }}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </span>
                  ))}
                <section className="content">
                  <h2>{data?.name}</h2>
                  <div className="flex" style={{ gap: "0.5em" }}>
                    {colors[currColor].oldPrice >= 1 && (
                      <h5
                        className="price "
                        style={{ textDecoration: "line-through" }}
                      >
                        ${colors[currColor].oldPrice}
                      </h5>
                    )}
                    {colors[currColor] && (
                      <h5 className="price">${colors[currColor].price}</h5>
                    )}
                    <p className="text-xl text-gray-700">
                      <StarRating selectedStars={data.c_stars} />
                      <span style={{ marginLeft: "0.5em", fontSize: " 14px" }}>
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
                      <div style={{ fontWeight: "bold" }}>Colors</div>
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
                              onClick={() => {
                                setCurrColor(index);
                                setSelectedImage(0);
                              }}
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
                      gap: "0.6em",
                      textTransform: "uppercase",
                      marginTop: "1em",
                    }}
                  >
                    {isNaN(parseInt(data.size.split(",")[0]))
                      ? sizeTypes[0].txt?.map((item: any, index: number) =>
                          data.size.split(",").includes(item) ? (
                            <div className="size">{item}</div>
                          ) : (
                            <div className="size notAvailable">
                              <div
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  background: "#ccc",
                                  color: "black",
                                  fontSize: "8px",
                                  width: "100%",
                                }}
                              >
                                Notify me
                              </div>
                              <div>{item}</div>
                            </div>
                          )
                        )
                      : "Number"}
                  </div>
                  <div style={{ marginTop: "1em", cursor: "pointer" }}>
                    <div
                      className="flex"
                      style={{
                        gap: "0.25em",
                        alignItems: "center",
                        border: "1px solid",
                        width: "fit-content",
                        padding: "0.75em",
                      }}
                    >
                      <div>
                        <img
                          style={{ height: "18px", width: "18px" }}
                          src="https://cdn.truefitcorp.com/store-gry/7.0.0-latest.34/resources/store/gry/images-snapshot/responsive/logo/bg-logo-black.svg"
                          alt=""
                        />
                      </div>
                      <div>Whats my size?</div>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "1em",
                      fontWeight: "bold",
                      textDecoration: "underline",
                      paddingTop: "0.75em",
                      paddingBottom: "0.75em",
                      textTransform: "uppercase",
                      fontSize: "0.85em",
                    }}
                  >
                    Size guide
                  </div>
                  <div
                    style={{ marginTop: "1em", cursor: "pointer" }}
                    className="addButClass"
                  >
                    <div className="addBut">Add to Bag</div>
                  </div>
                  <div className="product__icons">
                    {addFeatures &&
                      data.c_additionalFeatures &&
                      data.c_additionalFeatures.map((item: any, index: any) => (
                        <div key={index} className="product__icon">
                          <img
                            src={addFeatures[item.replace(" ", "_")]}
                            alt=""
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                  </div>
                  <div style={{ marginTop: "1.5em" }}>
                    <div
                      style={{
                        borderTop: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        paddingTop: "1em",
                        paddingBottom: "1em",
                      }}
                      onClick={() => setProdDet(!prodDet)}
                    >
                      <div
                        style={{
                          fontSize: "18px",
                          color: "black",
                          textTransform: "uppercase",
                        }}
                      >
                        Product Details
                      </div>
                      {prodDet && (
                        <span
                          style={{
                            marginTop: "1em",
                            fontSize: "14px",
                            color: "#6f6f6f",
                          }}
                        >
                          The Comanche Hybrid golf vest is the perfect blend of
                          style and comfort. Featuring two tones in our best
                          selling colors, this vest is windproof and combines a
                          water-resistant upper panel with an 8-way stretch
                          Italian fabric found on the lower body. Constructed
                          from a comfort fabric blend, this golf vest features a
                          half zipper with a covered placket for a sleek look.
                          Finished with an elastic hem for ultimate comfort and
                          freedom of movement.
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        borderTop: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        paddingTop: "1em",
                        paddingBottom: "1em",
                      }}
                      onClick={() => setCare(!care)}
                    >
                      <div
                        style={{
                          fontSize: "18px",
                          color: "black",
                          textTransform: "uppercase",
                        }}
                      >
                        Care
                      </div>
                      {care && (
                        <span
                          style={{
                            marginTop: "1em",
                            fontSize: "14px",
                            color: "#6f6f6f",
                          }}
                        >
                          Wash In 40 Degree | Wash With Similar Colors | Do Not
                          Bleach | Do Not Tumble Dry | Low Iron | Can Dry Clean
                        </span>
                      )}
                    </div>
                  </div>
                </section>
              </div>
              <div style={{ marginTop: "2em" }}>
                <hr />
                <div style={{ marginBottom: "1em", marginTop: "1em" }}>
                  <span
                    style={{
                      marginBottom: "1em",
                      fontSize: "1.5em",
                      fontWeight: "400",
                    }}
                  >
                    CUSTOMER REVIEWS
                    <br />
                    <br />
                  </span>
                  <hr />
                  <p
                    className=" text-gray-700"
                    style={{ fontSize: "1.5em", marginTop: "1em" }}
                  >
                    <StarRating selectedStars={data.c_stars} />
                    <span style={{ marginLeft: "0.5em", fontSize: " 14px" }}>
                      {data.c_reviewsCount} REVIEWS
                    </span>
                  </p>
                  <hr />
                </div>
                {dummyReviews.reviews.map((item: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      padding: "2em",
                      borderBottom: " 1px solid gray",
                    }}
                  >
                    <div
                      className="flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div>{item.user}</div>
                      <div>{item.date}</div>
                    </div>
                    <StarRating selectedStars={item.rating} />
                    <div style={{ fontSize: `1.5em`, fontWeight: "400" }}>
                      {item.title}
                    </div>
                    <div style={{ color: "#6f6f6f" }}>{item.comment}</div>
                  </div>
                ))}
              </div>
            </div>
          </Wrapper>
        )}
      </>
    );
  }
};

const Wrapper = styled.main`
  h2 {
    font-size: 24px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin: 0 0 1rem;
  }
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
    font-size: 18px;
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
  .product__icons {
    text-align: center;
    background-color: #f8f8f8;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0.4rem 1.5rem;
    border-top: 0.1rem solid #ccc;
    margin-top: 1.2rem;
    font-size: 1.4rem;
  }
  .product__icon {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .product__icons > * {
    width: 100%;
    max-width: 25%;
  }
  .product__icons img {
    max-width: 4rem;
    min-height: 4rem;
    margin: 0 auto;
  }
  .product__icons span {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .size {
    display: flex;
    line-height: 1;
    border: 0.1rem solid black;
    font-size: 18px;
    height: 56px;
    width: 56px;
    text-align: center;
    justify-content: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .notAvailable {
    color: #ccc;
    border-color: #ccc;
    position: relative;
  }

  .addBut {
    display: flex;
    width: 100%;
    min-height: 4rem;
    transition: all 0.25s ease-in-out;
    text-align: center;

    font-weight: 400;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
  }
  .addButClass {
    background: black;
    color: white;
    border: 1px solid white;

    &:hover {
      background: white;
      color: black;
      border: 1px solid black;
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
  addfeatures: {
    text-align: center;
    background-color: var(--color-light-f8);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0.4rem 1.5rem;
    border-top: 0.1rem solid var(--color-light-c);
    margin-top: 1.2rem;
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
