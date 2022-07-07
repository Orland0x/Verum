# Verum

### Motivation

How can one trust what they see online? In an age of digital content, where anyone can post or share anything, 
it becomes increasingly difficult to have any trust in the content you are seeing. One particularly scary example 
of this is deep fake videos and photos.

### How can a blockchain be used to fix this? 

The blockchain makes it very easy to track the origin of a piece of content that got posted and view the history 
of the person that posted it. We can then use this information to decide on how much trust to place in the content. 

For example, a photographer is posting pictures of the ukrainian war via on chain transactions from a specfic ethereum address. This is going fine until one day they post a photo from a different war, pretending it was from ukraine. People spot this dishonestly and then in future will make sure to put less trust in this person in future. We built Verum to make use of this mechanism to aid in the determination of truth.  

### How Verum works
 
There are 2 core actions that users can make: posting content to their own profile,  and attesting the truthfulness
of other user profiles. Both of these actions are achieved via an on chain transaction that emits an event. 
Posts consist of the IPFS uri of the content while attestations consist of a value that encodes the users degree 
of trust in the profile. 

To make a post, a user submits a transaction containing the IPFS URI of the content and this is emitted as an event 
along with the user's address. To attest to another profile, one submits the profile address, and a number that 
encodes their degree of belief in the profile in the range -128 to 128. A strongly negative score indicates a
severe lack of trust in the profile while a strongly positive score indicates a high trust. An event is emitted here
containing the attestor address, the profile address, and the attestation value. 

Now the real magic happens through indexing events from these transactions using a subgraph. A user submits a 
list of addresses through the UI and then the subgraph is queried for all the posts and attestations made by 
addresses in the list. It can then generate the full post history for each address along with a social graph 
that connects the addresses via their attestations of each other.

One can view posts by each profile in the list along with a graph of the attestation history of the profile.
We also calculate a reputation score for each profile which is a function of their attestation history. 
In general, if a profile has a long post history and a high number of attestations over an extended period,
then one can have high trust in the content posted.

Obviously the strength of the social graph will be a function of the list of addresses passed as input. 
The curation of these lists is therefore a core and important part of the protocol, we call the people 
that curate these lists Maintainers.


Our plan to monetize the protocol will be to build a list curation marketplace where maintainers can publish 
lists that they have created and are maintaining, then users can subscribe to them for a fee. A cut of these fees
will accrue to the protocol. 

One of our key target audiences will be news agencies, as it can be used as a verifiably high-quality source 
of information. Verifiability of quality is rare with digital sources, so this could integrate with or even replace 
a whole array of sources that news agencies already pay for. Eg pictures of the ukraine war. 
