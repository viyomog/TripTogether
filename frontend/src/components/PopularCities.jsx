import React from 'react';

const cities = [
  { name: 'Paris', img: 'paris.jpg' },
  { name: 'New York', img: 'newyork.jpg' },
  { name: 'Tokyo', img: 'tokyo.jpg' },
  { name: 'London', img: 'london.jpg' },
  { name: 'Rome', img: 'rome.jpg' },
  { name: 'Sydney', img: 'sydney.jpg' },
];

const PopularCities = () => {
  return (
    <section className="py-16 pt-8 px-4 bg-[#111827] transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-3xl font-bold text-center text-rose-400 mb-10">
          Popular Cities to Explore
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cities.map((city) => (
            <div 
              key={city.name} 
              className="relative group overflow-hidden rounded-xl h-56 shadow-lg cursor-pointer bg-gray-800"
            >
              <img 
                src={`/${city.img}`} 
                alt={city.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                loading="lazy"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
              
              {/* City Title */}
              <h3 className="absolute bottom-4 left-5 text-white text-xl font-bold tracking-wide">
                {city.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCities;
