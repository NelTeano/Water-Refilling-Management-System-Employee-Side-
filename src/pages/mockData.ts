// mockApiData.ts

export interface sampleOrder {
  _id?: string;
  round: number;
  slim: number;
  total: number;
  isOwned: boolean;
  status: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  location: {
    longitude: number;
    latitude: number;
    address?: string;
  };
}

export const sampleOrders: sampleOrder[] = [
  // {
  //   round: 1,
  //   slim: 0,
  //   total: 30,
  //   isOwned: true,
  //   status: "for delivery",
  //   username: "jonel.teano@cvsu.edu.ph",
  //   location: {
  //     longitude: 120.97484759419729,
  //     latitude: 14.237759226890873,
  //     address: "BrentHood Tropical Village",
  //   },
  //   createdAt: "2024-01-10T14:29:47.017Z",
  //   updatedAt: "2024-01-10T14:29:47.017Z",
  // },
  {
    round: 1,
    slim: 0,
    total: 30,
    isOwned: true,
    status: "for delivery",
    username: "jonel.teano@cvsu.edu.ph",
    location: {
      longitude: 120.97259251526805,
      latitude: 14.237759226890873,
      address: "BrentHood Tropical Village",
    },
    createdAt: "2024-01-10T14:29:47.017Z",
    updatedAt: "2024-01-10T14:29:47.017Z",
  },
  {
    round: 1,
    slim: 0,
    total: 30,
    isOwned: true,
    status: "for delivery",
    username: "jonel.teano@cvsu.edu.ph",
    location: {
      longitude:  120.97276063353672,
      latitude: 14.229469887253003,
      address: "BrentHood Tropical Village",
    },
    createdAt: "2024-01-10T14:29:47.017Z",
    updatedAt: "2024-01-10T14:29:47.017Z",
  },
  {
    round: 1,
    slim: 0,
    total: 30,
    isOwned: true,
    status: "for delivery",
    username: "jonel.teano@cvsu.edu.ph",
    location: {
      longitude:  120.97269973295198,
      latitude: 14.228141661177375,
      address: "BrentHood Tropical Village",
    },
    createdAt: "2024-01-10T14:29:47.017Z",
    updatedAt: "2024-01-10T14:29:47.017Z",
  },
  {
    round: 1,
    slim: 0,
    total: 30,
    isOwned: true,
    status: "for delivery",
    username: "jonel.teano@cvsu.edu.ph",
    location: {
      longitude:  120.9737654931796,
      latitude: 14.229066500900245,
      address: "BrentHood Tropical Village",
    },
    createdAt: "2024-01-10T14:29:47.017Z",
    updatedAt: "2024-01-10T14:29:47.017Z",
  },
  {
    round: 1,
    slim: 0,
    total: 30,
    isOwned: true,
    status: "for delivery",
    username: "jonel.teano@cvsu.edu.ph",
    location: {
      longitude:  120.97498350486649,
      latitude: 14.226606812433218,
      address: "BrentHood Tropical Village",
    },
    createdAt: "2024-01-10T14:29:47.017Z",
    updatedAt: "2024-01-10T14:29:47.017Z",
  },

  
 
];
