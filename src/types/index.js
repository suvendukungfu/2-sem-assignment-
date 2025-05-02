const Alert = {
  id: "string",
  title: "string",
  description: "string",
  location: {
    latitude: 0.0,
    longitude: 0.0,
    address: "string",
  },
  severity: "low",
  status: "active",
  dateCreated: new Date(),
  dateUpdated: new Date(),
  dateResolved: new Date(),
  createdBy: "string",
  images: ["string"],
};

const User = {
  id: "string",
  name: "string",
  role: "admin",
};

const PocketBaseRecord = {
  id: "string",
  created: "string",
  updated: "string",
  collectionId: "string",
  collectionName: "string",
};

const PocketBaseAlert = {
  id: "string",
  created: "string",
  updated: "string",
  collectionId: "string",
  collectionName: "string",
  title: "string",
  description: "string",
  latitude: 0.0,
  longitude: 0.0,
  address: "string",
  severity: "low",
  status: "active",
  dateResolved: "string",
  createdBy: "string",
  images: ["string"],
  expand: {
    createdBy: {
      id: "string",
      name: "string",
      email: "string",
      role: "admin",
    }
  },
};

const PocketBaseUser = {
  id: "string",
  created: "string",
  updated: "string",
  collectionId: "string",
  collectionName: "string",
  name: "string",
  email: "string",
  role: "admin",
};
