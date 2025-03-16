import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SOSButton from '@/components/sos/SOSButton';
import MapViews from '@/components/map/MapViews';

const MapPage = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-grow relative'>
        <MapViews />
      </main>

      <Footer />
      <SOSButton />
    </div>
  );
};

export default MapPage;
