import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
    //OR window.history.back()
  };

  return (
    <div>
      <h2>SingleProduct - {id}</h2>
      <button onClick={handleBack}>Go Back</button>
    </div>
  );
};

export default SingleProduct;
