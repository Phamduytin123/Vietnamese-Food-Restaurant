import React from 'react';
import './index.scss';

function darkenColor(color, amount = 0.5) {
  let [r, g, b] = color.match(/\w\w/g).map((x) => parseInt(x, 16));

  r = Math.max(0, r - Math.round(255 * amount));
  g = Math.max(0, g - Math.round(255 * amount));
  b = Math.max(0, b - Math.round(255 * amount));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function BoxHeader(props) {
  const { data } = props;

  return (
    <div className="admin-dashboard-box-header-container">
      <div className='admin-dashboard-box-header-content-container'>
        <h5 className="admin-dashboard-box-header-name" style={{ color: darkenColor(data.color) }}>
          {data.name}
        </h5>
        <h4 className="admin-dashboard-box-header-number">{data.number}</h4>
      </div>
      <div className="admin-dashboard-box-header-icon-container" style={{ background: data.color }}>
        {data.icon}
      </div>
    </div>
  );
}

export default BoxHeader;
