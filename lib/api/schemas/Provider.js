import mongoose, { Schema } from 'mongoose';

let Provider = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  middleName: String,
  specialty: {
    _id: {
      type: Schema.ObjectId,
      ref: 'Specialty'
    },
    name: String,
    createdAt: { type: Date, default: Date.now },
    createdBy: Number,
    updatedAt: { type: Date, default: Date.now },
    updatedBy: Number
  },
  projectedStartDate: Date,
  employerId: Number,
  providerType: String,
  staffStatus: String,
  assignedTo: Number,
  status: String,
  createdBy: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: Number, required: true }
})

Provider.pre('update', function (next) {
  this.updatedAt = Date.now;
  next();
});

export default mongoose.model('Provider', Provider, 'providers');