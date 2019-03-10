import mongoose, { Schema } from 'mongoose';

let Specialty = new Schema({
  name: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
  createdBy: { type: Number, required: true },

  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: Number, required: true }
})

Specialty.pre('update', function (next) {
  this.updatedAt = Date.now;
  next();
});


export default mongoose.model('Specialty', Specialty, 'specialties');