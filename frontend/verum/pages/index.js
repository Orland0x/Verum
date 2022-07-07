import Main from '../components/Layout';
import Hero from '../components/Content/Hero';

export default function Home() {
  return (
    <Main>
      <Hero/>
      <div className="flex flex-col mt-14">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mx-5">
            <h2 className="text-4xl text-green-700 font-bold">Overview</h2>
            <p className="text-md mt-3">
            How can one trust what they see online? In an age of digital content, where anyone can post or share anything, it becomes increasingly difficult to have any trust in the content you are seeing. How can a blockchain solve this? The blockchain makes it very easy to track the origin of a piece of content that got posted and view the history of the person that posted it. We can then use this information to decide on how much trust to place in the content. 
            </p>
          </div>
          <div className="mx-5 mt-5 md:mt-0">
            <img src="https://www.womansera.com/wp-content/uploads/2019/10/Here%E2%80%99s-Why-Fake-News-Is-a-Threat-to-Your-Identity.jpg" width={2500} height={2500}></img>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
          <div className="mx-5 mt-5 md:mt-0">
            <img src="https://www.databentobox.com/2019/07/28/facebook-friend-graph/featured.png" width={2500} height={2500}></img>
          </div>
          <div className="mx-5">
            <h2 className="text-4xl text-red-700 font-bold">How Verum Works</h2>
            <p className="text-md mt-3">
            There are 2 core actions that users can make: posting content to their own profile,  and attesting the truthfulness of other user profiles. Both of these actions are achieved via an on chain transaction that emits an event. Posts consist of the IPFS uri of the content while attestations consist of a value that encodes the users degree of trust in the profile. Now the real magic happens through indexing of these events using a subgraph. A user submits a list of addresses and the subgraph is queried for all the posts and attestations made by addresses in the list. It can then generate the full post history for each address along with a social graph that connects the addresses via their attestations of each other. In general, if a profile has a long post history and a high number of attestations over an extended period, then one can have high trust in the content posted. Verum makes it easy have trust in what you are seeing online.
            </p>
          </div>
        </div>
      </div>
    </Main>
  )
}
