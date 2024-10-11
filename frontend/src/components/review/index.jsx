import React from 'react';
import { Avatar } from 'antd';
import './index.scss';
import { ICONS } from '../../constants/icons';
import ReactStars from 'react-rating-stars-component';

const reviews = [
  {
    id: 1,
    itemId: 101,
    accountId: 1,
    account: {
      name: 'Khoi',
      avatar:
        'https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-1/437950066_1520139268563594_4668197325509089988_n.jpg?stp=cp6_dst-jpg_s160x160&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeG65YzilaYEtZ3NGJmRXjiJwMDTpG0hO7XAwNOkbSE7tb7O7V0AebICBHQnCW-B2TDgSIIPzm1jhQnzTkiuOgQS&_nc_ohc=QCVzXHzTry0Q7kNvgHLp4gx&_nc_zt=24&_nc_ht=scontent.fdad1-4.fna&_nc_gid=ASRCUpyiHWybJxJkO6tRNKx&oh=00_AYAus4O7bCbxKxZHLZ5fi1hqmJ3m9YkVITZ4ttBcmItJ5g&oe=670E7A2E',
    },
    rating: 5,
    comment:
      'Món Bánh xèo là một trong những món ăn đặc trưng của ẩm thực Việt Nam mà tôi đã có cơ hội thử. Lớp vỏ bánh vàng giòn, thơm lừng, kết hợp với nhân tôm, thịt heo và giá đỗ mang lại hương vị phong phú. Điểm nổi bật của bánh xèo chính là sự kết hợp tinh tế giữa vỏ bánh giòn rụm và phần nhân mềm mại bên trong. Khi ăn kèm với rau sống và chấm vào nước mắm chua ngọt, món ăn thực sự trở nên bùng nổ hương vị. Tuy nhiên, một điều lưu ý là bánh có thể hơi dầu mỡ, nên nếu bạn không quen với thức ăn nhiều dầu, có thể sẽ thấy hơi ngấy.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    itemId: 102,
    accountId: 2,
    account: {
      name: 'Khoi',
      avatar:
        'https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-1/437950066_1520139268563594_4668197325509089988_n.jpg?stp=cp6_dst-jpg_s160x160&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeG65YzilaYEtZ3NGJmRXjiJwMDTpG0hO7XAwNOkbSE7tb7O7V0AebICBHQnCW-B2TDgSIIPzm1jhQnzTkiuOgQS&_nc_ohc=QCVzXHzTry0Q7kNvgHLp4gx&_nc_zt=24&_nc_ht=scontent.fdad1-4.fna&_nc_gid=ASRCUpyiHWybJxJkO6tRNKx&oh=00_AYAus4O7bCbxKxZHLZ5fi1hqmJ3m9YkVITZ4ttBcmItJ5g&oe=670E7A2E',
    },
    rating: 4,
    comment:
      'Món Bánh xèo là một trong những món ăn đặc trưng của ẩm thực Việt Nam mà tôi đã có cơ hội thử. Lớp vỏ bánh vàng giòn, thơm lừng, kết hợp với nhân tôm, thịt heo và giá đỗ mang lại hương vị phong phú. Điểm nổi bật của bánh xèo chính là sự kết hợp tinh tế giữa vỏ bánh giòn rụm và phần nhân mềm mại bên trong. Khi ăn kèm với rau sống và chấm vào nước mắm chua ngọt, món ăn thực sự trở nên bùng nổ hương vị. Tuy nhiên, một điều lưu ý là bánh có thể hơi dầu mỡ, nên nếu bạn không quen với thức ăn nhiều dầu, có thể sẽ thấy hơi ngấy.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    itemId: 103,
    accountId: 3,
    account: {
      name: 'Khoi',
      avatar:
        'https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-1/437950066_1520139268563594_4668197325509089988_n.jpg?stp=cp6_dst-jpg_s160x160&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeG65YzilaYEtZ3NGJmRXjiJwMDTpG0hO7XAwNOkbSE7tb7O7V0AebICBHQnCW-B2TDgSIIPzm1jhQnzTkiuOgQS&_nc_ohc=QCVzXHzTry0Q7kNvgHLp4gx&_nc_zt=24&_nc_ht=scontent.fdad1-4.fna&_nc_gid=ASRCUpyiHWybJxJkO6tRNKx&oh=00_AYAus4O7bCbxKxZHLZ5fi1hqmJ3m9YkVITZ4ttBcmItJ5g&oe=670E7A2E',
    },
    rating: 3,
    comment:
      'Món Bánh xèo là một trong những món ăn đặc trưng của ẩm thực Việt Nam mà tôi đã có cơ hội thử. Lớp vỏ bánh vàng giòn, thơm lừng, kết hợp với nhân tôm, thịt heo và giá đỗ mang lại hương vị phong phú. Điểm nổi bật của bánh xèo chính là sự kết hợp tinh tế giữa vỏ bánh giòn rụm và phần nhân mềm mại bên trong. Khi ăn kèm với rau sống và chấm vào nước mắm chua ngọt, món ăn thực sự trở nên bùng nổ hương vị. Tuy nhiên, một điều lưu ý là bánh có thể hơi dầu mỡ, nên nếu bạn không quen với thức ăn nhiều dầu, có thể sẽ thấy hơi ngấy.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const Reviews = (
  {
    //prop
  },
) => {
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
                  <img className="comment-time-img" src={ICONS.time_span} /> {review.createdAt.toLocaleString()}
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
