import * as React from "react";
import "font-awesome/css/font-awesome.min.css";

const StarRating = ({ selectedStars }: any) => {
  const totalStars = 5;
  const firstMethod = () => {
    return [...Array(totalStars)].map((el, i: any) =>
      i < selectedStars ? (
        <i key={i} className="fa fa-star" />
      ) : (
        <i key={i} className="fa fa-star-o" />
      )
    );
  };

  const secondMethod = () => {
    // implement the code for full, empty and half stars here.
    return [...Array(totalStars)].map((el, i: any) =>
      // check if current star should be half
      i < selectedStars && i + 1 > selectedStars ? (
        <i key={i} className="fa fa-star-half-o" />
      ) : // check if current star should be full
      i < selectedStars ? (
        <i key={i} className="fa fa-star" />
      ) : (
        // else, current star should be empty
        <i key={i} className="fa fa-star-o" />
      )
    );
  };
  return (
    <>{Number.isInteger(selectedStars) ? firstMethod() : secondMethod()}</>
  );
};

export default StarRating;
