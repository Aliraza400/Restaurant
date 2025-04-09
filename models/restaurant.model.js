import { model, Schema } from "mongoose";

const restaurantSchema = new Schema({
  title: {
    type: String,
    required: [true, "Restaurant Title is required!"],
    trim: true,
  },
  imageUrl: {
    type: String,
  },
  foods: {
    type: Array,
  },
  time: {
    type: String,
  },
  pickup: {
    type: Boolean,
    default: true,
  },
  delivery: {
    type: Boolean,
    default: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  logoUrl: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  ratingCount: {
    type: String,
  },
  code: {
    type: String,
  },
  coords: {
    id: { type: String },
    latitude: { type: Number },
    latitudeDelta: { type: Number },
    longitude: { type: Number },
    longitudeDelta: { type: Number },
    address: { type: String }
  },
}, {
    timestamps: true
});
const RestaurantModel = model('Restaurant', restaurantSchema)
export default RestaurantModel