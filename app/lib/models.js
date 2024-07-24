import mongoose from "mongoose";


// Function to generate order number
async function generateOrderNumber() {
  const lastOrder = await Order.findOne().sort({ _id: -1 }).exec();
  if (!lastOrder) return 'TSM001';

  const lastOrderNumber = lastOrder.order_number;
  const lastNumber = parseInt(lastOrderNumber.replace('TSM', ''), 10);
  const newNumber = lastNumber + 1;
  return `TSM${String(newNumber).padStart(3, '0')}`;
}

const orderSchema = new mongoose.Schema(
  {
    order_number: {
      type: String,
      required: true,
      unique: true,
      default: async function () {
        return await generateOrderNumber();
      },
    },
    workflow: { type: String, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    client1: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    origin: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    origin1: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    origin2: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    origin3: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    des: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    des1: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    des2: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    des3: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    des4: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    empty_pic: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    empty_pic1: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    cont_no: { type: String },
    cont_no1: { type: String },
    cargo_rate: { type: String },
    rate_type: { type: String, required: true },
    rate_currency: { type: String, required: true },
    payment_terms: { type: String },
    trans_rate: { type: String },
    trans_rate_type: { type: String },
    trans_rate_currency: { type: String },
    trans_payment_terms: { type: String },
    agent: { type: String },
    vessel: { type: String },
    load_cont: { type: String },
    off_cont: { type: String },
    commodity: { type: String, required: true },
    commodity1: { type: String },
    commodity2: { type: String },
    packaging: { type: String, required: true },
    trailer_types: { type: String, required: true },
    load_date: { type: Date, required: true },
    last_load_date: { type: Date, required: true },
    lpo: { type: String },
    status: { type: String, default: "new" },
    arrival_ld: { type: String },
    arrival_ld1: { type: String },
    arrival_ld2: { type: String },
    arrival_ld3: { type: String },
    arrival_ld4: { type: String },
    arrival_ld5: { type: String },
    dep_ld: { type: String },
    dep_ld1: { type: String },
    dep_ld2: { type: String },
    dep_ld3: { type: String },
    dep_ld4: { type: String },
    dep_ld5: { type: String },
    arrival_border: { type: String },
    arrival_border1: { type: String },
    arrival_border2: { type: String },
    arrival_border3: { type: String },
    arrival_border4: { type: String },
    arrival_border5: { type: String },
    arrival_border6: { type: String },
    dep_border: { type: String },
    dep_border1: { type: String },
    dep_border2: { type: String },
    dep_border3: { type: String },
    dep_border4: { type: String },
    dep_border5: { type: String },
    arrival_off: { type: String },
    dep_off: { type: String },
    dep_off1: { type: String },
    dep_off2: { type: String },
    dep_off3: { type: String },
    dep_off4: { type: String },
    dep_off5: { type: String },
    arrival_emp_off: { type: String },
    arrival_emp_off1: { type: String },
    dep_emp_off: { type: String },
    dep_emp_off1: { type: String },
    load_qty: { type: String },
    load_qty1: { type: String },
    load_qty2: { type: String },
    load_qty3: { type: String },
    offload_qty: { type: String },
    offload_qty1: { type: String },
    offload_qty2: { type: String },
    offload_qty3: { type: String },
    loaded_bg: { type: String },
    loaded_bg1: { type: String },
    loaded_bg2: { type: String },
    loaded_bg3: { type: String },
    offloaded_bg: { type: String },
    offloaded_bg1: { type: String },
    offloaded_bg2: { type: String },
    offloaded_bg3: { type: String },
    truck: { type: mongoose.Schema.Types.ObjectId, ref: "Truck" },
    trailer: { type: mongoose.Schema.Types.ObjectId, ref: "Trailer" },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  },
  { timestamps: true }
);



const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, min: 3, max: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    phone: { type: String },
  },
  { timestamps: true }
);

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, min: 0 },
    city: { type: String },
    country: { type: String },
    account: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const transporterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    tel: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    account: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const truckSchema = new mongoose.Schema(
  {
    truck_reg: { type: String, required: true, unique: true },
    make: { type: String, required: true },
    year: { type: Number, required: true },
    transporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transporter",
      required: true,
    },
  },
  { timestamps: true }
);

const trailerSchema = new mongoose.Schema(
  {
    trailer_reg: { type: String, required: true, unique: true },
    trailer_type: { type: String, required: true },
    ton: { type: String, required: true },
    year: { type: Number, required: true },
    transporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transporter",
      required: true,
    },
  },
  { timestamps: true }
);

const locationSchema = new mongoose.Schema(
  {
    country: { type: String, required: true, unique: true },
    city: { type: String, required: true, unique: true },
    depo_name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    id_no: { type: String, required: true },
    dl_no: { type: String, required: true },
    emp_yr: { type: Number, required: true },
    transporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transporter",
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);
export const Transporter =
  mongoose.models.Transporter ||
  mongoose.model("Transporter", transporterSchema);
export const Truck =
  mongoose.models.Truck || mongoose.model("Truck", truckSchema);
export const Trailer =
  mongoose.models.Trailer || mongoose.model("Trailer", trailerSchema);
export const Driver =
  mongoose.models.Driver || mongoose.model("Driver", driverSchema);
export const Location =
  mongoose.models.Location || mongoose.model("Location", locationSchema);
export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
