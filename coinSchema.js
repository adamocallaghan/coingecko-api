import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
  },
  coinPrices_Object: {
    type: Object
  }
});

export const Coin = mongoose.model("Coin", coinSchema);

//module.exports = User;
members: [{ firstName: String, lastName: String }]