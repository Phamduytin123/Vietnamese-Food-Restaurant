import React from 'react';
import './index.scss';
import { formatDistanceToNow, format, isAfter, isBefore, subMonths } from 'date-fns';
import { vi } from 'date-fns/locale';
import { StarFilled, StarOutlined } from '@ant-design/icons';

function formatTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const translations = {
    about: 'khoảng',
    'less than a minute ago': 'ít hơn một phút trước',
    minute: 'phút',
    minutes: 'phút',
    hour: 'giờ',
    hours: 'giờ',
    day: 'ngày',
    days: 'ngày',
    month: 'tháng',
    months: 'tháng',
    year: 'năm',
    years: 'năm',
    ago: 'trước',
    in: 'trong',
  };

  function translate(text) {
    return text
      .split(' ')
      .map((word) => translations[word] || word)
      .join(' ');
  }

  if (isAfter(now, date)) {
    // Nếu đã quá ngày
    const distance = formatDistanceToNow(date, { addSuffix: true, locale: vi });
    return translate(distance);
  } else if (isBefore(now, subMonths(date, 1))) {
    // Nếu chưa quá 1 tháng
    const distance = formatDistanceToNow(date, { addSuffix: true, locale: vi });
    return translate(distance);
  } else {
    // Nếu đã quá 1 tháng
    return format(date, 'dd/MM/yyyy HH:mm', { locale: vi });
  }
}

function SmallReviewItem(props) {
  const { data } = props;
  return (
    <div className="admin-dashboard-small-review-container">
      <div className="admin-dashboard-small-review-info-user-container">
        <img alt="avatar user" src={data.account.avatar} className="admin-dashboard-small-review-info-user-avatar" />
        <div className="admin-dashboard-small-review-info-user-name-container">
          <p className="admin-dashboard-small-review-info-user-name">{data.account.displayName}</p>
          <p className="admin-dashboard-small-review-created-at">{formatTime(data.createdAt)}</p>
        </div>
      </div>
      <p className="admin-dashboard-small-review-comment">{data.comment}</p>
      <div className="admin-dashboard-small-review-star-container">
        {[...Array(5)].map((_, index) =>
          index < data.rating ? (
            <StarFilled style={{ color: '#F7C604', fontSize: 20 }} />
          ) : (
            <StarOutlined style={{ color: '#F7C604', fontSize: 20 }} />
          ),
        )}
      </div>
      <div className="admin-dashboard-small-review-item-container">
        <img alt="item pic" src={data.item.images[0]} className="admin-dashboard-small-review-item-image" />
        <div className="admin-dashboard-small-review-item-info-container">
          <p className="admin-dashboard-small-review-item-name">{data.item.name}</p>
          <p className="admin-dashboard-small-review-item-regional">{data.item.regional}</p>
        </div>
      </div>
    </div>
  );
}

export default SmallReviewItem;
