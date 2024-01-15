// mockApiData.ts

export interface Order {
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

export const sampleOrders: Order[] = [
  {
    round: 1,
    slim: 0,
    total: 30,
    isOwned: true,
    status: "for delivery",
    username: "jonel.teano@cvsu.edu.ph",
    location: {
      longitude: 120.9589699,
      latitude: 14.2990183,
      address: "BrentHood Tropical Village",
    },
    createdAt: "2024-01-10T14:29:47.017Z",
    updatedAt: "2024-01-10T14:29:47.017Z",
  },
  // Add more mock data as needed
];
