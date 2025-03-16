import React from 'react';
import AQIMap from './AQIMap';
import Legend from './Legend';
import { MapPin } from 'lucide-react';

function MapViews() {
  return (
    <div className='m-8 min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-12'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-3'>
            <MapPin className='w-7 h-7 text-blue-600 dark:text-blue-400' />
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Mumbai AQI Live Map
            </h1>
          </div>
          <p className='text-lg text-gray-700 dark:text-gray-300'>
            Real-time Air Quality Index monitoring across Mumbai regions
          </p>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* AQI Map Section */}
          <div className='lg:col-span-3'>
            <div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg'>
              <AQIMap />
            </div>
          </div>

          {/* Legend Section */}
          <div className='lg:col-span-1'>
            <div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg'>
              <Legend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapViews;
