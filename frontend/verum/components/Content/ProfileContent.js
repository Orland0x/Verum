import Post from '../Cards/Post';
import Attestation from '../Cards/Attestation';
import EmptyContent from '../Placeholders/EmptyContent';

export default function ProfileContent({ filter, posts, attestationsReceived, attestationsGiven }) {
  let data;
  switch (filter) {
    case 0:
      data = posts;
      if (!data) return;
      if (data.length == 0) {
        return (
          <EmptyContent item="posts"/>
        )
      }
      return (
        <>
        {data.map((el, index) => (
          <Post key={index} postData={el}/>
        ))}
        </>
      )
    case 1:
      data = attestationsGiven;
      if (!data) return;
      if (data.length == 0) {
        return (
          <EmptyContent item="attestations"/>
        )
      }
      return (
        <>
        {data.map((el, index) => (
          <Attestation address={el.profile} key={index}/>
        ))}
        </>
      )
    case 2:
      data = attestationsReceived;
      if (!data) return;
      if (data.length == 0) {
        return (
          <EmptyContent item="attestations"/>
        )
      }
      return (
        <>
        {data.map((el, index) => (
          <Attestation address={el.attestor} key={index}/>
        ))}
        </>
      )
  }
}
