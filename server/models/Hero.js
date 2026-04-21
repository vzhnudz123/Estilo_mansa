import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  ctaTextPrimary: {
    type: String,
    default: 'Book Now',
  },
  ctaTextSecondary: {
    type: String,
    default: 'Explore Rooms',
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Hero = mongoose.model('Hero', HeroSchema);

export default Hero;
