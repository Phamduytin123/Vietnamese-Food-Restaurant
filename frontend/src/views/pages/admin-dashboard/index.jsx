import React from 'react';
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
Chart.register(...registerables);

function darkenColor(color, amount = 0.5) {
  let [r, g, b] = color.match(/\w\w/g).map((x) => parseInt(x, 16));

  r = Math.max(0, r - Math.round(255 * amount));
  g = Math.max(0, g - Math.round(255 * amount));
  b = Math.max(0, b - Math.round(255 * amount));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function AdminDashboard() {
  const boxHeaderData = [
    {
      name: 'Số khách hàng',
      icon: <TeamOutlined style={{ color: darkenColor('#8280FF') }} />,
      number: 4,
      color: '#8280FF',
    },
    {
      name: 'Số đơn hàng',
      icon: <InboxOutlined style={{ color: darkenColor('#FEC53D') }} />,
      number: 21,
      color: '#FEC53D',
    },
    {
      name: 'Tổng doanh thu',
      icon: <LineChartOutlined style={{ color: darkenColor('#4AD991') }} />,
      number: 21,
      color: '#4AD991',
    },
    {
      name: 'Số đơn đang chờ',
      icon: <HistoryOutlined style={{ color: darkenColor('#FF9066') }} />,
      number: 18,
      color: '#FF9066',
    },
  ];

  const chartData = [
    {
      date: '2024-12-02',
      orderCount: 0,
      totalRevenue: 0,
      dayOfWeek: 'Monday',
    },
    {
      date: '2024-12-03',
      orderCount: 0,
      totalRevenue: 0,
      dayOfWeek: 'Tuesday',
    },
    {
      date: '2024-12-04',
      orderCount: 0,
      totalRevenue: 2000,
      dayOfWeek: 'Wednesday',
    },
    {
      date: '2024-12-05',
      orderCount: 0,
      totalRevenue: 0,
      dayOfWeek: 'Thursday',
    },
    {
      date: '2024-12-06',
      orderCount: 0,
      totalRevenue: 0,
      dayOfWeek: 'Friday',
    },
    {
      date: '2024-12-07',
      orderCount: 0,
      totalRevenue: 0,
      dayOfWeek: 'Saturday',
    },
    {
      date: '2024-12-08',
      orderCount: 0,
      totalRevenue: 0,
      dayOfWeek: 'Sunday',
    },
  ];

  const data = {
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

  const options = {
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

  const columns = [
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
      sorter: {
        compare: (a, b) => a.orderCount - b.orderCount,
        multiple: 1,
      },
    },
    {
      title: 'Doanh thu',
      dataIndex: 'totalRevenue',
      sorter: {
        compare: (a, b) => a.totalRevenue - b.totalRevenue,
        multiple: 1,
      },
    },
  ];

  const reviews = [
    {
      id: 5,
      rating: 4,
      comment:
        'Amitto error viduo callide acidus tempora abundans cenaculum theatrum comis. Eveniet a praesentium pectus vetus complectus. Absum caput non adulatio. Tardus talus adulatio voluptate thermae venustas aegrotatio verumtamen thermae.',
      itemId: 1,
      accountId: 1,
      createdAt: '2024-11-14T15:14:00.000Z',
      updatedAt: '2024-11-14T15:14:00.000Z',
      account: {
        id: 1,
        name: 'Nguyen Van Dung',
        displayName: 'NVDung',
        address: '111 Phan Thanh, Thac Gian, Thanh Khe, Da Nang',
        email: 'dung@gmail.com',
        tel: '1234567890',
        avatar:
          'https://res.cloudinary.com/deei5izfg/image/upload/f_auto,q_auto/v1/VietnameseFoodRestaurant/skohr4qgffuyanefqy91',
        gender: 'male',
        password: '$2b$10$IHvnNax2OMgPgMLSw.LAMOEe4uV94ibA6P9hmyCHS4tP9ee36jRWa',
        role: 'customer',
        isActive: true,
        createdAt: '2024-11-14T15:14:00.000Z',
        updatedAt: '2024-11-14T15:14:00.000Z',
      },
      item: {
        id: 1,
        discount: 10,
        calories: 120,
        fat: 5,
        carbohydrates: 18,
        protein: 3,
        cholesterol: 10,
        sodium: 200,
        fiber: 1,
        availability: 'in stock',
        rating: 5,
        isFood: true,
        isDeleted: false,
        categoryId: 1,
        createdAt: '2024-11-14T15:14:00.000Z',
        updatedAt: '2024-11-14T15:14:00.000Z',
        name: 'Banh Beo',
        images: [
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077384/VietnameseFoodRestaurant/Food/banh_beo/vgmg2pc2bxlgocctobrp.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077385/VietnameseFoodRestaurant/Food/banh_beo/xi5kxjvj2ffsf26phdev.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077386/VietnameseFoodRestaurant/Food/banh_beo/e2tymgxdhfpeoi3ai1sp.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077386/VietnameseFoodRestaurant/Food/banh_beo/ha4uy5uculwkoztnyzz6.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077387/VietnameseFoodRestaurant/Food/banh_beo/qqlktgj2wolhww0adfj8.jpg',
        ],
        description: 'Traditional Hue rice cake with dried shrimp, scallion oil and soft rice flour cake.',
        ingredients: ['rice flour', 'dried shrimp', 'scallion oil', 'fried onions', 'fish sauce', 'tapioca starch'],
        unit: 'Plate',
        regional: 'Hue',
      },
    },
    {
      id: 6,
      rating: 1,
      comment:
        'Atrocitas esse vitae decens vitae talus aestivus bardus. Tui consequatur desolo trucido amplus. Contabesco vilis architecto defendo tunc.',
      itemId: 1,
      accountId: 1,
      createdAt: '2024-11-14T15:14:00.000Z',
      updatedAt: '2024-11-14T15:14:00.000Z',
      account: {
        id: 1,
        name: 'Nguyen Van Dung',
        displayName: 'NVDung',
        address: '111 Phan Thanh, Thac Gian, Thanh Khe, Da Nang',
        email: 'dung@gmail.com',
        tel: '1234567890',
        avatar:
          'https://res.cloudinary.com/deei5izfg/image/upload/f_auto,q_auto/v1/VietnameseFoodRestaurant/skohr4qgffuyanefqy91',
        gender: 'male',
        password: '$2b$10$IHvnNax2OMgPgMLSw.LAMOEe4uV94ibA6P9hmyCHS4tP9ee36jRWa',
        role: 'customer',
        isActive: true,
        createdAt: '2024-11-14T15:14:00.000Z',
        updatedAt: '2024-11-14T15:14:00.000Z',
      },
      item: {
        id: 1,
        discount: 10,
        calories: 120,
        fat: 5,
        carbohydrates: 18,
        protein: 3,
        cholesterol: 10,
        sodium: 200,
        fiber: 1,
        availability: 'in stock',
        rating: 5,
        isFood: true,
        isDeleted: false,
        categoryId: 1,
        createdAt: '2024-11-14T15:14:00.000Z',
        updatedAt: '2024-11-14T15:14:00.000Z',
        name: 'Banh Beo',
        images: [
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077384/VietnameseFoodRestaurant/Food/banh_beo/vgmg2pc2bxlgocctobrp.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077385/VietnameseFoodRestaurant/Food/banh_beo/xi5kxjvj2ffsf26phdev.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077386/VietnameseFoodRestaurant/Food/banh_beo/e2tymgxdhfpeoi3ai1sp.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077386/VietnameseFoodRestaurant/Food/banh_beo/ha4uy5uculwkoztnyzz6.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077387/VietnameseFoodRestaurant/Food/banh_beo/qqlktgj2wolhww0adfj8.jpg',
        ],
        description: 'Traditional Hue rice cake with dried shrimp, scallion oil and soft rice flour cake.',
        ingredients: ['rice flour', 'dried shrimp', 'scallion oil', 'fried onions', 'fish sauce', 'tapioca starch'],
        unit: 'Plate',
        regional: 'Hue',
      },
    },
    {
      id: 7,
      rating: 1,
      comment:
        'Amor tabgo tollo capillus veritas cimentarius comprehendo illum carcer. Spes verbera tum velut pecto. Ex fuga sol conqueror delibero maxime adipisci condico eius arbustum. Conqueror inflammatio expedita bellicus avaritia blandior concido. Amor truculente',
      itemId: 1,
      accountId: 3,
      createdAt: '2024-11-14T15:14:00.000Z',
      updatedAt: '2024-11-14T15:14:00.000Z',
      account: {
        id: 3,
        name: 'Tran Thi B',
        displayName: 'TTB',
        address: '333 Nguyen Van Troi, Thanh Khe, Da Nang',
        email: 'ttb@gmail.com',
        tel: '0912345678',
        avatar:
          'https://res.cloudinary.com/deei5izfg/image/upload/f_auto,q_auto/v1/VietnameseFoodRestaurant/skohr4qgffuyanefqy91',
        gender: 'female',
        password: '$2b$10$5HUjH2lXcfv7yeqtqdRfwOvOyN0spIJFUknvmEQ0SDfrCjFDcKH46',
        role: 'customer',
        isActive: true,
        createdAt: '2024-11-14T15:14:00.000Z',
        updatedAt: '2024-11-14T15:14:00.000Z',
      },
      item: {
        id: 1,
        discount: 10,
        calories: 120,
        fat: 5,
        carbohydrates: 18,
        protein: 3,
        cholesterol: 10,
        sodium: 200,
        fiber: 1,
        availability: 'in stock',
        rating: 5,
        isFood: true,
        isDeleted: false,
        categoryId: 1,
        createdAt: '2024-11-14T15:14:00.000Z',
        updatedAt: '2024-11-14T15:14:00.000Z',
        name: 'Banh Beo',
        images: [
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077384/VietnameseFoodRestaurant/Food/banh_beo/vgmg2pc2bxlgocctobrp.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077385/VietnameseFoodRestaurant/Food/banh_beo/xi5kxjvj2ffsf26phdev.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077386/VietnameseFoodRestaurant/Food/banh_beo/e2tymgxdhfpeoi3ai1sp.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077386/VietnameseFoodRestaurant/Food/banh_beo/ha4uy5uculwkoztnyzz6.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077387/VietnameseFoodRestaurant/Food/banh_beo/qqlktgj2wolhww0adfj8.jpg',
        ],
        description: 'Traditional Hue rice cake with dried shrimp, scallion oil and soft rice flour cake.',
        ingredients: ['rice flour', 'dried shrimp', 'scallion oil', 'fried onions', 'fish sauce', 'tapioca starch'],
        unit: 'Plate',
        regional: 'Hue',
      },
    },
    {
      id: 8,
      rating: 5,
      comment:
        'Varius terra corrigo cuius. Culpa comitatus quo. Capitulus arbor sopor tyrannus conservo centum velut. Verecundia laboriosam desidero textilis exercitationem volutabrum commemoro sumptus certe eveniet. Ascit cognatus vomica ancilla viridis toties tergo v',
      itemId: 1,
      accountId: 2,
      createdAt: '2024-11-14T15:14:00.000Z',
      updatedAt: '2024-11-14T15:14:00.000Z',
      account: {
        id: 2,
        name: 'Nguyen Van A',
        displayName: 'NVA',
        address: '222 Le Duan, Hai Chau, Da Nang',
        email: 'nva@gmail.com',
        tel: '0987654321',
        avatar:
          'https://res.cloudinary.com/deei5izfg/image/upload/f_auto,q_auto/v1/VietnameseFoodRestaurant/skohr4qgffuyanefqy91',
        gender: 'male',
        password: '$2b$10$hRGJzS3XjXYuGtJV8qtQDOfOuboH5CS4JuK77lZ3gVkXfeKdp/EjG',
        role: 'customer',
        isActive: true,
        createdAt: '2024-11-14T15:14:00.000Z',
        updatedAt: '2024-11-14T15:14:00.000Z',
      },
      item: {
        id: 1,
        discount: 10,
        calories: 120,
        fat: 5,
        carbohydrates: 18,
        protein: 3,
        cholesterol: 10,
        sodium: 200,
        fiber: 1,
        availability: 'in stock',
        rating: 5,
        isFood: true,
        isDeleted: false,
        categoryId: 1,
        createdAt: '2024-11-14T15:14:00.000Z',
        updatedAt: '2024-11-14T15:14:00.000Z',
        name: 'Banh Beo',
        images: [
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077384/VietnameseFoodRestaurant/Food/banh_beo/vgmg2pc2bxlgocctobrp.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077385/VietnameseFoodRestaurant/Food/banh_beo/xi5kxjvj2ffsf26phdev.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077386/VietnameseFoodRestaurant/Food/banh_beo/e2tymgxdhfpeoi3ai1sp.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077386/VietnameseFoodRestaurant/Food/banh_beo/ha4uy5uculwkoztnyzz6.jpg',
          'https://res.cloudinary.com/deei5izfg/image/upload/v1727077387/VietnameseFoodRestaurant/Food/banh_beo/qqlktgj2wolhww0adfj8.jpg',
        ],
        description: 'Traditional Hue rice cake with dried shrimp, scallion oil and soft rice flour cake.',
        ingredients: ['rice flour', 'dried shrimp', 'scallion oil', 'fried onions', 'fish sauce', 'tapioca starch'],
        unit: 'Plate',
        regional: 'Hue',
      },
    },
  ];

  const onBackReview = () => {
    console.log('back');
  };

  const onNextReview = () => {
    console.log('next');
  };

  return (
    <div className="admin-dashboard-container">
      <h3 className="admin-dashboard-title" style={{ color: darkenColor('#FF9066') }}>
        Thống kê
      </h3>
      <div className="row">
        {boxHeaderData.map((data) => (
          <div className="col-lg-3 col-md-6 col-sm-12 p-0 d-flex justify-content-center">
            {<BoxHeader data={data} />}
          </div>
        ))}
      </div>
      <div className="row align-items-center admin-dashboard-center-content-container">
        <div className="col-lg-6 col-sm-12 admin-dashboard-chart-container">
          <div className="admin-dashboard-center-content-item">
            <h4 className="admin-dashboard-chart-title">Doanh thu trong tuần</h4>
            <Line data={data} options={options} className="admin-dashboard-line-chart" />
          </div>
        </div>
        <div className="col-lg-6 col-sm-12 admin-dashboard-table-container">
          <div className="admin-dashboard-center-content-item">
            <h4 className="admin-dashboard-table-title">Doanh thu đơn hàng trong tuần</h4>
            <Table columns={columns} dataSource={chartData} pagination={false} />
          </div>
        </div>
      </div>
      <div className="admin-dashboard-review-container">
        <div className="d-flex justify-content-between">
          <h4 className="admin-dashboard-review-title" style={{ color: darkenColor('#FEC53D') }}>
            Đánh giá của khách hàng
          </h4>
          <div>
            <Button className="admin-dash-board-review-button" onClick={onBackReview} icon={<LeftOutlined />} />
            <Button className="admin-dash-board-review-button" onClick={onNextReview} icon={<RightOutlined />} />
          </div>
        </div>
        <div className="row">
          {reviews.map((review) => (
            <div className="col-lg-3 col-md-6 col-sm-12 admin-dashboard-review-item-container">
              <SmallReviewItem data={review} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
