import React, { useEffect, useState } from 'react';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HistoryOutlined,
  InboxOutlined,
  LeftOutlined,
  LineChartOutlined,
  RightOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import BoxHeader from './components/box-header';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Button, Table } from 'antd';
import SmallReviewItem from './components/review-item';
import revenueAPI from '../../../api/revenueAPI';
import { DATEINAWEEK } from '../../../constants/dateInAWeek';
import { darkenColor, formatCurrency } from '../../../utils/string';
import LoadingOverlay from '../../../components/loading_overlay';

Chart.register(...registerables);

function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [boxHeaderData, setBoxHeaderData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const res = await revenueAPI.getRevenue(currentPage, 4);

      // Update state with fetched data
      setBoxHeaderData([
        {
          name: 'Số khách hàng',
          icon: <TeamOutlined style={{ color: darkenColor('#8280FF') }} />,
          number: res.data.totalUser,
          color: '#8280FF',
        },
        {
          name: 'Số đơn hàng',
          icon: <InboxOutlined style={{ color: darkenColor('#FEC53D') }} />,
          number: res.data.totalOrder,
          color: '#FEC53D',
        },
        {
          name: 'Tổng doanh thu',
          icon: <LineChartOutlined style={{ color: darkenColor('#4AD991') }} />,
          number: formatCurrency(res.data.totalRevenue),
          color: '#4AD991',
        },
        {
          name: 'Số đơn đang chờ',
          icon: <HistoryOutlined style={{ color: darkenColor('#FF9066') }} />,
          number: res.data.totalPendingOrder,
          color: '#FF9066',
        },
      ]);

      setChartData(
        res.data.revenueFor7Days.map((revenue) => ({
          ...revenue,
          dayOfWeek: DATEINAWEEK[revenue.dayOfWeek],
        })),
      );

      setReviews(res.data.reviews);
      setMaxPage(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const chartConfig = {
    datasets: [
      {
        label: 'Tổng doanh thu trong tuần',
        backgroundColor: 'rgba(45,156,219,0.2)',
        borderColor: 'rgba(45,156,219,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(45,156,219,0.4)',
        hoverBorderColor: 'rgba(45,156,219,1)',
        data: chartData,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    parsing: {
      xAxisKey: 'dayOfWeek',
      yAxisKey: 'totalRevenue',
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const data = context.dataset.data[context.dataIndex];
            return `Ngày: ${data.date}, Doanh thu: ${data.totalRevenue}`;
          },
        },
      },
    },
  };

  const tableColumns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
    },
    {
      title: 'Thứ',
      dataIndex: 'dayOfWeek',
    },
    {
      title: 'Số đơn hàng',
      dataIndex: 'orderCount',
      sorter: (a, b) => a.orderCount - b.orderCount,
    },
    {
      title: 'Doanh thu',
      dataIndex: 'totalRevenue',
      sorter: (a, b) => a.totalRevenue - b.totalRevenue,
    },
  ];

  const handleBackReview = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextReview = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <LoadingOverlay loading={loading} />
      <h3 className="admin-dashboard-title" style={{ color: darkenColor('#FF9066') }}>
        Thống kê
      </h3>
      {!loading && (
        <div>
          <div className="row">
            {boxHeaderData.map((data, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-12 p-0 d-flex justify-content-center">
                <BoxHeader data={data} />
              </div>
            ))}
          </div>
          <div className="row align-items-center admin-dashboard-center-content-container">
            <div className="col-lg-6 col-sm-12 admin-dashboard-chart-container">
              <div className="admin-dashboard-center-content-item">
                <h4 className="admin-dashboard-chart-title">Doanh thu trong tuần</h4>
                <Line key={loading} data={chartConfig} options={chartOptions} className="admin-dashboard-line-chart" />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 admin-dashboard-table-container">
              <div className="admin-dashboard-center-content-item">
                <h4 className="admin-dashboard-table-title">Doanh thu đơn hàng trong tuần</h4>
                <Table key={loading} columns={tableColumns} dataSource={chartData} pagination={false} />
              </div>
            </div>
          </div>
          <div className="admin-dashboard-review-container">
            <div className="d-flex justify-content-between">
              <h4 className="admin-dashboard-review-title" style={{ color: darkenColor('#FEC53D') }}>
                Đánh giá của khách hàng
              </h4>
              <div>
                <Button className="admin-dash-board-review-button" onClick={handleBackReview} icon={<LeftOutlined />} />
                <Button
                  className="admin-dash-board-review-button"
                  onClick={handleNextReview}
                  icon={<RightOutlined />}
                />
              </div>
            </div>
            <div className="row">
              {reviews.map((review, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-12 admin-dashboard-review-item-container">
                  <SmallReviewItem data={review} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
