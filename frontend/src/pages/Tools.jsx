import { useEffect, useState } from 'react';
import ToolGrid from '../components/ToolGrid';

function Tools() {
  
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4 text-center">Our Tools Collection</h1>
      <ToolGrid />
    </main>
  );
}

export default Tools;