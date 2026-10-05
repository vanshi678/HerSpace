import { getInitials } from '../../utils/formatters';

const PALETTE = ['bg-blush-dark', 'bg-lavender-dark', 'bg-plum-300', 'bg-plum-100'];

function hashToIndex(str = '') {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash + str.charCodeAt(i)) % PALETTE.length;
  return hash;
}

export default function Avatar({ name, size = 'md', className = '' }) {
  const sizes = { sm: 'w-9 h-9 text-xs', md: 'w-12 h-12 text-sm', lg: 'w-16 h-16 text-lg' };
  const colorClass = PALETTE[hashToIndex(name)];

  return (
    <div
      className={`${sizes[size]} ${colorClass} rounded-full flex items-center justify-center font-semibold text-plum-800 shrink-0 ${className}`}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}
