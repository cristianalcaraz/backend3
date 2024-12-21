import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const materials=materials;

const MaterialSchema = new Schema({
  name: { type: String, required: true },
  stock: { type: Number, default: 1 },
});

export const MaterialModel = mongoose.model('Materials', MaterialSchema);