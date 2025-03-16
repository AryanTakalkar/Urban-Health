import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SOSButton from '@/components/sos/SOSButton';
import Graph from '@/components/disease-graph/Graph';

const DiseasePredictionPage = () => {
  return (
    <>
      <Header />
      <br />
      <div className='h-full flex flex-col bg-gray-50 dark:bg-gray-950'>
        <main className='flex-grow relative m-8 my-16'>
          {/* Title */}
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Disease Prediction Dashboard
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Our Disease prediction systems are based on the latest research and
            data.
          </p>
          <br />
          {/* Graph Section */}
          <div className='p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg'>
            <Graph />
          </div>

          {/* Disease Outbreak Prediction Link */}
          <p className='mt-6 text-center text-lg text-gray-700 dark:text-gray-300'>
            Check out the{' '}
            <a
              href='https://vrushalmore-mosquito-habitat-prediction-sy-deploymentapp-pjmyj4.streamlit.app/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 dark:text-blue-400 hover:underline'
            >
              Disease Outbreak Prediction Tool
            </a>
            .
          </p>
        </main>

        <Footer />
      </div>

      <SOSButton />
    </>
  );
};

export default DiseasePredictionPage;
