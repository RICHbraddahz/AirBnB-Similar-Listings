import React from 'react';
import PropTypes from 'prop-types';
import Details from './details';
import './styles/listing.scss';

const Listing = ({id, url, thumbnailImage, additionalDetails}) => {

  const {
    title,
    type,
    numBeds,
    price,
    numRatings,
    avgStars,
  } = additionalDetails;

  return (
    <div className="similar-listing">
      <a href={`/listings/${id}`}>
        <img src={thumbnailImage} />
      </a>
      <a href={`/listings/${id}`}>
        <Details
          type={type}
          numBeds={numBeds}
          title={title}
          price={price}
          numRatings={numRatings}
          avgStars={avgStars}
        />
      </a>
    </div>
  );
};

Listing.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  thumbnailImage: PropTypes.string, // TODO: default image if none provided
  additionalDetails: PropTypes.object.isRequired,
};
export default Listing;