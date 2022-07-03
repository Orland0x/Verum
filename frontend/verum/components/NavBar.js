import { ConnectButton } from '@rainbow-me/rainbowkit';

import SearchBar from './Header/SearchBar';
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="w-full fixed z-10 top-0 left-0 bg-white h-14 shadow-sm">
      <div className="container px-2 md:px-8 mx-auto h-full flex items-center justify-start md:justify-between">
        <div className="flex items-center w-1/3 hidden md:inline">
          <Link href="/" passHref>
            <div className="py-1.5 w-36 justify-center flex items-center bg-blue-800 text-white rounded-lg shadow-lg hover:cursor-pointer">
              <p className="text-sm font-medium">Verum</p>
            </div>
          </Link>
        </div>
        <div className="flex items-center w-1/2 md:w-1/3 mr-6">
        <SearchBar />
        </div>
        <div className="flex items-center ml-6">
        <ConnectButton showBalance={false} chainStatus="icon"/>
        </div>
      </div>
    </header>
  )
}
