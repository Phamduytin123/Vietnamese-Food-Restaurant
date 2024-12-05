import { Button, DatePicker, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, format, isAfter, isBefore, subMonths } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ORDERSTATUS, ORDERSTATUSCOLOR } from '../../../constants/enum';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { TruncateText } from '../../../utils/string';
import { FilterOutlined } from '@ant-design/icons';

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

function formatCurrency(amount) {
  const formattedAmount = amount.toLocaleString('vi-VN');
  return `${formattedAmount} đồng`;
}

function darkenColor(color, amount = 0.5) {
  let [r, g, b] = color.match(/\w\w/g).map((x) => parseInt(x, 16));

  r = Math.max(0, r - Math.round(255 * amount));
  g = Math.max(0, g - Math.round(255 * amount));
  b = Math.max(0, b - Math.round(255 * amount));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const StyledSelect = styled(Select)`
  .ant-select-selector {
    background-color: ${(props) => props.bgcolor} !important;
    color: ${(props) => props.color} !important;
  }
`;

function AdminOrderLists() {
  const [orders, setOrders] = useState([]);
  const [dateFilter, setDateFilter] = useState();
  const [statusFilter, setStatusFilter] = useState();

  const callAPI = async () => {
    setOrders([
      {
        id: 1,
        totalPrice: 190000,
        phoneNumber: '0905116391',
        receiver: 'Nguyen Van Dung',
        address: '111 Phan Thanh, Thac Gian, Da Nang',
        email: 'vandung1702@gmail.com',
        paymentMethod: 'cash',
        status: 'cancel',
        reasonCancel: '',
        note: '',
        accountId: 1,
        isPaid: false,
        paymentCode: null,
        voucherId: 1,
        createdAt: '2024-11-14T15:14:01.000Z',
        updatedAt: '2024-11-14T15:14:01.000Z',
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
        orderDetails: [
          {
            id: 1,
            itemSizeId: 1,
            price: 25,
            quantity: 2,
            orderId: 1,
            itemSize: {
              id: 1,
              price: 25,
              itemId: 1,
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
                ingredients: [
                  'rice flour',
                  'dried shrimp',
                  'scallion oil',
                  'fried onions',
                  'fish sauce',
                  'tapioca starch',
                ],
                unit: 'Plate',
                regional: 'Hue',
              },
              size: 'Small',
            },
          },
          {
            id: 2,
            itemSizeId: 4,
            price: 30,
            quantity: 2,
            orderId: 1,
            itemSize: {
              id: 4,
              price: 30,
              itemId: 2,
              item: {
                id: 2,
                discount: 0,
                calories: 160,
                fat: 3,
                carbohydrates: 32,
                protein: 6,
                cholesterol: 15,
                sodium: 250,
                fiber: 0,
                availability: 'in stock',
                rating: 5,
                isFood: true,
                isDeleted: false,
                categoryId: 1,
                createdAt: '2024-11-14T15:14:00.000Z',
                updatedAt: '2024-11-14T15:14:00.000Z',
                name: 'Banh Bot Loc',
                images: [
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077388/VietnameseFoodRestaurant/Food/banh_bot_loc/cxalpeqmfidm7qgwncws.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077389/VietnameseFoodRestaurant/Food/banh_bot_loc/fwvhfpidt0uksqmophr5.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077389/VietnameseFoodRestaurant/Food/banh_bot_loc/v4lmz9qzvvgslom1j3yq.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077390/VietnameseFoodRestaurant/Food/banh_bot_loc/faz5jswm2fs2o3mdhvcz.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077391/VietnameseFoodRestaurant/Food/banh_bot_loc/ceucdyq1pjorhubdqmem.jpg',
                ],
                description: 'Ban Bot Loc wrapped in banana leaves, chewy and soft with shrimp and pork filling.',
                ingredients: ['tapioca starch', 'shrimp', 'pork belly', 'fish sauce', 'green onions', 'banana leaves'],
                unit: 'Plate',
                regional: 'Hue',
              },
              size: 'Small',
            },
          },
          {
            id: 3,
            itemSizeId: 8,
            price: 40,
            quantity: 2,
            orderId: 1,
            itemSize: {
              id: 8,
              price: 40,
              itemId: 3,
              item: {
                id: 3,
                discount: 0,
                calories: 350,
                fat: 7,
                carbohydrates: 60,
                protein: 12,
                cholesterol: 25,
                sodium: 600,
                fiber: 3,
                availability: 'in stock',
                rating: 5,
                isFood: true,
                isDeleted: false,
                categoryId: 2,
                createdAt: '2024-11-14T15:14:00.000Z',
                updatedAt: '2024-11-14T15:14:00.000Z',
                name: 'Banh Canh',
                images: [
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077395/VietnameseFoodRestaurant/Food/banh_canh/wipyyff4biu7t6g1khwq.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077396/VietnameseFoodRestaurant/Food/banh_canh/bumcg9ykdgcunnppx4mh.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077396/VietnameseFoodRestaurant/Food/banh_canh/om4m58p2yoaltxsqe95k.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077397/VietnameseFoodRestaurant/Food/banh_canh/txpfl7zhjpwk7uni871r.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077397/VietnameseFoodRestaurant/Food/banh_canh/naz8rgmbp8zghcaae09b.jpg',
                ],
                description: 'Hue-style Banh Canh with thick noodles, sweet broth, served with shrimp and pork.',
                ingredients: ['rice flour', 'broth', 'shrimp', 'pork', 'green onions', 'raw vegetables'],
                unit: 'Bowl',
                regional: 'Quang Ngai',
              },
              size: 'Medium',
            },
          },
        ],
      },
      {
        id: 2,
        totalPrice: 190000,
        phoneNumber: '0905116391',
        receiver: 'Nguyen Van Dung',
        address: '111 Phan Thanh, Thac Gian, Da Nang',
        email: 'vandung1702@gmail.com',
        paymentMethod: 'cash',
        status: 'done',
        reasonCancel: '',
        note: '',
        accountId: 1,
        isPaid: false,
        paymentCode: null,
        voucherId: 2,
        createdAt: '2024-11-14T15:14:01.000Z',
        updatedAt: '2024-11-14T15:14:01.000Z',
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
        orderDetails: [
          {
            id: 4,
            itemSizeId: 1,
            price: 25,
            quantity: 2,
            orderId: 2,
            itemSize: {
              id: 1,
              price: 25,
              itemId: 1,
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
                ingredients: [
                  'rice flour',
                  'dried shrimp',
                  'scallion oil',
                  'fried onions',
                  'fish sauce',
                  'tapioca starch',
                ],
                unit: 'Plate',
                regional: 'Hue',
              },
              size: 'Small',
            },
          },
          {
            id: 5,
            itemSizeId: 4,
            price: 30,
            quantity: 2,
            orderId: 2,
            itemSize: {
              id: 4,
              price: 30,
              itemId: 2,
              item: {
                id: 2,
                discount: 0,
                calories: 160,
                fat: 3,
                carbohydrates: 32,
                protein: 6,
                cholesterol: 15,
                sodium: 250,
                fiber: 0,
                availability: 'in stock',
                rating: 5,
                isFood: true,
                isDeleted: false,
                categoryId: 1,
                createdAt: '2024-11-14T15:14:00.000Z',
                updatedAt: '2024-11-14T15:14:00.000Z',
                name: 'Banh Bot Loc',
                images: [
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077388/VietnameseFoodRestaurant/Food/banh_bot_loc/cxalpeqmfidm7qgwncws.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077389/VietnameseFoodRestaurant/Food/banh_bot_loc/fwvhfpidt0uksqmophr5.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077389/VietnameseFoodRestaurant/Food/banh_bot_loc/v4lmz9qzvvgslom1j3yq.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077390/VietnameseFoodRestaurant/Food/banh_bot_loc/faz5jswm2fs2o3mdhvcz.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077391/VietnameseFoodRestaurant/Food/banh_bot_loc/ceucdyq1pjorhubdqmem.jpg',
                ],
                description: 'Ban Bot Loc wrapped in banana leaves, chewy and soft with shrimp and pork filling.',
                ingredients: ['tapioca starch', 'shrimp', 'pork belly', 'fish sauce', 'green onions', 'banana leaves'],
                unit: 'Plate',
                regional: 'Hue',
              },
              size: 'Small',
            },
          },
          {
            id: 6,
            itemSizeId: 8,
            price: 40,
            quantity: 2,
            orderId: 2,
            itemSize: {
              id: 8,
              price: 40,
              itemId: 3,
              item: {
                id: 3,
                discount: 0,
                calories: 350,
                fat: 7,
                carbohydrates: 60,
                protein: 12,
                cholesterol: 25,
                sodium: 600,
                fiber: 3,
                availability: 'in stock',
                rating: 5,
                isFood: true,
                isDeleted: false,
                categoryId: 2,
                createdAt: '2024-11-14T15:14:00.000Z',
                updatedAt: '2024-11-14T15:14:00.000Z',
                name: 'Banh Canh',
                images: [
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077395/VietnameseFoodRestaurant/Food/banh_canh/wipyyff4biu7t6g1khwq.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077396/VietnameseFoodRestaurant/Food/banh_canh/bumcg9ykdgcunnppx4mh.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077396/VietnameseFoodRestaurant/Food/banh_canh/om4m58p2yoaltxsqe95k.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077397/VietnameseFoodRestaurant/Food/banh_canh/txpfl7zhjpwk7uni871r.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077397/VietnameseFoodRestaurant/Food/banh_canh/naz8rgmbp8zghcaae09b.jpg',
                ],
                description: 'Hue-style Banh Canh with thick noodles, sweet broth, served with shrimp and pork.',
                ingredients: ['rice flour', 'broth', 'shrimp', 'pork', 'green onions', 'raw vegetables'],
                unit: 'Bowl',
                regional: 'Quang Ngai',
              },
              size: 'Medium',
            },
          },
        ],
      },
      {
        id: 3,
        totalPrice: 190000,
        phoneNumber: '0905116391',
        receiver: 'Nguyen Van Dung',
        address: '111 Phan Thanh, Thac Gian, Da Nang',
        email: 'vandung1702@gmail.com',
        paymentMethod: 'cash',
        status: 'on the road',
        reasonCancel: '',
        note: '',
        accountId: 1,
        isPaid: false,
        paymentCode: null,
        voucherId: null,
        createdAt: '2024-11-14T15:14:01.000Z',
        updatedAt: '2024-11-14T15:14:01.000Z',
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
        orderDetails: [
          {
            id: 7,
            itemSizeId: 1,
            price: 25,
            quantity: 2,
            orderId: 3,
            itemSize: {
              id: 1,
              price: 25,
              itemId: 1,
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
                ingredients: [
                  'rice flour',
                  'dried shrimp',
                  'scallion oil',
                  'fried onions',
                  'fish sauce',
                  'tapioca starch',
                ],
                unit: 'Plate',
                regional: 'Hue',
              },
              size: 'Small',
            },
          },
          {
            id: 8,
            itemSizeId: 4,
            price: 30,
            quantity: 2,
            orderId: 3,
            itemSize: {
              id: 4,
              price: 30,
              itemId: 2,
              item: {
                id: 2,
                discount: 0,
                calories: 160,
                fat: 3,
                carbohydrates: 32,
                protein: 6,
                cholesterol: 15,
                sodium: 250,
                fiber: 0,
                availability: 'in stock',
                rating: 5,
                isFood: true,
                isDeleted: false,
                categoryId: 1,
                createdAt: '2024-11-14T15:14:00.000Z',
                updatedAt: '2024-11-14T15:14:00.000Z',
                name: 'Banh Bot Loc',
                images: [
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077388/VietnameseFoodRestaurant/Food/banh_bot_loc/cxalpeqmfidm7qgwncws.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077389/VietnameseFoodRestaurant/Food/banh_bot_loc/fwvhfpidt0uksqmophr5.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077389/VietnameseFoodRestaurant/Food/banh_bot_loc/v4lmz9qzvvgslom1j3yq.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077390/VietnameseFoodRestaurant/Food/banh_bot_loc/faz5jswm2fs2o3mdhvcz.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077391/VietnameseFoodRestaurant/Food/banh_bot_loc/ceucdyq1pjorhubdqmem.jpg',
                ],
                description: 'Ban Bot Loc wrapped in banana leaves, chewy and soft with shrimp and pork filling.',
                ingredients: ['tapioca starch', 'shrimp', 'pork belly', 'fish sauce', 'green onions', 'banana leaves'],
                unit: 'Plate',
                regional: 'Hue',
              },
              size: 'Small',
            },
          },
          {
            id: 9,
            itemSizeId: 8,
            price: 40,
            quantity: 2,
            orderId: 3,
            itemSize: {
              id: 8,
              price: 40,
              itemId: 3,
              item: {
                id: 3,
                discount: 0,
                calories: 350,
                fat: 7,
                carbohydrates: 60,
                protein: 12,
                cholesterol: 25,
                sodium: 600,
                fiber: 3,
                availability: 'in stock',
                rating: 5,
                isFood: true,
                isDeleted: false,
                categoryId: 2,
                createdAt: '2024-11-14T15:14:00.000Z',
                updatedAt: '2024-11-14T15:14:00.000Z',
                name: 'Banh Canh',
                images: [
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077395/VietnameseFoodRestaurant/Food/banh_canh/wipyyff4biu7t6g1khwq.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077396/VietnameseFoodRestaurant/Food/banh_canh/bumcg9ykdgcunnppx4mh.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077396/VietnameseFoodRestaurant/Food/banh_canh/om4m58p2yoaltxsqe95k.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077397/VietnameseFoodRestaurant/Food/banh_canh/txpfl7zhjpwk7uni871r.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077397/VietnameseFoodRestaurant/Food/banh_canh/naz8rgmbp8zghcaae09b.jpg',
                ],
                description: 'Hue-style Banh Canh with thick noodles, sweet broth, served with shrimp and pork.',
                ingredients: ['rice flour', 'broth', 'shrimp', 'pork', 'green onions', 'raw vegetables'],
                unit: 'Bowl',
                regional: 'Quang Ngai',
              },
              size: 'Medium',
            },
          },
        ],
      },
      {
        id: 4,
        totalPrice: 190000,
        phoneNumber: '0905116391',
        receiver: 'Nguyen Van Dung',
        address: '111 Phan Thanh, Thac Gian, Da Nang',
        email: 'vandung1702@gmail.com',
        paymentMethod: 'cash',
        status: 'packaging',
        reasonCancel: '',
        note: '',
        accountId: 1,
        isPaid: false,
        paymentCode: null,
        voucherId: 4,
        createdAt: '2024-11-14T15:14:01.000Z',
        updatedAt: '2024-11-14T15:14:01.000Z',
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
        orderDetails: [
          {
            id: 10,
            itemSizeId: 1,
            price: 25,
            quantity: 2,
            orderId: 4,
            itemSize: {
              id: 1,
              price: 25,
              itemId: 1,
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
                ingredients: [
                  'rice flour',
                  'dried shrimp',
                  'scallion oil',
                  'fried onions',
                  'fish sauce',
                  'tapioca starch',
                ],
                unit: 'Plate',
                regional: 'Hue',
              },
              size: 'Small',
            },
          },
          {
            id: 11,
            itemSizeId: 4,
            price: 30,
            quantity: 2,
            orderId: 4,
            itemSize: {
              id: 4,
              price: 30,
              itemId: 2,
              item: {
                id: 2,
                discount: 0,
                calories: 160,
                fat: 3,
                carbohydrates: 32,
                protein: 6,
                cholesterol: 15,
                sodium: 250,
                fiber: 0,
                availability: 'in stock',
                rating: 5,
                isFood: true,
                isDeleted: false,
                categoryId: 1,
                createdAt: '2024-11-14T15:14:00.000Z',
                updatedAt: '2024-11-14T15:14:00.000Z',
                name: 'Banh Bot Loc',
                images: [
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077388/VietnameseFoodRestaurant/Food/banh_bot_loc/cxalpeqmfidm7qgwncws.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077389/VietnameseFoodRestaurant/Food/banh_bot_loc/fwvhfpidt0uksqmophr5.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077389/VietnameseFoodRestaurant/Food/banh_bot_loc/v4lmz9qzvvgslom1j3yq.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077390/VietnameseFoodRestaurant/Food/banh_bot_loc/faz5jswm2fs2o3mdhvcz.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077391/VietnameseFoodRestaurant/Food/banh_bot_loc/ceucdyq1pjorhubdqmem.jpg',
                ],
                description: 'Ban Bot Loc wrapped in banana leaves, chewy and soft with shrimp and pork filling.',
                ingredients: ['tapioca starch', 'shrimp', 'pork belly', 'fish sauce', 'green onions', 'banana leaves'],
                unit: 'Plate',
                regional: 'Hue',
              },
              size: 'Small',
            },
          },
          {
            id: 12,
            itemSizeId: 8,
            price: 40,
            quantity: 2,
            orderId: 4,
            itemSize: {
              id: 8,
              price: 40,
              itemId: 3,
              item: {
                id: 3,
                discount: 0,
                calories: 350,
                fat: 7,
                carbohydrates: 60,
                protein: 12,
                cholesterol: 25,
                sodium: 600,
                fiber: 3,
                availability: 'in stock',
                rating: 5,
                isFood: true,
                isDeleted: false,
                categoryId: 2,
                createdAt: '2024-11-14T15:14:00.000Z',
                updatedAt: '2024-11-14T15:14:00.000Z',
                name: 'Banh Canh',
                images: [
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077395/VietnameseFoodRestaurant/Food/banh_canh/wipyyff4biu7t6g1khwq.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077396/VietnameseFoodRestaurant/Food/banh_canh/bumcg9ykdgcunnppx4mh.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077396/VietnameseFoodRestaurant/Food/banh_canh/om4m58p2yoaltxsqe95k.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077397/VietnameseFoodRestaurant/Food/banh_canh/txpfl7zhjpwk7uni871r.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077397/VietnameseFoodRestaurant/Food/banh_canh/naz8rgmbp8zghcaae09b.jpg',
                ],
                description: 'Hue-style Banh Canh with thick noodles, sweet broth, served with shrimp and pork.',
                ingredients: ['rice flour', 'broth', 'shrimp', 'pork', 'green onions', 'raw vegetables'],
                unit: 'Bowl',
                regional: 'Quang Ngai',
              },
              size: 'Medium',
            },
          },
        ],
      },
      {
        id: 5,
        totalPrice: 190000,
        phoneNumber: '0905116391',
        receiver: 'Nguyen Van Dung',
        address: '111 Phan Thanh, Thac Gian, Da Nang',
        email: 'vandung1702@gmail.com',
        paymentMethod: 'cash',
        status: 'received',
        reasonCancel: '',
        note: '',
        accountId: 1,
        isPaid: false,
        paymentCode: null,
        voucherId: 3,
        createdAt: '2024-11-14T15:14:01.000Z',
        updatedAt: '2024-11-14T15:14:01.000Z',
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
        orderDetails: [
          {
            id: 13,
            itemSizeId: 1,
            price: 25,
            quantity: 2,
            orderId: 5,
            itemSize: {
              id: 1,
              price: 25,
              itemId: 1,
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
                ingredients: [
                  'rice flour',
                  'dried shrimp',
                  'scallion oil',
                  'fried onions',
                  'fish sauce',
                  'tapioca starch',
                ],
                unit: 'Plate',
                regional: 'Hue',
              },
              size: 'Small',
            },
          },
          {
            id: 14,
            itemSizeId: 4,
            price: 30,
            quantity: 2,
            orderId: 5,
            itemSize: {
              id: 4,
              price: 30,
              itemId: 2,
              item: {
                id: 2,
                discount: 0,
                calories: 160,
                fat: 3,
                carbohydrates: 32,
                protein: 6,
                cholesterol: 15,
                sodium: 250,
                fiber: 0,
                availability: 'in stock',
                rating: 5,
                isFood: true,
                isDeleted: false,
                categoryId: 1,
                createdAt: '2024-11-14T15:14:00.000Z',
                updatedAt: '2024-11-14T15:14:00.000Z',
                name: 'Banh Bot Loc',
                images: [
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077388/VietnameseFoodRestaurant/Food/banh_bot_loc/cxalpeqmfidm7qgwncws.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077389/VietnameseFoodRestaurant/Food/banh_bot_loc/fwvhfpidt0uksqmophr5.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077389/VietnameseFoodRestaurant/Food/banh_bot_loc/v4lmz9qzvvgslom1j3yq.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077390/VietnameseFoodRestaurant/Food/banh_bot_loc/faz5jswm2fs2o3mdhvcz.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077391/VietnameseFoodRestaurant/Food/banh_bot_loc/ceucdyq1pjorhubdqmem.jpg',
                ],
                description: 'Ban Bot Loc wrapped in banana leaves, chewy and soft with shrimp and pork filling.',
                ingredients: ['tapioca starch', 'shrimp', 'pork belly', 'fish sauce', 'green onions', 'banana leaves'],
                unit: 'Plate',
                regional: 'Hue',
              },
              size: 'Small',
            },
          },
          {
            id: 15,
            itemSizeId: 8,
            price: 40,
            quantity: 2,
            orderId: 5,
            itemSize: {
              id: 8,
              price: 40,
              itemId: 3,
              item: {
                id: 3,
                discount: 0,
                calories: 350,
                fat: 7,
                carbohydrates: 60,
                protein: 12,
                cholesterol: 25,
                sodium: 600,
                fiber: 3,
                availability: 'in stock',
                rating: 5,
                isFood: true,
                isDeleted: false,
                categoryId: 2,
                createdAt: '2024-11-14T15:14:00.000Z',
                updatedAt: '2024-11-14T15:14:00.000Z',
                name: 'Banh Canh',
                images: [
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077395/VietnameseFoodRestaurant/Food/banh_canh/wipyyff4biu7t6g1khwq.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077396/VietnameseFoodRestaurant/Food/banh_canh/bumcg9ykdgcunnppx4mh.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077396/VietnameseFoodRestaurant/Food/banh_canh/om4m58p2yoaltxsqe95k.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077397/VietnameseFoodRestaurant/Food/banh_canh/txpfl7zhjpwk7uni871r.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077397/VietnameseFoodRestaurant/Food/banh_canh/naz8rgmbp8zghcaae09b.jpg',
                ],
                description: 'Hue-style Banh Canh with thick noodles, sweet broth, served with shrimp and pork.',
                ingredients: ['rice flour', 'broth', 'shrimp', 'pork', 'green onions', 'raw vegetables'],
                unit: 'Bowl',
                regional: 'Quang Ngai',
              },
              size: 'Medium',
            },
          },
        ],
      },
      {
        id: 6,
        totalPrice: 190000,
        phoneNumber: '0905116391',
        receiver: 'Nguyen Van Dung',
        address: '111 Phan Thanh, Thac Gian, Da Nang',
        email: 'vandung1702@gmail.com',
        paymentMethod: 'cash',
        status: 'wait',
        reasonCancel: '',
        note: '',
        accountId: 1,
        isPaid: false,
        paymentCode: null,
        voucherId: 2,
        createdAt: '2024-11-14T15:14:01.000Z',
        updatedAt: '2024-11-14T15:14:01.000Z',
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
        orderDetails: [
          {
            id: 16,
            itemSizeId: 1,
            price: 25,
            quantity: 2,
            orderId: 6,
            itemSize: {
              id: 1,
              price: 25,
              itemId: 1,
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
                ingredients: [
                  'rice flour',
                  'dried shrimp',
                  'scallion oil',
                  'fried onions',
                  'fish sauce',
                  'tapioca starch',
                ],
                unit: 'Plate',
                regional: 'Hue',
              },
              size: 'Small',
            },
          },
          {
            id: 17,
            itemSizeId: 4,
            price: 30,
            quantity: 2,
            orderId: 6,
            itemSize: {
              id: 4,
              price: 30,
              itemId: 2,
              item: {
                id: 2,
                discount: 0,
                calories: 160,
                fat: 3,
                carbohydrates: 32,
                protein: 6,
                cholesterol: 15,
                sodium: 250,
                fiber: 0,
                availability: 'in stock',
                rating: 5,
                isFood: true,
                isDeleted: false,
                categoryId: 1,
                createdAt: '2024-11-14T15:14:00.000Z',
                updatedAt: '2024-11-14T15:14:00.000Z',
                name: 'Banh Bot Loc',
                images: [
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077388/VietnameseFoodRestaurant/Food/banh_bot_loc/cxalpeqmfidm7qgwncws.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077389/VietnameseFoodRestaurant/Food/banh_bot_loc/fwvhfpidt0uksqmophr5.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077389/VietnameseFoodRestaurant/Food/banh_bot_loc/v4lmz9qzvvgslom1j3yq.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077390/VietnameseFoodRestaurant/Food/banh_bot_loc/faz5jswm2fs2o3mdhvcz.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077391/VietnameseFoodRestaurant/Food/banh_bot_loc/ceucdyq1pjorhubdqmem.jpg',
                ],
                description: 'Ban Bot Loc wrapped in banana leaves, chewy and soft with shrimp and pork filling.',
                ingredients: ['tapioca starch', 'shrimp', 'pork belly', 'fish sauce', 'green onions', 'banana leaves'],
                unit: 'Plate',
                regional: 'Hue',
              },
              size: 'Small',
            },
          },
          {
            id: 18,
            itemSizeId: 8,
            price: 40,
            quantity: 2,
            orderId: 6,
            itemSize: {
              id: 8,
              price: 40,
              itemId: 3,
              item: {
                id: 3,
                discount: 0,
                calories: 350,
                fat: 7,
                carbohydrates: 60,
                protein: 12,
                cholesterol: 25,
                sodium: 600,
                fiber: 3,
                availability: 'in stock',
                rating: 5,
                isFood: true,
                isDeleted: false,
                categoryId: 2,
                createdAt: '2024-11-14T15:14:00.000Z',
                updatedAt: '2024-11-14T15:14:00.000Z',
                name: 'Banh Canh',
                images: [
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077395/VietnameseFoodRestaurant/Food/banh_canh/wipyyff4biu7t6g1khwq.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077396/VietnameseFoodRestaurant/Food/banh_canh/bumcg9ykdgcunnppx4mh.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077396/VietnameseFoodRestaurant/Food/banh_canh/om4m58p2yoaltxsqe95k.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077397/VietnameseFoodRestaurant/Food/banh_canh/txpfl7zhjpwk7uni871r.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077397/VietnameseFoodRestaurant/Food/banh_canh/naz8rgmbp8zghcaae09b.jpg',
                ],
                description: 'Hue-style Banh Canh with thick noodles, sweet broth, served with shrimp and pork.',
                ingredients: ['rice flour', 'broth', 'shrimp', 'pork', 'green onions', 'raw vegetables'],
                unit: 'Bowl',
                regional: 'Quang Ngai',
              },
              size: 'Medium',
            },
          },
        ],
      },
      {
        id: 8,
        totalPrice: 190000,
        phoneNumber: '0905116391',
        receiver: 'Nguyen Van Dung',
        address: '111 Phan Thanh, Thac Gian, Da Nang',
        email: 'vandung1702@gmail.com',
        paymentMethod: 'cash',
        status: 'wait',
        reasonCancel: '',
        note: '',
        accountId: 1,
        isPaid: false,
        paymentCode: null,
        voucherId: 2,
        createdAt: '2024-11-14T15:14:01.000Z',
        updatedAt: '2024-11-14T15:14:01.000Z',
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
        orderDetails: [
          {
            id: 16,
            itemSizeId: 1,
            price: 25,
            quantity: 2,
            orderId: 6,
            itemSize: {
              id: 1,
              price: 25,
              itemId: 1,
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
                ingredients: [
                  'rice flour',
                  'dried shrimp',
                  'scallion oil',
                  'fried onions',
                  'fish sauce',
                  'tapioca starch',
                ],
                unit: 'Plate',
                regional: 'Hue',
              },
              size: 'Small',
            },
          },
          {
            id: 17,
            itemSizeId: 4,
            price: 30,
            quantity: 2,
            orderId: 6,
            itemSize: {
              id: 4,
              price: 30,
              itemId: 2,
              item: {
                id: 2,
                discount: 0,
                calories: 160,
                fat: 3,
                carbohydrates: 32,
                protein: 6,
                cholesterol: 15,
                sodium: 250,
                fiber: 0,
                availability: 'in stock',
                rating: 5,
                isFood: true,
                isDeleted: false,
                categoryId: 1,
                createdAt: '2024-11-14T15:14:00.000Z',
                updatedAt: '2024-11-14T15:14:00.000Z',
                name: 'Banh Bot Loc',
                images: [
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077388/VietnameseFoodRestaurant/Food/banh_bot_loc/cxalpeqmfidm7qgwncws.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077389/VietnameseFoodRestaurant/Food/banh_bot_loc/fwvhfpidt0uksqmophr5.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077389/VietnameseFoodRestaurant/Food/banh_bot_loc/v4lmz9qzvvgslom1j3yq.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077390/VietnameseFoodRestaurant/Food/banh_bot_loc/faz5jswm2fs2o3mdhvcz.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077391/VietnameseFoodRestaurant/Food/banh_bot_loc/ceucdyq1pjorhubdqmem.jpg',
                ],
                description: 'Ban Bot Loc wrapped in banana leaves, chewy and soft with shrimp and pork filling.',
                ingredients: ['tapioca starch', 'shrimp', 'pork belly', 'fish sauce', 'green onions', 'banana leaves'],
                unit: 'Plate',
                regional: 'Hue',
              },
              size: 'Small',
            },
          },
          {
            id: 18,
            itemSizeId: 8,
            price: 40,
            quantity: 2,
            orderId: 6,
            itemSize: {
              id: 8,
              price: 40,
              itemId: 3,
              item: {
                id: 3,
                discount: 0,
                calories: 350,
                fat: 7,
                carbohydrates: 60,
                protein: 12,
                cholesterol: 25,
                sodium: 600,
                fiber: 3,
                availability: 'in stock',
                rating: 5,
                isFood: true,
                isDeleted: false,
                categoryId: 2,
                createdAt: '2024-11-14T15:14:00.000Z',
                updatedAt: '2024-11-14T15:14:00.000Z',
                name: 'Banh Canh',
                images: [
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077395/VietnameseFoodRestaurant/Food/banh_canh/wipyyff4biu7t6g1khwq.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077396/VietnameseFoodRestaurant/Food/banh_canh/bumcg9ykdgcunnppx4mh.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077396/VietnameseFoodRestaurant/Food/banh_canh/om4m58p2yoaltxsqe95k.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077397/VietnameseFoodRestaurant/Food/banh_canh/txpfl7zhjpwk7uni871r.jpg',
                  'https://res.cloudinary.com/deei5izfg/image/upload/v1727077397/VietnameseFoodRestaurant/Food/banh_canh/naz8rgmbp8zghcaae09b.jpg',
                ],
                description: 'Hue-style Banh Canh with thick noodles, sweet broth, served with shrimp and pork.',
                ingredients: ['rice flour', 'broth', 'shrimp', 'pork', 'green onions', 'raw vegetables'],
                unit: 'Bowl',
                regional: 'Quang Ngai',
              },
              size: 'Medium',
            },
          },
        ],
      },
    ]);
  };

  useEffect(() => {
    callAPI();
  }, []);

  const onChangeDateFilter = (date, dateString) => {
    console.log(date, dateString);
    setDateFilter(date);
  };

  const onChangeStatusFilter = (value)=>{
    setStatusFilter(value)
  }

  const handleStatusChange = async (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
    );
  };



  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: 'account',
      key: 'account',
      render: (account) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={account.avatar}
            alt={account.name}
            style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }}
          />
          <span>{account.name}</span>
        </div>
      ),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (address) => {
        return <p>{TruncateText(address, 30)}</p>;
      },
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => {
        return <p>{formatTime(createdAt)}</p>;
      },
      sorter: {
        compare: (a, b) => a.createdAt - b.createdAt,
        multiple: 1,
      },
    },
    {
      title: 'Món ăn',
      dataIndex: 'orderDetails',
      key: 'orderDetails',
      render: (orderDetails) => {
        const result = orderDetails.reduce((acc, orderDetail, index) => {
          const detail = `${orderDetail.itemSize.item.name}(${orderDetail.itemSize.size})`;
          return acc + (index > 0 ? ', ' : '') + detail; // Thêm dấu phẩy giữa các phần tử
        }, '');

        return <p>{TruncateText(result, 50)}</p>;
      },
    },
    {
      title: 'Số tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => {
        return <p>{formatCurrency(totalPrice)}</p>;
      },
      sorter: {
        compare: (a, b) => a.totalPrice - b.totalPrice,
        multiple: 2,
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => {
        const backgroundColor = ORDERSTATUSCOLOR[status];
        const textColor = darkenColor(ORDERSTATUSCOLOR[status], 0.5);

        return (
          <StyledSelect
            defaultValue={status}
            bgcolor={backgroundColor}
            color={textColor}
            style={{ width: 180 }}
            onChange={(value) => handleStatusChange(record.id, value)}
          >
            {Object.keys(ORDERSTATUS).map((key) => (
              <Select.Option
                key={key}
                value={key}
                style={{
                  background: ORDERSTATUSCOLOR[key],
                  color: darkenColor(ORDERSTATUSCOLOR[key], 0.5),
                }}
              >
                {ORDERSTATUS[key]}
              </Select.Option>
            ))}
          </StyledSelect>
        );
      },
    },
  ];

  return (
    <div className="admin-order-container">
      <h3 className="admin-order-title">Danh sách đơn hàng</h3>
      <div className="d-flex">
        <div>
          <FilterOutlined />
        </div>
        <div>Sắp xếp theo</div>
        <div>
          <DatePicker value={dateFilter} onChange={onChangeDateFilter} placeholder='Chọn ngày' />
        </div>
        <div>
          <StyledSelect
            value={statusFilter}
            bgcolor={statusFilter ?  ORDERSTATUSCOLOR[statusFilter] : null}
            color={statusFilter ?  darkenColor(ORDERSTATUSCOLOR[statusFilter], 0.5) : null}
            style={{ width: 180 }}
            onChange={onChangeStatusFilter}
            placeholder="Chọn trạng thái của bạn"
          >
            {Object.keys(ORDERSTATUS).map((key) => (
              <Select.Option
                key={key}
                value={key}
                style={{
                  background: ORDERSTATUSCOLOR[key],
                  color: darkenColor(ORDERSTATUSCOLOR[key], 0.5),
                }}
              >
                {ORDERSTATUS[key]}
              </Select.Option>
            ))}
          </StyledSelect>
        </div>
        <div>
          <Button>
            
          </Button>
        </div>
      </div>
      <div className="admin-order-table-container">
        <Table dataSource={orders} columns={columns} style={{ width: '100%' }} />
      </div>
    </div>
  );
}

export default AdminOrderLists;
