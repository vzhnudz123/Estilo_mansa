import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Wifi, Coffee } from 'lucide-react';
import api from '../api/axios';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get('/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-luxury-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Our Accommodations</h1>
          <div className="w-24 h-1 bg-luxury-gold mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            Choose from our selection of masterfully curated spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rooms.map(room => (
            <div key={room._id} className="card group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.images?.[0] || "https://images.unsplash.com/photo-1618773928120-2c15c328de8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                  alt={room.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                  <span className="font-bold text-luxury-dark">${room.price}</span>
                  <span className="text-sm text-gray-500"> / night</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{room.name}</h3>
                <p className="text-gray-600 line-clamp-2 mb-6">{room.description}</p>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-6">
                  <div className="flex items-center text-gray-500 gap-2">
                    <Users size={18} />
                    <span className="text-sm">Up to {room.capacity} Guests</span>
                  </div>
                </div>
                
                <Link to={`/rooms/${room._id}`} className="block text-center btn-outline w-full group-hover:bg-luxury-dark group-hover:text-white">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {rooms.length === 0 && (
          <div className="text-center text-gray-500 py-12">No rooms available currently. Check back later!</div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
