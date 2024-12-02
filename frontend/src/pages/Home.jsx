import { useState } from 'react';
import HomeSearch from '../components/HomeSearch';
import ToolGrid from '../components/ToolGrid';
import TopCategories from '../components/TopCategories';

function Home() {

  return (
    <main>
      <HomeSearch />
      <TopCategories />
      <div className='flex flex-col items-center mt-5'>
        <h2 className="text-[26px] sm:text-[32px] lg:text-[48px] p-[40px] text-center">Most popular tools</h2>
        <ToolGrid limit={8} />
      </div>
    </main>
  );
}

export default Home;