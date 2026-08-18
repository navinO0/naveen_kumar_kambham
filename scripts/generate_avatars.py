import os
import subprocess

public_dir = "/home/naveen/Desktop/boutique/backend-portfolio/public"
app_dir = "/home/naveen/Desktop/boutique/backend-portfolio/app"

# 1. developer_avatar.svg - Main User Vector Avatar (Modeled on photo, Transparent Background)
svg_main = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <!-- FLOATING TECH STICKERS / BADGES -->
  <!-- Left Code Badge -->
  <g transform="translate(25, 95) rotate(-6)">
    <rect x="0" y="0" width="80" height="34" rx="6" fill="#ffe866" stroke="#1e1d1b" stroke-width="3.5" />
    <text x="40" y="22" font-family="monospace" font-weight="900" font-size="15" fill="#1e1d1b" text-anchor="middle">{ API }</text>
  </g>

  <!-- Right Status Badge -->
  <g transform="translate(395, 85) rotate(8)">
    <rect x="0" y="0" width="92" height="34" rx="6" fill="#2ecc71" stroke="#1e1d1b" stroke-width="3.5" />
    <text x="46" y="22" font-family="monospace" font-weight="900" font-size="13" fill="#1e1d1b" text-anchor="middle">200 OK</text>
  </g>

  <!-- Top Right Code Chip -->
  <g transform="translate(365, 205) rotate(-4)">
    <rect x="0" y="0" width="115" height="30" rx="4" fill="#ffffff" stroke="#1e1d1b" stroke-width="3" />
    <text x="57" y="20" font-family="monospace" font-weight="700" font-size="11" fill="#ff5e5b" text-anchor="middle">POST /v1/solve</text>
  </g>

  <!-- Top Left Terminal Chip -->
  <g transform="translate(20, 215) rotate(5)">
    <rect x="0" y="0" width="85" height="30" rx="4" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="3" />
    <text x="42" y="20" font-family="monospace" font-weight="700" font-size="12" fill="#ffe866" text-anchor="middle">&gt;_ node</text>
  </g>

  <!-- USER'S BLACK T-SHIRT & SHOULDERS -->
  <path d="M 105 480 C 120 370, 175 330, 256 330 C 337 330, 392 370, 407 480 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="4" />
  <!-- T-shirt Crewneck Collar Line -->
  <path d="M 205 335 C 235 365, 277 365, 307 335" fill="none" stroke="#ffe866" stroke-width="5" stroke-linecap="round" />
  <path d="M 215 342 C 240 368, 272 368, 297 342" fill="none" stroke="#57534e" stroke-width="3" stroke-linecap="round" />

  <!-- NECK -->
  <rect x="220" y="260" width="72" height="80" rx="8" fill="#e0a96d" stroke="#1e1d1b" stroke-width="4" />
  <path d="M 220 285 C 256 305, 256 305, 292 285 L 292 260 L 220 260 Z" fill="#c68a4c" opacity="0.4" />

  <!-- USER'S EARS -->
  <circle cx="156" cy="205" r="21" fill="#e0a96d" stroke="#1e1d1b" stroke-width="4" />
  <circle cx="156" cy="205" r="10" fill="none" stroke="#1e1d1b" stroke-width="3" />
  <circle cx="356" cy="205" r="21" fill="#e0a96d" stroke="#1e1d1b" stroke-width="4" />
  <circle cx="356" cy="205" r="10" fill="none" stroke="#1e1d1b" stroke-width="3" />

  <!-- USER'S FACE CONTOUR -->
  <path d="M 166 175 C 166 288, 346 288, 346 175 C 346 110, 166 110, 166 175 Z" fill="#e0a96d" stroke="#1e1d1b" stroke-width="5" />

  <!-- USER'S FULL WELL-GROOMED BEARD & MUSTACHE (From Photo) -->
  <path d="M 170 195 C 170 282, 342 282, 342 195 C 342 250, 310 278, 256 278 C 202 278, 170 250, 170 195 Z" fill="#1e1d1b" />
  <!-- Mustache Contour -->
  <path d="M 215 228 C 235 218, 256 226, 256 226 C 256 226, 277 218, 297 228 C 290 245, 266 242, 256 238 C 246 242, 222 245, 215 228 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="2" />
  <!-- Mouth line -->
  <path d="M 235 245 Q 256 254 277 245" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />

  <!-- USER'S SUNGLASSES (Wayfarers from photo) -->
  <g>
    <!-- Left Lens Frame -->
    <path d="M 180 150 L 246 150 L 240 195 C 215 200, 190 200, 184 190 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="5" />
    <path d="M 184 154 L 242 154 L 236 191 C 215 195, 193 195, 188 186 Z" fill="#292524" />
    <!-- White Reflection Streak on Left Lens -->
    <polygon points="190,158 215,158 198,188 190,188" fill="#ffffff" opacity="0.45" />

    <!-- Right Lens Frame -->
    <path d="M 266 150 L 332 150 L 328 190 C 322 200, 297 200, 272 195 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="5" />
    <path d="M 270 154 L 328 154 L 324 186 C 319 195, 297 195, 276 191 Z" fill="#292524" />
    <!-- White Reflection Streak on Right Lens -->
    <polygon points="276,158 301,158 284,188 276,188" fill="#ffffff" opacity="0.45" />

    <!-- Sunglasses Bridge -->
    <path d="M 246 158 C 251 154, 261 154, 266 158" stroke="#1e1d1b" stroke-width="6" fill="none" stroke-linecap="round" />
    <!-- Sunglasses Frame Temples -->
    <path d="M 180 158 L 156 156" stroke="#1e1d1b" stroke-width="6" stroke-linecap="round" />
    <path d="M 332 158 L 356 156" stroke="#1e1d1b" stroke-width="6" stroke-linecap="round" />
  </g>

  <!-- Nose -->
  <path d="M 256 160 L 250 200 L 262 200" fill="none" stroke="#1e1d1b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />

  <!-- USER'S SIGNATURE HIGH-VOLUME TEXTURED POMPADOUR HAIR (From photo) -->
  <path d="M 160 170 C 145 100, 160 40, 220 30 C 256 20, 295 25, 330 45 C 365 75, 370 115, 352 170 C 330 115, 290 100, 256 105 C 220 100, 180 115, 160 170 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="5" />
  <!-- Hair Texture & Volume Strands -->
  <path d="M 200 60 Q 235 30 270 42" fill="none" stroke="#ffe866" stroke-width="4" stroke-linecap="round" />
  <path d="M 220 80 Q 260 50 300 65" fill="none" stroke="#ffe866" stroke-width="3" stroke-linecap="round" />
  <path d="M 180 100 Q 210 65 245 75" fill="none" stroke="#ff5e5b" stroke-width="3" stroke-linecap="round" />
</svg>"""

# 2. developer_avatar_security.svg - Security / Hacker User Avatar (Transparent Background)
svg_security = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <!-- SECURITY BADGES -->
  <g transform="translate(30, 75) rotate(-8)">
    <path d="M 30 0 L 60 12 C 60 40, 30 65, 30 65 C 30 65, 0 40, 0 12 Z" fill="#ff5e5b" stroke="#1e1d1b" stroke-width="4" />
    <path d="M 30 10 L 50 20 C 50 38, 30 52, 30 52 C 30 52, 10 38, 10 20 Z" fill="#ffffff" />
    <circle cx="30" cy="28" r="6" fill="#1e1d1b" />
    <path d="M 30 34 L 30 44" stroke="#1e1d1b" stroke-width="4" stroke-linecap="round" />
  </g>

  <g transform="translate(370, 85) rotate(6)">
    <rect x="0" y="0" width="108" height="34" rx="6" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="3" />
    <text x="54" y="22" font-family="monospace" font-weight="900" font-size="12" fill="#2ecc71" text-anchor="middle">🔒 RBAC_200</text>
  </g>

  <g transform="translate(360, 220) rotate(-4)">
    <rect x="0" y="0" width="120" height="30" rx="4" fill="#000000" stroke="#2ecc71" stroke-width="3" />
    <text x="60" y="20" font-family="monospace" font-weight="700" font-size="11" fill="#2ecc71" text-anchor="middle">AUTHZ_ENFORCED</text>
  </g>

  <!-- CYBER HOODIE OVER USER'S POMPADOUR HAIR -->
  <path d="M 115 480 C 105 320, 145 50, 256 50 C 367 50, 407 320, 397 480 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="5" />
  <path d="M 148 480 C 146 300, 168 115, 256 115 C 344 115, 366 300, 364 480 Z" fill="#292524" />

  <!-- Shield Emblem on T-shirt -->
  <g transform="translate(226, 375)">
    <rect x="0" y="0" width="60" height="60" rx="8" fill="#ff5e5b" stroke="#ffffff" stroke-width="3" />
    <text x="30" y="38" font-family="monospace" font-weight="900" font-size="28" fill="#ffffff" text-anchor="middle">🛡️</text>
  </g>

  <!-- NECK & FACE -->
  <rect x="220" y="260" width="72" height="80" rx="8" fill="#e0a96d" stroke="#1e1d1b" stroke-width="4" />
  <path d="M 166 175 C 166 288, 346 288, 346 175 C 346 120, 166 120, 166 175 Z" fill="#e0a96d" stroke="#1e1d1b" stroke-width="5" />

  <!-- USER'S BEARD & MUSTACHE -->
  <path d="M 170 195 C 170 282, 342 282, 342 195 C 342 250, 310 278, 256 278 C 202 278, 170 250, 170 195 Z" fill="#1e1d1b" />
  <path d="M 215 228 C 235 218, 256 226, 256 226 C 256 226, 277 218, 297 228 C 290 245, 266 242, 256 238 C 246 242, 222 245, 215 228 Z" fill="#1e1d1b" />
  <line x1="230" y1="245" x2="282" y2="245" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />

  <!-- GLOWING RED CYBER SUNGLASSES (User's Wayfarer shape) -->
  <g>
    <path d="M 178 150 L 334 150 L 322 195 L 190 195 Z" fill="#ff5e5b" stroke="#1e1d1b" stroke-width="6" />
    <polygon points="190,156 240,156 210,189 190,189" fill="#ffffff" opacity="0.65" />
    <polygon points="260,156 280,156 270,189 250,189" fill="#ffffff" opacity="0.45" />
    <line x1="285" y1="165" x2="320" y2="165" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
  </g>
</svg>"""

# 3. developer_avatar_stressed.svg - Stressed User Avatar (Transparent Background)
svg_stressed = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <!-- FIRE ACCENTS -->
  <g transform="translate(65, 35)">
    <path d="M 40 80 C 10 50, 20 20, 40 0 C 60 25, 80 45, 70 80 Z" fill="#ff5e5b" stroke="#1e1d1b" stroke-width="3" />
    <path d="M 42 75 C 25 55, 30 35, 42 20 C 52 35, 62 50, 55 75 Z" fill="#ffe866" />
  </g>

  <!-- ALERTS -->
  <g transform="translate(20, 115) rotate(-10)">
    <rect x="0" y="0" width="120" height="36" rx="6" fill="#ff5e5b" stroke="#1e1d1b" stroke-width="4" />
    <text x="60" y="24" font-family="monospace" font-weight="900" font-size="14" fill="#ffffff" text-anchor="middle">🚨 500 ERROR</text>
  </g>

  <g transform="translate(370, 125) rotate(8)">
    <rect x="0" y="0" width="125" height="34" rx="6" fill="#ffe866" stroke="#1e1d1b" stroke-width="3" />
    <text x="62" y="22" font-family="monospace" font-weight="900" font-size="11" fill="#1e1d1b" text-anchor="middle">p99 &gt; 4800ms</text>
  </g>

  <!-- USER T-SHIRT -->
  <path d="M 105 480 C 120 370, 175 330, 256 330 C 337 330, 392 370, 407 480 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="4" />

  <!-- STEAMING COFFEE MUG IN HAND -->
  <g transform="translate(345, 345) rotate(-10)">
    <rect x="0" y="0" width="55" height="65" rx="8" fill="#ffffff" stroke="#1e1d1b" stroke-width="4" />
    <path d="M 55 12 C 75 12, 75 50, 55 50" fill="none" stroke="#1e1d1b" stroke-width="5" />
    <text x="27" y="40" font-family="monospace" font-weight="900" font-size="12" fill="#ff5e5b" text-anchor="middle">LOGS</text>
    <path d="M 15 -10 Q 25 -20 15 -30" fill="none" stroke="#57534e" stroke-width="3" stroke-linecap="round" />
  </g>

  <!-- NECK & FACE -->
  <rect x="220" y="260" width="72" height="80" rx="8" fill="#e0a96d" stroke="#1e1d1b" stroke-width="4" />
  <path d="M 166 175 C 166 288, 346 288, 346 175 C 346 110, 166 110, 166 175 Z" fill="#e0a96d" stroke="#1e1d1b" stroke-width="5" />

  <!-- Sweat drop -->
  <path d="M 325 150 C 325 165, 338 175, 338 162 C 338 150, 325 140, 325 150 Z" fill="#3498db" stroke="#1e1d1b" stroke-width="2" />

  <!-- USER'S BEARD -->
  <path d="M 170 195 C 170 282, 342 282, 342 195 C 342 250, 310 278, 256 278 C 202 278, 170 250, 170 195 Z" fill="#1e1d1b" />
  <path d="M 215 245 Q 235 260 256 245 Q 275 230 295 248" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />

  <!-- Panicked eyes behind crooked sunglasses -->
  <g transform="rotate(-6 256 175)">
    <path d="M 180 150 L 246 150 L 240 195 C 215 200, 190 200, 184 190 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="5" />
    <path d="M 266 150 L 332 150 L 328 190 C 322 200, 297 200, 272 195 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="5" />
    <line x1="246" y1="158" x2="266" y2="158" stroke="#1e1d1b" stroke-width="6" />
    <circle cx="213" cy="172" r="6" fill="#ff5e5b" />
    <circle cx="299" cy="172" r="6" fill="#ff5e5b" />
  </g>

  <!-- SPIKY HAIR WITH FLAME -->
  <path d="M 160 170 C 140 95, 165 40, 220 45 C 240 20, 280 15, 310 40 C 350 45, 370 95, 352 170 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="5" />
  <path d="M 200 60 L 220 25 L 245 55 L 270 15 L 295 50 Z" fill="#ff5e5b" stroke="#1e1d1b" stroke-width="3" />
</svg>"""

# 4. developer_avatar_success.svg - Success User Avatar (Transparent Background)
svg_success = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <!-- BADGES -->
  <g transform="translate(25, 80) rotate(-6)">
    <rect x="0" y="0" width="115" height="36" rx="6" fill="#2ecc71" stroke="#1e1d1b" stroke-width="4" />
    <text x="57" y="24" font-family="monospace" font-weight="900" font-size="13" fill="#1e1d1b" text-anchor="middle">✔ DEPLOYED</text>
  </g>
  <g transform="translate(370, 85) rotate(8)">
    <rect x="0" y="0" width="115" height="34" rx="6" fill="#ffe866" stroke="#1e1d1b" stroke-width="3" />
    <text x="57" y="22" font-family="monospace" font-weight="900" font-size="11" fill="#1e1d1b" text-anchor="middle">TESTS 100%</text>
  </g>

  <!-- USER's T-SHIRT -->
  <path d="M 105 480 C 120 370, 175 330, 256 330 C 337 330, 392 370, 407 480 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="4" />
  <path d="M 200 330 L 256 410 L 312 330" fill="#2ecc71" stroke="#1e1d1b" stroke-width="4" />

  <!-- THUMBS UP HAND -->
  <g transform="translate(365, 305) rotate(10)">
    <rect x="10" y="70" width="50" height="40" rx="6" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="3" />
    <rect x="15" y="35" width="40" height="45" rx="10" fill="#e0a96d" stroke="#1e1d1b" stroke-width="4" />
    <rect x="15" y="-5" width="22" height="45" rx="11" fill="#e0a96d" stroke="#1e1d1b" stroke-width="4" />
  </g>

  <!-- HEADPHONES AROUND NECK -->
  <rect x="135" y="290" width="32" height="48" rx="8" fill="#2ecc71" stroke="#1e1d1b" stroke-width="4" transform="rotate(-15 151 314)" />
  <rect x="345" y="290" width="32" height="48" rx="8" fill="#2ecc71" stroke="#1e1d1b" stroke-width="4" transform="rotate(15 361 314)" />

  <!-- NECK & FACE -->
  <rect x="220" y="260" width="72" height="80" rx="8" fill="#e0a96d" stroke="#1e1d1b" stroke-width="4" />
  <path d="M 166 175 C 166 288, 346 288, 346 175 C 346 110, 166 110, 166 175 Z" fill="#e0a96d" stroke="#1e1d1b" stroke-width="5" />

  <!-- USER'S BEARD -->
  <path d="M 170 195 C 170 282, 342 282, 342 195 C 342 250, 310 278, 256 278 C 202 278, 170 250, 170 195 Z" fill="#1e1d1b" />
  <path d="M 215 235 Q 256 270 297 235 Z" fill="#ffffff" stroke="#1e1d1b" stroke-width="4" />

  <!-- USER'S SUNGLASSES -->
  <g>
    <path d="M 180 150 L 246 150 L 240 195 C 215 200, 190 200, 184 190 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="5" />
    <path d="M 266 150 L 332 150 L 328 190 C 322 200, 297 200, 272 195 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="5" />
    <polygon points="190,158 215,158 198,188 190,188" fill="#2ecc71" opacity="0.75" />
    <polygon points="276,158 301,158 284,188 276,188" fill="#2ecc71" opacity="0.75" />
  </g>

  <!-- USER'S POMPADOUR HAIR -->
  <path d="M 160 170 C 145 100, 160 40, 220 30 C 256 20, 295 25, 330 45 C 365 75, 370 115, 352 170 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="5" />
  <path d="M 210 70 C 230 35, 280 35, 310 70 Z" fill="#2ecc71" stroke="#1e1d1b" stroke-width="3" />
</svg>"""

# 5. developer_avatar_thinking.svg - Thinking User Avatar (Transparent Background)
svg_thinking = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <!-- NODES -->
  <g transform="translate(30, 65) rotate(-5)">
    <rect x="0" y="0" width="88" height="36" rx="6" fill="#3498db" stroke="#1e1d1b" stroke-width="3" />
    <text x="44" y="23" font-family="monospace" font-weight="900" font-size="12" fill="#ffffff" text-anchor="middle">💾 Postgres</text>
  </g>
  <g transform="translate(380, 70) rotate(6)">
    <rect x="0" y="0" width="88" height="36" rx="6" fill="#ff5e5b" stroke="#1e1d1b" stroke-width="3" />
    <text x="44" y="23" font-family="monospace" font-weight="900" font-size="12" fill="#ffffff" text-anchor="middle">⚡ Redis</text>
  </g>
  <g transform="translate(230, 15)">
    <circle cx="26" cy="26" r="24" fill="#ffe866" stroke="#1e1d1b" stroke-width="4" />
    <text x="26" y="34" font-family="sans-serif" font-weight="900" font-size="22" text-anchor="middle">💡</text>
  </g>

  <!-- USER'S T-SHIRT -->
  <path d="M 105 480 C 120 370, 175 330, 256 330 C 337 330, 392 370, 407 480 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="4" />

  <!-- HAND ON CHIN THINKING POSE -->
  <g transform="translate(225, 250)">
    <path d="M 80 180 Q 70 80 30 25" fill="none" stroke="#1e1d1b" stroke-width="26" stroke-linecap="round" />
    <circle cx="30" cy="25" r="18" fill="#e0a96d" stroke="#1e1d1b" stroke-width="4" />
  </g>

  <!-- NECK & FACE -->
  <rect x="220" y="260" width="72" height="80" rx="8" fill="#e0a96d" stroke="#1e1d1b" stroke-width="4" />
  <path d="M 166 175 C 166 288, 346 288, 346 175 C 346 110, 166 110, 166 175 Z" fill="#e0a96d" stroke="#1e1d1b" stroke-width="5" />

  <!-- USER'S BEARD -->
  <path d="M 170 195 C 170 282, 342 282, 342 195 C 342 250, 310 278, 256 278 C 202 278, 170 250, 170 195 Z" fill="#1e1d1b" />
  <path d="M 230 242 Q 250 248 270 240" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />

  <!-- USER'S SUNGLASSES -->
  <g>
    <path d="M 180 150 L 246 150 L 240 195 C 215 200, 190 200, 184 190 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="5" />
    <path d="M 266 150 L 332 150 L 328 190 C 322 200, 297 200, 272 195 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="5" />
    <polygon points="190,158 215,158 198,188 190,188" fill="#ffffff" opacity="0.45" />
    <polygon points="276,158 301,158 284,188 276,188" fill="#ffffff" opacity="0.45" />
  </g>

  <!-- USER'S POMPADOUR HAIR -->
  <path d="M 160 170 C 145 100, 160 40, 220 30 C 256 20, 295 25, 330 45 C 365 75, 370 115, 352 170 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="5" />
  <path d="M 210 70 C 230 35, 280 35, 310 70 Z" fill="#ffe866" stroke="#1e1d1b" stroke-width="3" />
</svg>"""

# 6. favicon.svg - Vector Avatar Favicon of User's Face (Transparent Background)
svg_favicon = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
  <!-- USER'S FACE FAVICON ICON -->
  <!-- Ears -->
  <circle cx="22" cy="64" r="10" fill="#e0a96d" stroke="#1e1d1b" stroke-width="4" />
  <circle cx="106" cy="64" r="10" fill="#e0a96d" stroke="#1e1d1b" stroke-width="4" />

  <!-- Face Contour -->
  <path d="M 26 50 C 26 98, 102 98, 102 50 C 102 24, 26 24, 26 50 Z" fill="#e0a96d" stroke="#1e1d1b" stroke-width="6" />

  <!-- User Beard -->
  <path d="M 28 58 C 28 95, 100 95, 100 58 C 100 84, 85 94, 64 94 C 43 94, 28 84, 28 58 Z" fill="#1e1d1b" />
  <path d="M 52 76 Q 64 84 76 76" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />

  <!-- User Sunglasses (Wayfarer shape) -->
  <path d="M 32 44 L 60 44 L 56 64 C 46 66, 36 66, 34 60 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="3" />
  <path d="M 68 44 L 96 44 L 94 60 C 92 66, 82 66, 72 64 Z" fill="#1e1d1b" stroke="#1e1d1b" stroke-width="3" />
  <polygon points="36,46 48,46 42,60 36,60" fill="#ffffff" opacity="0.5" />
  <polygon points="72,46 84,46 78,60 72,60" fill="#ffffff" opacity="0.5" />
  <line x1="56" y1="48" x2="68" y2="48" stroke="#1e1d1b" stroke-width="4" />

  <!-- User Pompadour Hair -->
  <path d="M 24 48 C 20 22, 38 8, 64 8 C 90 8, 108 22, 104 48 C 92 28, 78 26, 64 28 C 50 26, 36 28, 24 48 Z" fill="#1e1d1b" />
  <path d="M 46 16 C 54 4, 74 4, 82 16 Z" fill="#ffe866" stroke="#1e1d1b" stroke-width="3" />
</svg>"""

files_to_write = {
    os.path.join(public_dir, "developer_avatar.svg"): svg_main,
    os.path.join(public_dir, "developer_avatar_security.svg"): svg_security,
    os.path.join(public_dir, "developer_avatar_stressed.svg"): svg_stressed,
    os.path.join(public_dir, "developer_avatar_success.svg"): svg_success,
    os.path.join(public_dir, "developer_avatar_thinking.svg"): svg_thinking,
    os.path.join(public_dir, "favicon.svg"): svg_favicon,
    os.path.join(app_dir, "favicon.svg"): svg_favicon,
}

for path, content in files_to_write.items():
    with open(path, "w") as f:
        f.write(content)
    print("Wrote user vector SVG:", path)

# Convert SVGs to PNGs & ICOs with transparent background
conversions = [
    (os.path.join(public_dir, "developer_avatar.svg"), os.path.join(public_dir, "developer_avatar.png"), "512x512"),
    (os.path.join(public_dir, "developer_avatar_security.svg"), os.path.join(public_dir, "developer_avatar_security.png"), "512x512"),
    (os.path.join(public_dir, "developer_avatar_stressed.svg"), os.path.join(public_dir, "developer_avatar_stressed.png"), "512x512"),
    (os.path.join(public_dir, "developer_avatar_success.svg"), os.path.join(public_dir, "developer_avatar_success.png"), "512x512"),
    (os.path.join(public_dir, "developer_avatar_thinking.svg"), os.path.join(public_dir, "developer_avatar_thinking.png"), "512x512"),
    (os.path.join(public_dir, "favicon.svg"), os.path.join(public_dir, "favicon.ico"), "64x64"),
    (os.path.join(public_dir, "favicon.svg"), os.path.join(app_dir, "favicon.ico"), "64x64"),
    (os.path.join(public_dir, "favicon.svg"), os.path.join(public_dir, "apple-icon.png"), "180x180"),
]

for src, dst, resize in conversions:
    cmd = ["convert", "-background", "none", src, "-resize", resize, dst]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"Converted {src} -> {dst} ({resize})")
    else:
        print(f"Error converting {src}:", res.stderr)

print("All user photo-based 2D vector avatars & favicons updated successfully!")
