import { Customer, User, Transporter, Truck, Trailer, Location, Driver, Order } from "./models";

import { connectToDB } from "./utils";

const ITEM_PER_PAGE = 10;

// User actions
export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDB();
    const count = await User.find({ username: { $regex: regex } }).countDocuments();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  try {
    await connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

// Customer actions
export const fetchCustomers = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDB();
    const count = await Customer.countDocuments({ name: { $regex: regex } });
    const customers = await Customer.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, customers };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch customers!");
  }
};

export const fetchCustomer = async (id) => {
  try {
    await connectToDB();
    const customer = await Customer.findById(id);
    return customer;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch customer!");
  }
};

// Transporter actions
export const fetchTransporters = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDB();
    const count = await Transporter.countDocuments({ name: { $regex: regex } });
    const transporters = await Transporter.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, transporters };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch transporters!");
  }
};

export const fetchTransporter = async (id) => {
  try {
    await connectToDB();
    const transporter = await Transporter.findById(id);
    return transporter;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch transporter!");
  }
};

// Truck actions
export const fetchTrucks = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDB();
    const count = await Truck.countDocuments({ truck_reg: { $regex: regex } });
    const trucks = await Truck.find({ truck_reg: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, trucks };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch trucks!");
  }
};

export const fetchTruck = async (id) => {
  try {
    await connectToDB();
    const truck = await Truck.findById(id);
    return truck;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch truck!");
  }
};

// Trailer actions
export const fetchTrailers = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDB();
    const count = await Trailer.countDocuments({ trailer_reg: { $regex: regex } });
    const trailers = await Trailer.find({ trailer_reg: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, trailers };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch trailers!");
  }
};

export const fetchTrailer = async (id) => {
  try {
    await connectToDB();
    const trailer = await Trailer.findById(id);
    return trailer;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch trailer!");
  }
};

// Location actions
export const fetchLocations = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDB();
    const count = await Location.countDocuments({ depo_name: { $regex: regex } });
    const locations = await Location.find({ depo_name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, locations };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch locations!");
  }
};

export const fetchLocation = async (id) => {
  try {
    await connectToDB();
    const location = await Location.findById(id);
    return location;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch location!");
  }
};

// Driver actions
export const fetchDrivers = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDB();
    const count = await Driver.countDocuments({ name: { $regex: regex } });
    const drivers = await Driver.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, drivers };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch drivers!");
  }
};

export const fetchDriver = async (id) => {
  try {
    await connectToDB();
    const driver = await Driver.findById(id);
    return driver;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch driver!");
  }
};


export const fetchOrders = async (q, page = 1) => {
  const regex = new RegExp(q, 'i');

  // Validate page
  if (page < 1) {
    throw new Error('Invalid page number');
  }

  try {
    await connectToDB();
    
    const count = await Order.countDocuments({ order_number: { $regex: regex } });
    const orders = await Order.find({ order_number: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .populate('client', 'name email')
      .populate('origin', 'country city depo_name')
      .populate('des', 'country city depo_name')
      .populate('empty_pic', 'depo_name')
      .populate({
        path: 'truck',
        select: 'truck_reg',
        options: { strictPopulate: false }
      })
      .populate('trailer', 'trailer_reg')
      .populate('driver', 'name email phone');
    
    return { count, orders };
  } catch (err) {
    console.error('Error fetching orders:', err);
    throw new Error('Failed to fetch orders!');
  }
};



export const fetchOrder = async (id) => {
  if (!id) {
    throw new Error('Order ID is required');
  }

  console.log(`Fetching order with id: ${id}`);

  try {
    await connectToDB();
    const order = await Order.findById(id)
      .populate('client', 'name email')
      .populate('origin', 'country city depo_name')
      .populate('des', 'country city depo_name')
      .populate('empty_pic', 'depo_name')
      .populate('truck', 'truck_reg')
      .populate('trailer', 'trailer_reg')
      .populate('driver', 'name email phone');

    if (!order) {
      throw new Error('Order not found');
    }

    console.log(`Fetched order: ${order}`);
    return order;
  } catch (err) {
    console.error('Error fetching order:', err);
    throw new Error('Failed to fetch order!');
  }
};


// DUMMY DATA

export const cards = [
  {
    id: 1,
    title: "Total Users",
    number: 10.928,
    change: 12,
  },
  {
    id: 2,
    title: "Stock",
    number: 8.236,
    change: -2,
  },
  {
    id: 3,
    title: "Revenue",
    number: 6.642,
    change: 18,
  },
];
