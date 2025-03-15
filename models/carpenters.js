const mongoose = require("mongoose");

// Helper function to generate default slots from 9:00 AM to 6:00 PM
const generateSlots = () => {
  const slots = [];
  // 9 AM to 5 PM: each slot covers one hour (last slot: 5-6 PM)
  for (let i = 9; i < 18; i++) {
    // Format time strings (e.g., "09:00-10:00")
    const start = i < 10 ? `0${i}:00` : `${i}:00`;
    const end = (i + 1) < 10 ? `0${i + 1}:00` : `${i + 1}:00`;
    slots.push({
      time: `${start}-${end}`,
      booked: false,
      // This field will hold the ObjectId of the User who booked the slot, if any.
      booking_user: null
    });
  }
  return slots;
};

const carpenterSchema = new mongoose.Schema({
    carpenter_id:{
        type: String,
        required: true,
        unique: true
    },
    carpenter_name: {
        type: String,
        required: true,
    },
    available_slots: {
        type: [
        {
            time: { type: String, required: true },
            booked: { type: Boolean, default: false },
            // References the User model (adjust the ref if your user model has a different name)
            booking_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
        }
        ],
        // Set the default value of available_slots to the generated slots array.
        default: generateSlots
    }
    }, {
    timestamps: true
});

// Create and export the model
const Carpenter = mongoose.model('Carpenter', carpenterSchema);
module.exports = Carpenter;