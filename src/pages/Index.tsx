import React from 'react';
import { Link } from 'react-router-dom';
import { Map, AlertCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SOSButton from '@/components/sos/SOSButton';

const features = [
  {
    title: 'Real-Time Health Map',
    description:
      'Visualize live data on air quality, water contamination, disease outbreaks, and dangerous zones across Mumbai.',
    icon: <Map className='h-6 w-6 text-primary' />,
    link: '/map',
  },
  {
    title: 'Emergency SOS System',
    description:
      'Trigger emergency alerts with your location for immediate assistance during floods, disasters, or health emergencies.',
    icon: <AlertCircle className='h-6 w-6 text-danger' />,
    link: '/sos',
  },
  {
    title: 'Mental Health Support',
    description:
      'Access AI-powered mental health assistance or connect with professionals for crucial mental wellness support.',
    icon: <MessageSquare className='h-6 w-6 text-info' />,
    link: '/chatbot',
  },
  {
    title: 'Disease Prediction',
    description:
      'Predict diseases based on symptoms and get recommendations for treatment.',
    icon: <MessageSquare className='h-6 w-6 text-info' />,
    link: '/disease-prediction',
  },
];

const Index = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-grow'>
        {/* Hero Section */}
        <section className='relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden'>
          <div className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f46e580_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:6rem_4rem]'></div>
          <div className='absolute inset-0 -z-10 bg-gradient-to-b from-white to-transparent dark:from-gray-900'></div>

          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto'>
              <div className='inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 mb-2 animate-fade-in'>
                Mumbai Urban Health Initiative
              </div>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white'>
                <span className='block'>AI-Powered Urban</span>
                <span className='block text-primary'>Health Resilience</span>
              </h1>
              <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl'>
                A comprehensive platform combining real-time health monitoring,
                emergency response, and mental health support for Mumbai's
                residents.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 mt-4'>
                <Button
                  asChild
                  size='lg'
                  className='animate-fade-in'
                >
                  <Link to='/map'>
                    Explore Live Map
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant='outline'
                  size='lg'
                  className='animate-fade-in delay-75'
                >
                  <Link to='/chatbot'>Get Mental Health Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='py-16 bg-gray-50 dark:bg-gray-900'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
                Key Platform Features
              </h2>
              <p className='mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                Our integrated urban health system provides essential tools for
                navigating health challenges in Mumbai.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md flex flex-col h-full animate-slide-up'
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className='h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6'>
                    {feature.icon}
                  </div>
                  <h3 className='text-xl font-bold mb-3 text-gray-900 dark:text-white'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 flex-grow mb-4'>
                    {feature.description}
                  </p>
                  <Button
                    asChild
                    variant='link'
                    className='p-0 justify-start text-primary'
                  >
                    <Link to={feature.link}>
                      Learn more <ArrowRight className='ml-1 h-4 w-4' />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-16 relative overflow-hidden'>
          <div className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:4rem_4rem]'></div>
          <div className='absolute inset-0 -z-10 bg-gradient-to-r from-white via-transparent to-white dark:from-gray-900 dark:via-transparent dark:to-gray-900'></div>

          <div className='container mx-auto px-4 md:px-6'>
            <div className='max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg text-center glass-morphism'>
              <h2 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
                Join Mumbai's Health Resilience Initiative
              </h2>
              <p className='text-gray-600 dark:text-gray-400 mb-6'>
                Create an account to access all features of the platform,
                including personalized alerts, SOS assistance, and mental health
                resources.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Button
                  asChild
                  size='lg'
                >
                  <Link to='/signup'>
                    Sign Up Now
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant='outline'
                  size='lg'
                >
                  <Link to='/login'>Log In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <SOSButton />
    </div>
  );
};

export default Index;
