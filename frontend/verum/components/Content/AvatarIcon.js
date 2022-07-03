import { emojiAvatarForAddress } from '../../utils/avatar';

export default function AvatarIcon({ address }) {
  const avatar = emojiAvatarForAddress(address);
  return (
    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xl rounded-full" style={{ backgroundColor: avatar.color}}>{avatar.emoji}</div>
  )
}
