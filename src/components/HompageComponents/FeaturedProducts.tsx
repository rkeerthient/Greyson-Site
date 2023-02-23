import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "../Loading";

interface Root {
  meta: Meta;
  response: Response;
}

interface Meta {
  uuid: string;
  errors: any[];
}

interface Response {
  entities: Entity[];
  count: number;
}

interface Entity {
  landingPageUrl: string;
  savedFilters: string[];
  primaryPhoto: PrimaryPhoto;
  name: string;
  c_cCategory: string[];
  c_collarType?: string[];
  c_color: string[];
  c_department: string;
  c_fabric?: string[];
  c_featuredProduct: boolean;
  c_fit?: string[];
  c_isSale?: boolean;
  c_price: string[];
  c_primaryCTA: CPrimaryCta;
  c_productCategory: string[];
  c_size?: string[];
  c_sleeveLength?: string[];
  c_subtitle: string[];
  c_type: string[];
  meta: Meta2;
}

interface PrimaryPhoto {
  image: Image;
}

interface Image {
  url: string;
  width: number;
  height: number;
  sourceUrl: string;
  thumbnails: Thumbnail[];
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface CPrimaryCta {
  label: string;
  linkType: string;
  link: string;
}

interface Meta2 {
  accountId: string;
  uid: string;
  id: string;
  timestamp: string;
  folderId: string;
  language: string;
  countryCode: string;
  entityType: string;
  labels?: string[];
}

const FeaturedProducts = () => {
  const [data, setData] = useState<Root["response"] | null>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchFeaturedProducts = async () => {
    setIsLoading(true);
    try {
      const responseData = await fetch(
        `https://liveapi-sandbox.yext.com/v2/accounts/me/entities?api_key=${process.env.REACT_APP_KEY}&v=20220101&entityTypes=product&filter={"c_featuredProduct": {"$eq": true}}`
      );
      const responseJson: Root = await responseData.json();
       setIsLoading(false);
      setData(await responseJson.response);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  if (isLoading && !data) {
    return <Loading />;
  } else {
    return (
      <Wrapper className="section">
        <div className="title">
          <h2>featured products</h2>
          <div className="underline"></div>
        </div>
        <div className="section-center featured">
          {data?.entities.map((item, index) => (
            <WrapperProd key={index}>
              <div className="container">
                <img src={item.primaryPhoto.image.url} alt="" />
                <Link to={`/product/${item.meta.id}`} className="link">
                  <FaSearch />
                </Link>
              </div>
              <footer>
                <h5>{item.name}</h5>
                <p>{item.c_price}</p>
              </footer>
            </WrapperProd>
          ))}
        </div>
        <Link to="/products" className="btn">
          all products
        </Link>
      </Wrapper>
    );
  }
};

export default FeaturedProducts;
const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

const WrapperProd = styled.article`
  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
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
`;
