import React from 'react';
import { Avatar } from 'antd';
import './index.scss';
import { ICONS } from '../../constants/icons';
import ReactStars from 'react-rating-stars-component';

const Reviews = ({ reviews }) => {
  return (
    <div className="comment-list">
      {reviews.map((review) => (
        <div className="comment" key={review.id}>
          <div className="d-flex justify-content-between">
            <div className="d-flex comment-header">
              <Avatar size={64} src={review.account.avatar} alt={review.account.name} />
              <div className="ms-3">
                <p className="comment-name">{review.account.name}</p>
                <p className="comment-time">
                  <img className="comment-time-img" src={ICONS.time_span} />{' '}
                  {review.updatedAt.toLocaleString().split('T')[0]}
                </p>
              </div>
            </div>
            <ReactStars
              count={review.rating}
              edit={false}
              value={review.rating}
              size={34}
              activeColor="#fc8e0f"
              isHalf={true}
            />
          </div>
          <div className="comment-details">
            <p>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
