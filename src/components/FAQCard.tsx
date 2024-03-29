import { useState } from "react";
import styled from "styled-components";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../hooks/useComposedCssClasses";
import { CardProps } from "../models/cardComponent";
import MarkdownView from "react-showdown";

export interface StandardCardConfig {
  showOrdinal?: boolean;
}

export interface StandardCardProps extends CardProps {
  configuration: StandardCardConfig;
  customCssClasses?: StandardCardCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

export interface StandardCardCssClasses {
  container?: string;
  header?: string;
  body?: string;
  descriptionContainer?: string;
  ctaContainer?: string;
  cta1?: string;
  cta2?: string;
  ordinal?: string;
  title?: string;
  description?: string;
  answer?: string;
}

const builtInCssClasses: StandardCardCssClasses = {
  container:
    "flex flex-col justify-between border rounded-lg mb-4 p-4 shadow-sm ",
  header: "flex text-gray-800",
  body: "flex justify-end pt-2.5",
  descriptionContainer: "w-full text-base",
  ctaContainer: "flex flex-col justify-end ml-4",
  cta1: "min-w-max bg-blue-600 text-white font-medium rounded-lg py-2 px-5 shadow",
  cta2: "min-w-max bg-white text-blue-600 font-medium rounded-lg py-2 px-5 mt-2 shadow",
  ordinal: "mr-1.5 text-lg font-medium",
  title: "text-lg font-medium",
};

interface CtaData {
  label: string;
  link: string;
  linkType: string;
}

function isCtaData(data: unknown): data is CtaData {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  const expectedKeys = ["label", "link", "linkType"];
  return expectedKeys.every((key) => {
    return key in data;
  });
}

/**
 * This Component renders the base result card.
 *
 * @param props - An object containing the result itself.
 */
export function FAQCard(props: any): JSX.Element {
  const { configuration, result } = props;
  const [isActive, setIsActive] = useState(false);

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  const cta1 = isCtaData(result.rawData.c_primaryCTA)
    ? result.rawData.c_primaryCTA
    : undefined;
  const cta2 = isCtaData(result.rawData.c_secondaryCTA)
    ? result.rawData.c_secondaryCTA
    : undefined;

  // TODO (cea2aj) We need to handle the various linkType so these CTAs are clickable
  function renderCTAs(cta1?: CtaData, cta2?: CtaData) {
    return (
      <>
        {(cta1 ?? cta2) && (
          <div className={cssClasses.ctaContainer}>
            {cta1 && <button className={cssClasses.cta1}>{cta1.label}</button>}
            {cta2 && <button className={cssClasses.cta2}>{cta2.label}</button>}
          </div>
        )}
      </>
    );
  }

  // TODO (cea2aj) Update this to render the ordinal once we get mocks from UX
  function renderOrdinal(index: number) {
    // return (
    //   <div className={cssClasses.ordinal}>{index}</div>
    // );
    return null;
  }

  function renderTitle(title: string) {
    return <div className={cssClasses.title}>{title}</div>;
  }

  return (
    <Wrapper>
      <div className="container">
        <div className="accordion">
          <div className="accordion-item">
            <div
              className="accordion-title"
              onClick={() => setIsActive(!isActive)}
            >
              <div className="faqTitle">
                <span>{result.name}</span>
                <span style={{ float: "right" }}>{isActive ? "-" : "+"}</span>
              </div>
            </div>
            {isActive && (
              <div className="accordion-content">
                <MarkdownView markdown={result.rawData.answer}></MarkdownView>
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>

    // <div className={cssClasses.container}>
    //   <div className={cssClasses.header}>
    //     {configuration.showOrdinal &&
    //       result.index &&
    //       renderOrdinal(result.index)}
    //     {result.name && renderTitle(result.name)}
    //   </div>
    //   {(result.rawData.answer ?? cta1 ?? cta2) && (
    //     <div className={cssClasses.body}>
    //       {result.rawData.answer && (
    //         <div className={cssClasses.descriptionContainer}>
    //           <span>{result.rawData.answer}</span>
    //         </div>
    //       )}
    //       {renderCTAs(cta1, cta2)}
    //     </div>
    //   )}
    // </div>
  );
}

const Wrapper = styled.article`
  .container {
    position: relative;
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    margin: 1em;
    padding: 1em;
    display: flex;
    margin-left: auto;
    margin-right: auto;
  }

  .accordion {
    width: 100%;
  }

  .faqTitle {
    color: black;
    font-weight: bold;
  }
  .accordion-content {
    color: var(--clr-grey-5);
    margin-top: 0.8em;
  }
  p > a {
    text-decoration: underline;
  }
`;
