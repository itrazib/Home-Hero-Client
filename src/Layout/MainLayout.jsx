import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../components/Navbar/Footer/Footer';

const MainLayout = () => {

    const navigation = useNavigation()
    return (
        <div className=' flex flex-col min-h-screen'>
            <Navbar></Navbar>
            
             {navigation.state === "loading" && (
        <div className="fixed inset-0 bg-white/70 flex flex-col items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-3 text-gradient text-lg font-semibold">
            Loading...
          </p>
        </div>
      )}

            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;