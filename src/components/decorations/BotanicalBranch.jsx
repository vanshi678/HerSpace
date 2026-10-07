export default function BotanicalBranch({
  className = '',
  flip = false,
}) {
  return (
    <svg
      viewBox="0 0 150 190"
      className={className}
      style={{
        transform: flip ? 'scaleX(-1)' : undefined,
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main curved stem */}
      <path
        d="M72 188 C72 155 78 125 83 96 C88 68 99 42 113 17"
        stroke="#668F80"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Left branch */}
      <path
        d="M79 132 C65 119 52 108 39 94"
        stroke="#668F80"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      {/* Right branch */}
      <path
        d="M83 103 C99 91 111 79 120 65"
        stroke="#668F80"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      {/* Bottom left leaf */}
      <path
        d="M68 139
           C51 136 39 125 35 110
           C51 111 65 120 72 134
           C73 137 71 139 68 139Z"
        fill="#A8B9A3"
      />

      {/* Middle left leaf */}
      <path
        d="M58 113
           C43 108 34 97 33 84
           C47 87 58 96 63 108
           C64 111 61 113 58 113Z"
        fill="#E4EBDD"
      />

      {/* Middle right leaf */}
      <path
        d="M96 101
           C108 91 120 89 132 93
           C123 104 111 108 98 106
           C95 105 94 103 96 101Z"
        fill="#668F80"
      />

      {/* Upper left leaf */}
      <path
        d="M78 78
           C63 72 55 61 55 48
           C69 51 79 61 83 73
           C84 76 81 79 78 78Z"
        fill="#A8B9A3"
      />

      {/* Upper right leaf */}
      <path
        d="M91 70
           C100 56 112 50 125 52
           C119 65 108 73 94 75
           C91 75 89 73 91 70Z"
        fill="#668F80"
      />

      {/* Top leaf */}
      <path
        d="M104 45
           C96 32 99 19 108 10
           C117 21 117 34 109 45
           C108 47 105 47 104 45Z"
        fill="#A8B9A3"
      />

      {/* Tiny flower stem */}
      <path
        d="M108 28 C116 25 121 21 125 15"
        stroke="#668F80"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Flower petals */}
      <circle cx="126" cy="12" r="4.5" fill="#FADADD" />
      <circle cx="132" cy="16" r="4.5" fill="#FADADD" />
      <circle cx="129" cy="22" r="4.5" fill="#FADADD" />
      <circle cx="123" cy="19" r="4.5" fill="#FADADD" />

      {/* Flower center */}
      <circle cx="127.5" cy="17.5" r="2.2" fill="#D9829A" />

      {/* Tiny floating petal */}
      <path
        d="M43 69 C39 65 40 61 44 59 C47 63 47 67 43 69Z"
        fill="#FADADD"
      />
    </svg>
  );
}