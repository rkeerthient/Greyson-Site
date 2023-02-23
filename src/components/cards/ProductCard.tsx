import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProductsContext } from "../../context/ProductsContext";
import { CardProps } from "../../models/cardComponent";

//prettier-ignore
export interface ProductCardConfig {
  showOrdinal?: boolean
}

//prettier-ignore
export interface ProductCardProps extends CardProps {
  configuration: ProductCardConfig 
}
export interface Root {
  rawData: RawData;
  source: string;
  index: number;
  name: string;
  id: string;
  highlightedFields: HighlightedFields;
  entityType: string;
}

export interface RawData {
  id: string;
  type: string;
  landingPageUrl: string;
  savedFilters: string[];
  primaryPhoto: PrimaryPhoto;
  name: string;
  c_cCategory: string[];
  c_color: string[];
  c_department: string;
  c_fabric: string[];
  c_fit: string[];
  c_price: string[];
  c_primaryCTA: CPrimaryCta;
  c_productCategory: string[];
  c_size: string[];
  c_sleeveLength: string[];
  c_subtitle: string[];
  c_type: string[];
  uid: string;
}

export interface PrimaryPhoto {
  image: Image;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  sourceUrl: string;
  thumbnails: Thumbnail[];
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface CPrimaryCta {
  label: string;
  linkType: string;
  link: string;
}

export interface HighlightedFields {}

export function ProductCard(props: ProductCardProps): JSX.Element {
  const { result } = props;
  const { setProdId, setIsModalOpen } = useProductsContext();
  const resData = result.rawData as unknown as any;
  const { isGrid } = useProductsContext();
  console.log(isGrid);

  return isGrid ? (
    <div>
      {resData.photoGallery && (
        <Wrapper>
          <div>
            <div className="container">
              <img src={resData.photoGallery[0].image.url} alt="" />
              <Link to={`/product/${result.id}`} className="link">
                <FaEye />
              </Link>
            </div>
            <footer>
              <h5>{result.name}</h5>
              <div className="flex gap-2">
                <p>${resData.price.value}</p>
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
            <h5 className="price">{resData.c_price}</h5>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
              inventore illo dolore cupiditate atque iure maxime dolorum nam
              architecto magni.
            </p>
            <button
              className="btn"
              onClick={() => {
                setProdId(result.id);
                setIsModalOpen(true);
              }}
            >
              Details
            </button>
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
`;
