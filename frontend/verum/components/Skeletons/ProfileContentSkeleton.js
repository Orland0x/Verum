import PostSkeleton from './PostSkeleton';
import AttestationSkeleton from './AttestationSkeleton';

export default function ProfileContentSkeleton({ filter }) {
  switch (filter) {
    case 0:
      return (
        <>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
        </>
      )
    case 1:
      return (
        <>
          <AttestationSkeleton/>
          <AttestationSkeleton/>
          <AttestationSkeleton/>
        </>
      )
    case 2:
      return (
        <>
          <AttestationSkeleton/>
          <AttestationSkeleton/>
          <AttestationSkeleton/>
        </>
      )
  }
}
