import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Loading from "../components/Loading";
import { useCartContext } from "../context/CartContext";
import Cart from "../components/CartComponents/Cart";
import { Markdown } from "react-showdown";
import StarRating from "../components/starRating";

type ParamTypes = {
  id: string;
};

export interface Root {
  docs: Doc[];
  count: number;
}

export interface Doc {
  $key: Key;
  c_oldPrice: COldPrice;
  c_productVariants: CProductVariant[];
  c_reviewsCount: string;
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
  color: string;
  id: string;
  photoGallery: PhotoGallery[];
  size: string;
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
  const [amount, setAmount] = useState(1);
  const { id } = useParams<ParamTypes>();
  const [data, setData] = useState<Doc | null>();
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCartContext();

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://streams.yext.com/v2/accounts/me/api/allProducts?api_key=492b4f850dc811953f9419b7574ca389&v=20220101&id=${id}`
      );

      const responseJson = await response.json();
      console.log(JSON.stringify(responseJson.response));
      setData(await responseJson.response.docs[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const updateVariant = async (id: any) => {
    try {
      const response = await fetch(
        `https://streams.yext.com/v2/accounts/me/api/allProducts?api_key=492b4f850dc811953f9419b7574ca389&v=20220101&id=${id}`
      );

      const responseJson = await response.json();
      console.log(JSON.stringify(responseJson.response));
      setData(await responseJson.response.docs[0]);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const increase = () => {
    setAmount((oldAmount) => {
      var amnt = oldAmount + 1;
      if (amnt >= 20) setAmount(20);
      else setAmount(amnt);
      return amnt;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      var amnt = oldAmount - 1;
      if (amnt < 1) setAmount(1);
      else setAmount(amnt);
      return amnt;
    });
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        {data && (
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
                      src={data.photoGallery[0].image.url}
                      className="main"
                      alt={data.name}
                    />
                  </ImageWrapper>
                )}
                <section className="content">
                  <h2>{data?.name}</h2>
                  <div className="flex" style={{ gap: "2em" }}>
                    {data.c_oldPrice.value && (
                      <h5
                        className="price "
                        style={{ textDecoration: "line-through" }}
                      >
                        ${data.c_oldPrice.value}
                      </h5>
                    )}
                    {data.price && (
                      <h5 className="price">${data.price.value}</h5>
                    )}
                    <p className="text-xl text-gray-700">
                      <StarRating selectedStars={data.c_stars} />
                      <span style={{ marginLeft: "0.5em" }}>
                        {data.c_reviewsCount} REVIEWS
                      </span>
                    </p>
                  </div>

                  <span className="desc">
                    <Markdown markdown={data.richTextDescription} />
                  </span>
                  <hr />
                  {data?.color && (
                    <CartWrapper>
                      <div className="colors">
                        <span>colour :</span>
                        <ul style={{ display: "flex", gap: "0.5em" }}>
                          <li
                            key={data.id}
                            onClick={() => updateVariant(data.id)}
                            style={{
                              backgroundColor: data.color,
                              height: "1.5em",
                              width: "1.5em",
                              borderRadius: "50%",
                            }}
                          ></li>

                          {data.c_productVariants &&
                            data.c_productVariants.map((item: any) => {
                              console.log(JSON.stringify(item.rawData));
                              return (
                                <li
                                  key={item.id}
                                  onClick={() => updateVariant(item.id)}
                                  style={{
                                    backgroundColor: item.color,
                                    height: "1.5em",
                                    width: "1.5em",
                                    borderRadius: "50%",
                                  }}
                                ></li>
                              );
                            })}
                        </ul>
                      </div>
                      <div className="btn-container">
                        <Cart
                          increase={increase}
                          decrease={decrease}
                          amount={amount}
                        />
                        <Link
                          to="/cart"
                          className="btn"
                          onClick={() => {
                            addToCart(id, data.color[0], amount, data);
                          }}
                        >
                          add to cart
                        </Link>
                      </div>
                    </CartWrapper>
                  )}
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
      color: var(--clr-white);
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
