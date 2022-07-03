import Main from '../components/Layout';
import Hero from '../components/Content/Hero';

export default function Home() {
  return (
    <Main>
      <Hero/>
      <div className="flex flex-col mt-14">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mx-5">
            <h2 className="text-4xl text-green-700 font-bold">Truth based</h2>
            <p className="text-md mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt id elit sit amet porttitor. Nam accumsan gravida velit. Phasellus suscipit, nibh nec mollis tristique, sapien velit placerat felis, condimentum feugiat elit sem eget mauris. In ultricies metus et nulla varius, vitae consectetur ante tincidunt. Cras id volutpat arcu. Fusce magna nisl, tempor eget velit vitae, tincidunt volutpat ex. Vestibulum feugiat tellus sit amet varius tincidunt. Morbi nec tellus ex. Donec semper urna vitae finibus feugiat. Aenean sed dolor est. Morbi ante nisl, malesuada a enim quis, viverra varius ante. Nulla risus elit, ornare eu commodo in, elementum ac eros. In vel dapibus mi.
            </p>
          </div>
          <div className="mx-5 mt-5 md:mt-0">
            <img src="https://www.databentobox.com/2019/07/28/facebook-friend-graph/featured.png" width={2500} height={2500}></img>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
          <div className="mx-5 mt-5 md:mt-0">
            <img src="https://www.databentobox.com/2019/07/28/facebook-friend-graph/featured.png" width={2500} height={2500}></img>
          </div>
          <div className="mx-5">
            <h2 className="text-4xl text-red-700 font-bold">Social Graph</h2>
            <p className="text-md mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt id elit sit amet porttitor. Nam accumsan gravida velit. Phasellus suscipit, nibh nec mollis tristique, sapien velit placerat felis, condimentum feugiat elit sem eget mauris. In ultricies metus et nulla varius, vitae consectetur ante tincidunt. Cras id volutpat arcu. Fusce magna nisl, tempor eget velit vitae, tincidunt volutpat ex. Vestibulum feugiat tellus sit amet varius tincidunt. Morbi nec tellus ex. Donec semper urna vitae finibus feugiat. Aenean sed dolor est. Morbi ante nisl, malesuada a enim quis, viverra varius ante. Nulla risus elit, ornare eu commodo in, elementum ac eros. In vel dapibus mi.
            </p>
          </div>
        </div>
      </div>
    </Main>
  )
}
