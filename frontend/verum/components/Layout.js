import NavBar from './NavBar';
import SideBar from './SideBar';
import PostModal from './Modals/PostModal';

import { useState, useCallback, useEffect } from 'react';

export default function Main({active, children}) {
  const [showPostModal, setShowPostModal] = useState(false);
  const handleKeyPress = useCallback((event) => {
    if (event.key == "Escape") {
      setShowPostModal(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen w-screen bg-gray-100 pb-20 relative">
      {showPostModal && <PostModal close={() => setShowPostModal(false)}/>}
      <NavBar/>
      <div className="max-w-7xl mx-auto pt-10 px-8 grid grid-cols-10">
        <SideBar active={active} newPost={() => setShowPostModal(true)}/>
        <div className="col-span-10 lg:col-span-8">{children}</div>
      </div>
    </div>
  )
}
