export interface ColoringStylePreset {
  id: string;
  name: string;
  category: string;
  description: string;
  promptSuffix: string;
  sampleSvg: string;
}

export const COLORING_PRESETS: ColoringStylePreset[] = [
  {
    id: 'mandala-floral',
    name: 'Sacred Mandala & Florals',
    category: 'Adult Coloring',
    description: 'Intricate circular geometry with blooming lotus and botanical filigree.',
    promptSuffix: 'intricate black and white mandala line art, clean bold vector lines, pure white background, no shading, no grayscale, adult coloring book page, crisp printable 300 DPI vector style',
    sampleSvg: `
      <svg viewBox="0 0 400 400" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="400" fill="#ffffff" />
        <g stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Center Lotus -->
          <circle cx="200" cy="200" r="24" stroke-width="3" />
          <circle cx="200" cy="200" r="10" />
          <circle cx="200" cy="200" r="4" fill="#1e293b" />
          
          <!-- Radiating Petals Tier 1 -->
          <path d="M 200,176 C 185,150 185,130 200,110 C 215,130 215,150 200,176 Z" />
          <path d="M 200,224 C 185,250 185,270 200,290 C 215,270 215,250 200,224 Z" />
          <path d="M 176,200 C 150,185 130,185 110,200 C 130,215 150,215 176,200 Z" />
          <path d="M 224,200 C 250,185 270,185 290,200 C 270,215 250,215 224,200 Z" />

          <!-- Diagonal Petals -->
          <path d="M 183,183 C 160,165 145,150 135,135 C 150,145 165,160 183,183 Z" />
          <path d="M 217,183 C 240,165 255,150 265,135 C 250,145 235,160 217,183 Z" />
          <path d="M 183,217 C 160,235 145,250 135,265 C 150,255 165,240 183,217 Z" />
          <path d="M 217,217 C 240,235 255,250 265,265 C 250,255 235,240 217,217 Z" />

          <!-- Outer Ring Pattern -->
          <circle cx="200" cy="200" r="120" stroke-dasharray="8 6" />
          <circle cx="200" cy="200" r="150" stroke-width="3" />
          <circle cx="200" cy="200" r="175" stroke-width="2" />
          
          <!-- Outer Petal Crown -->
          <path d="M 200,50 C 170,80 180,110 200,150 C 220,110 230,80 200,50 Z" />
          <path d="M 200,350 C 170,320 180,290 200,250 C 220,290 230,320 200,350 Z" />
          <path d="M 50,200 C 80,170 110,180 150,200 C 110,220 80,230 50,200 Z" />
          <path d="M 350,200 C 320,170 290,180 250,200 C 290,220 320,230 350,200 Z" />
        </g>
      </svg>
    `
  },
  {
    id: 'cute-animals',
    name: 'Kawaii Animals & Woodlands',
    category: 'Kids & Beginners',
    description: 'Thick, forgiving bold borders suitable for toddler and young children coloring.',
    promptSuffix: 'simple cute toddler coloring page, thick bold outlines, friendly woodland animal cartoon, pure white background, low detail, no shading, high contrast, clean vector',
    sampleSvg: `
      <svg viewBox="0 0 400 400" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="400" fill="#ffffff" />
        <g stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Cute Bear Head -->
          <ellipse cx="200" cy="210" rx="90" ry="80" fill="#ffffff" />
          <!-- Bear Ears -->
          <circle cx="130" cy="140" r="32" fill="#ffffff" />
          <circle cx="130" cy="140" r="18" />
          <circle cx="270" cy="140" r="32" fill="#ffffff" />
          <circle cx="270" cy="140" r="18" />
          <!-- Bear Snout -->
          <ellipse cx="200" cy="230" rx="42" ry="32" />
          <path d="M 188,220 Q 200,210 212,220 Q 200,232 188,220 Z" fill="#0f172a" />
          <path d="M 200,226 L 200,242" />
          <path d="M 190,242 Q 200,250 210,242" />
          <!-- Eyes -->
          <circle cx="165" cy="195" r="10" fill="#0f172a" />
          <circle cx="162" cy="192" r="3" fill="#ffffff" />
          <circle cx="235" cy="195" r="10" fill="#0f172a" />
          <circle cx="232" cy="192" r="3" fill="#ffffff" />
          <!-- Cute Bow / Crown -->
          <path d="M 180,120 L 220,120 L 200,105 Z" fill="#ffffff" stroke-width="3" />
          <!-- Stars & Clouds decoration -->
          <path d="M 80,90 Q 95,75 110,90 Q 125,75 135,90 Q 145,105 130,115 Q 100,125 80,105 Z" />
          <path d="M 310,290 L 314,302 L 326,302 L 316,310 L 320,322 L 310,314 L 300,322 L 304,310 L 294,302 L 306,302 Z" />
        </g>
      </svg>
    `
  },
  {
    id: 'botanical-succulents',
    name: 'Botanical & Potted Plants',
    category: 'Relaxation & Aesthetic',
    description: 'Clean leafy illustrations of monstera, eucalyptus, and bohemian ceramic planters.',
    promptSuffix: 'botanical coloring page, monstera and house plants in ceramic pots, clean elegant black ink lines, no background texture, coloring book art, 300 DPI vector lines',
    sampleSvg: `
      <svg viewBox="0 0 400 400" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="400" fill="#ffffff" />
        <g stroke="#1e293b" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Ceramic Pot -->
          <path d="M 130,260 L 145,350 Q 200,360 255,350 L 270,260 Z" fill="#ffffff" />
          <path d="M 120,250 L 280,250 L 280,265 L 120,265 Z" />
          <!-- Pot Pattern -->
          <path d="M 155,290 L 200,320 L 245,290" stroke-width="2" />
          <path d="M 160,315 L 200,340 L 240,315" stroke-width="2" />
          
          <!-- Monstera Leaves -->
          <!-- Center Stem -->
          <path d="M 200,250 Q 200,160 190,80" stroke-width="3.5" />
          <!-- Large Left Leaf with Cutouts -->
          <path d="M 195,190 Q 110,170 100,110 Q 150,100 190,140" fill="#ffffff" />
          <path d="M 130,130 Q 150,145 160,150" stroke-width="2" />
          <path d="M 140,165 Q 165,165 175,170" stroke-width="2" />
          
          <!-- Top Right Leaf -->
          <path d="M 195,140 Q 280,120 290,60 Q 240,50 190,95" fill="#ffffff" />
          <path d="M 250,85 Q 230,98 220,105" stroke-width="2" />
          <path d="M 240,115 Q 220,122 210,128" stroke-width="2" />
          
          <!-- Hanging tendril -->
          <path d="M 150,250 Q 110,270 90,320" stroke-width="2" />
          <circle cx="95" cy="300" r="8" />
          <circle cx="90" cy="325" r="7" />
        </g>
      </svg>
    `
  },
  {
    id: 'mindful-affirmation',
    name: 'Affirmation & Lettering',
    category: 'Mindfulness & Mental Health',
    description: 'Beautiful bubble/script typography surrounded by floral borders for daily positive vibes.',
    promptSuffix: 'inspirational quote coloring page with floral ribbon frame, hand-drawn typography with open fillable letters, black and white coloring art, high quality lineart',
    sampleSvg: `
      <svg viewBox="0 0 400 400" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="400" fill="#ffffff" />
        <g stroke="#0f172a" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Decorative Oval Frame -->
          <rect x="40" y="40" width="320" height="320" rx="20" stroke-width="3" />
          <rect x="52" y="52" width="296" height="296" rx="14" stroke-dasharray="6 4" stroke-width="1.5" />
          
          <!-- Corner Florals -->
          <path d="M 40,40 Q 80,40 100,60 Q 120,40 160,40" />
          <path d="M 40,40 Q 40,80 60,100 Q 40,120 40,160" />
          
          <!-- Big Lettering "BE STILL & SHINE" -->
          <text x="200" y="150" text-anchor="middle" font-size="34" font-family="'Space Grotesk', sans-serif" font-weight="900" stroke="#0f172a" stroke-width="2" fill="#ffffff">YOU ARE</text>
          <text x="200" y="210" text-anchor="middle" font-size="44" font-family="'Space Grotesk', sans-serif" font-weight="900" stroke="#0f172a" stroke-width="2.5" fill="#ffffff">CAPABLE</text>
          <text x="200" y="265" text-anchor="middle" font-size="28" font-family="'Space Grotesk', sans-serif" font-weight="800" stroke="#0f172a" stroke-width="1.8" fill="#ffffff">& WORTHY</text>

          <!-- Underline Ribbon -->
          <path d="M 90,285 Q 200,305 310,285 L 300,295 Q 200,315 100,295 Z" stroke-width="2" fill="#ffffff" />
          
          <!-- Floating Stars -->
          <circle cx="100" cy="180" r="5" />
          <circle cx="300" cy="180" r="5" />
          <circle cx="200" cy="95" r="4" fill="#0f172a" />
        </g>
      </svg>
    `
  }
];
