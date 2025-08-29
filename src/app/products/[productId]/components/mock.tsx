const mockReviews = [
  {
    id: 1900,
    rating: 5,
    content: '내가 달은 리뷰 여부?는 어디에서 확인하나요2',
    likeCount: 0,
    createdAt: '2025-08-20T07:55:50.261Z',
    updatedAt: '2025-08-20T07:55:50.261Z',
    userId: 828,
    productId: 1,
    user: {
      id: 828,
      nickname: '오리너구리',
      image: null,
    },
    reviewImages: [
      {
        id: 1902,
        source: '',
      },
    ],
    isLiked: false,
  },
  {
    id: 1899,
    rating: 5,
    content: '내가 달은 리뷰 여부?는 어디에서 확인하나요',
    likeCount: 0,
    createdAt: '2025-08-20T07:55:06.619Z',
    updatedAt: '2025-08-20T07:55:06.619Z',
    userId: 828,
    productId: 1,
    user: {
      id: 828,
      nickname: '오리너구리',
      image: null,
    },
    reviewImages: [
      {
        id: 1901,
        source: '',
      },
    ],
    isLiked: false,
  },
  {
    id: 1617,
    rating: 5,
    content: 'string',
    likeCount: 0,
    createdAt: '2025-06-03T11:05:29.311Z',
    updatedAt: '2025-06-03T11:05:29.311Z',
    userId: 793,
    productId: 1,
    user: {
      id: 793,
      nickname: '라몽이',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/793/1750506930506/adsf.jpg',
    },
    reviewImages: [
      {
        id: 1842,
        source: '',
      },
    ],
    isLiked: false,
  },
  {
    id: 1548,
    rating: 5,
    content: 'string',
    likeCount: 0,
    createdAt: '2025-05-23T15:46:38.768Z',
    updatedAt: '2025-05-23T15:46:38.768Z',
    userId: 768,
    productId: 1,
    user: {
      id: 768,
      nickname: 'test1111111',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/768/1748181882461/testImage.jpg',
    },
    reviewImages: [
      {
        id: 1777,
        source: '',
      },
    ],
    isLiked: false,
  },
  {
    id: 1511,
    rating: 3,
    content: 'ninja pached',
    likeCount: 0,
    createdAt: '2024-12-12T23:12:22.238Z',
    updatedAt: '2024-12-12T23:15:40.474Z',
    userId: 727,
    productId: 1,
    user: {
      id: 727,
      nickname: '오룡부',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/727/1734008273637/%C3%AC%C2%8A%C2%A4%C3%AD%C2%81%C2%AC%C3%AB%C2%A6%C2%B0%C3%AC%C2%83%C2%B7%202024-07-27%20122548.png',
    },
    reviewImages: [
      {
        id: 1698,
        source:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/727/1734008273637/%C3%AC%C2%8A%C2%A4%C3%AD%C2%81%C2%AC%C3%AB%C2%A6%C2%B0%C3%AC%C2%83%C2%B7%202024-07-27%20122548.png',
      },
      {
        id: 1699,
        source:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/727/1734008273637/%C3%AC%C2%8A%C2%A4%C3%AD%C2%81%C2%AC%C3%AB%C2%A6%C2%B0%C3%AC%C2%83%C2%B7%202024-07-27%20122548.png',
      },
    ],
    isLiked: false,
  },
  {
    id: 1184,
    rating: 5,
    content: '쿠쿠쿠쿠쿠쿠쿠쿠쿠쿠',
    likeCount: 0,
    createdAt: '2024-07-20T19:24:20.906Z',
    updatedAt: '2024-07-20T19:24:20.906Z',
    userId: 313,
    productId: 1,
    user: {
      id: 313,
      nickname: '고양 고양 고양',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/313/1722479060668/cat1.jpg',
    },
    reviewImages: [
      {
        id: 1303,
        source: '',
      },
    ],
    isLiked: false,
  },
  {
    id: 1183,
    rating: 5,
    content: '라라라라라라라',
    likeCount: 0,
    createdAt: '2024-07-20T19:24:15.711Z',
    updatedAt: '2024-07-20T19:24:15.711Z',
    userId: 313,
    productId: 1,
    user: {
      id: 313,
      nickname: '고양 고양 고양',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/313/1722479060668/cat1.jpg',
    },
    reviewImages: [
      {
        id: 1302,
        source: '',
      },
    ],
    isLiked: false,
  },
  {
    id: 1182,
    rating: 5,
    content: '후후후후후후',
    likeCount: 0,
    createdAt: '2024-07-20T19:24:09.631Z',
    updatedAt: '2024-07-20T19:24:09.631Z',
    userId: 313,
    productId: 1,
    user: {
      id: 313,
      nickname: '고양 고양 고양',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/313/1722479060668/cat1.jpg',
    },
    reviewImages: [
      {
        id: 1301,
        source: '',
      },
    ],
    isLiked: false,
  },
  {
    id: 1181,
    rating: 5,
    content: '하하하하하',
    likeCount: 0,
    createdAt: '2024-07-20T19:24:04.240Z',
    updatedAt: '2024-07-20T19:24:04.240Z',
    userId: 313,
    productId: 1,
    user: {
      id: 313,
      nickname: '고양 고양 고양',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/313/1722479060668/cat1.jpg',
    },
    reviewImages: [
      {
        id: 1300,
        source: '',
      },
    ],
    isLiked: false,
  },
  {
    id: 1100,
    rating: 5,
    content: '무한스크롤4asdads',
    likeCount: 1,
    createdAt: '2024-07-17T14:47:28.852Z',
    updatedAt: '2024-07-19T21:38:23.947Z',
    userId: 275,
    productId: 1,
    user: {
      id: 275,
      nickname: '이진욱',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/275/1722836583807/imaged.png',
    },
    reviewImages: [
      {
        id: 1256,
        source:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/275/1721425100973/testttt.png',
      },
    ],
    isLiked: false,
  },
  {
    id: 1098,
    rating: 5,
    content: '무한스크롤2asdads',
    likeCount: 1,
    createdAt: '2024-07-17T14:47:24.453Z',
    updatedAt: '2024-07-19T21:25:29.054Z',
    userId: 275,
    productId: 1,
    user: {
      id: 275,
      nickname: '이진욱',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/275/1722836583807/imaged.png',
    },
    reviewImages: [
      {
        id: 1248,
        source:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/275/1721424322083/testttt.png',
      },
    ],
    isLiked: false,
  },
  {
    id: 1097,
    rating: 5,
    content: '무한스크롤1asdasdasd',
    likeCount: 0,
    createdAt: '2024-07-17T14:47:20.556Z',
    updatedAt: '2024-07-19T21:42:52.979Z',
    userId: 275,
    productId: 1,
    user: {
      id: 275,
      nickname: '이진욱',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/275/1722836583807/imaged.png',
    },
    reviewImages: [
      {
        id: 1257,
        source:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/275/1721425370566/testttt.png',
      },
    ],
    isLiked: false,
  },
];

export default mockReviews;
