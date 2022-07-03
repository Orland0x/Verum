import { useState } from 'react';
import { useRouter } from 'next/router';
import { isAddressOrEns } from '../../utils/ethersUtils';

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState();

  async function handleSearchSubmit(event) {
    if (event.key === 'Enter' && search) {
      if (await isAddressOrEns(search) == false) return;
      event.target.value = "";
      window.location = '/address/' + search;
    }
  }

  return (
    <input
      className="px-4 py-2 rounded-xl bg-gray-300 text-black font-semibold focus:outline-none"
      type="text"
      placeholder="Search Eth Address or ENS"
      onKeyUp={handleSearchSubmit}
      onChange={(event) => setSearch(event.target.value)}/>
  )
}
