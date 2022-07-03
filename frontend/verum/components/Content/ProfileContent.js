import Post from '../Cards/Post';
import Attestation from '../Cards/Attestation';

export default function ProfileContent({ filter, data }) {
  console.log(filter, data)
  switch (filter) {
    case 0:
      return (
        <>
        {data.map((el, index) => (
          <Post key={index}/>
        ))}
        </>
      )
    case 1:
      return (
        <>
        {data.map((el, index) => (
          <Attestation user={el} key={index}/>
        ))}
        </>
      )
    case 2:
      return (
        <>
        {data.map((el, index) => (
          <Attestation user={el} key={index}/>
        ))}
        </>
      )
  }
}
