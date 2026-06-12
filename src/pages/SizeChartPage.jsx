import React from 'react';

// Highly detailed vector SVG illustrations matching the drawings, updated to use text-zinc-300
const KidsSVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-44 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="1.2">
    {/* T-Shirt Outline */}
    <path d="M70 42h60l28 22-16 22-12-8v82H75v-82L63 86 47 64z" strokeLinejoin="round" />
    {/* Collar */}
    <path d="M85 42c0 6 30 6 30 0" />
    <path d="M82 42c0 9 36 9 36 0" strokeWidth="0.8" />
    {/* Sleeve cuff lines */}
    <line x1="147" y1="64" x2="137" y2="76" strokeWidth="0.8" />
    <line x1="53" y1="64" x2="63" y2="76" strokeWidth="0.8" />
    {/* Hem stitching line */}
    <line x1="75" y1="156" x2="125" y2="156" strokeWidth="0.8" strokeDasharray="1 1" />
    {/* Panjang (left) */}
    <line x1="38" y1="38" x2="38" y2="162" stroke="currentColor" strokeWidth="1" />
    <text x="32" y="105" fill="currentColor" fontSize="8" textAnchor="middle" transform="rotate(-90 32 105)">Panjang (cm)</text>
    {/* Lebar (bottom) */}
    <line x1="55" y1="172" x2="145" y2="172" stroke="currentColor" strokeWidth="1" />
    <text x="100" y="184" fill="currentColor" fontSize="8" textAnchor="middle">Lebar (cm)</text>
    {/* Lengan (top right sleeve) */}
    <line x1="140" y1="36" x2="170" y2="58" stroke="currentColor" strokeWidth="1" />
    <text x="156" y="32" fill="currentColor" fontSize="7" transform="rotate(36 156 32)" textAnchor="middle">Lengan (cm)</text>
  </svg>
);

const BoxySVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-44 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="1.2">
    {/* Boxy fit drop shoulder outline */}
    <path d="M55 45h90l32 25-15 18-17-7v75H55V81L38 88 23 63z" strokeLinejoin="round" />
    <path d="M85 45c0 7 30 7 30 0" />
    {/* Shoulder seams showing dropped shoulders */}
    <line x1="72" y1="45" x2="72" y2="62" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
    <line x1="128" y1="45" x2="128" y2="62" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
    {/* Panjang Badan */}
    <line x1="35" y1="45" x2="35" y2="156" stroke="currentColor" strokeWidth="1" />
    <text x="29" y="100" fill="currentColor" fontSize="7" textAnchor="middle" transform="rotate(-90 29 100)">Panjang Badan</text>
    {/* Lebar Badan */}
    <line x1="55" y1="166" x2="145" y2="166" stroke="currentColor" strokeWidth="1" />
    <text x="100" y="177" fill="currentColor" fontSize="7" textAnchor="middle">Lebar Badan</text>
    {/* Lebar Bahu */}
    <line x1="72" y1="36" x2="128" y2="36" stroke="currentColor" strokeWidth="1" />
    <polygon points="72,36 78,34 78,38" fill="currentColor" stroke="none" />
    <polygon points="128,36 122,34 122,38" fill="currentColor" stroke="none" />
    <text x="100" y="30" fill="currentColor" fontSize="7" textAnchor="middle">Lebar Bahu</text>
    {/* Lengan */}
    <line x1="130" y1="39" x2="165" y2="65" stroke="currentColor" strokeWidth="1" />
    <text x="150" y="35" fill="currentColor" fontSize="7" textAnchor="middle" transform="rotate(36 150 35)">Panjang Lengan</text>
  </svg>
);

const OversizeSVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-44 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="1.2">
    {/* Oversized tee (loose fit, longer sleeve) */}
    <path d="M58 40h84l36 30-18 20-22-10v75H62V80L40 90 22 70z" strokeLinejoin="round" />
    <path d="M85 40c0 7 30 7 30 0" />
    <path d="M82 40c0 10 36 10 36 0" strokeWidth="0.8" />
    {/* Panjang */}
    <line x1="35" y1="40" x2="35" y2="155" stroke="currentColor" strokeWidth="1" />
    <text x="29" y="98" fill="currentColor" fontSize="8" textAnchor="middle" transform="rotate(-90 29 98)">Panjang (cm)</text>
    {/* Lebar */}
    <line x1="55" y1="165" x2="145" y2="165" stroke="currentColor" strokeWidth="1" />
    <text x="100" y="177" fill="currentColor" fontSize="8" textAnchor="middle">Lebar (cm)</text>
    {/* Lengan */}
    <line x1="140" y1="36" x2="172" y2="60" stroke="currentColor" strokeWidth="1" />
    <text x="157" y="32" fill="currentColor" fontSize="7" transform="rotate(36 157 32)" textAnchor="middle">Lengan (cm)</text>
  </svg>
);

const LongSleeveSVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-44 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="1.2">
    {/* Long sleeve outline */}
    <path d="M70 42h60l25 18-12 85-11-2v15H78v-15l-11 2-12-85z" strokeLinejoin="round" />
    <path d="M85 42c0 6 30 6 30 0" />
    <path d="M82 42c0 9 36 9 36 0" strokeWidth="0.8" />
    {/* Sleeve cuff lines */}
    <line x1="133" y1="142" x2="143" y2="144" strokeWidth="0.8" />
    <line x1="67" y1="142" x2="57" y2="144" strokeWidth="0.8" />
    {/* Panjang */}
    <line x1="38" y1="38" x2="38" y2="162" stroke="currentColor" strokeWidth="1" />
    <text x="32" y="100" fill="currentColor" fontSize="8" textAnchor="middle" transform="rotate(-90 32 100)">Panjang (cm)</text>
    {/* Lebar */}
    <line x1="55" y1="172" x2="145" y2="172" stroke="currentColor" strokeWidth="1" />
    <text x="100" y="184" fill="currentColor" fontSize="8" textAnchor="middle">Lebar (cm)</text>
    {/* Lengan */}
    <line x1="135" y1="36" x2="155" y2="90" stroke="currentColor" strokeWidth="1" />
    <text x="149" y="58" fill="currentColor" fontSize="7" transform="rotate(70 149 58)" textAnchor="middle">Lengan (cm)</text>
  </svg>
);

const ShortSleeveSVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-44 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="1.2">
    {/* T-Shirt Outline */}
    <path d="M70 42h60l28 22-16 22-12-8v82H75v-82L63 86 47 64z" strokeLinejoin="round" />
    {/* Collar */}
    <path d="M85 42c0 6 30 6 30 0" />
    <path d="M82 42c0 9 36 9 36 0" strokeWidth="0.8" />
    {/* Sleeve cuff lines */}
    <line x1="147" y1="64" x2="137" y2="76" strokeWidth="0.8" />
    <line x1="53" y1="64" x2="63" y2="76" strokeWidth="0.8" />
    {/* Hem stitching line */}
    <line x1="75" y1="156" x2="125" y2="156" strokeWidth="0.8" strokeDasharray="1 1" />
    {/* Panjang */}
    <line x1="38" y1="38" x2="38" y2="162" stroke="currentColor" strokeWidth="1" />
    <text x="32" y="105" fill="currentColor" fontSize="8" textAnchor="middle" transform="rotate(-90 32 105)">Panjang (cm)</text>
    {/* Lebar */}
    <line x1="55" y1="172" x2="145" y2="172" stroke="currentColor" strokeWidth="1" />
    <text x="100" y="184" fill="currentColor" fontSize="8" textAnchor="middle">Lebar (cm)</text>
    {/* Lengan */}
    <line x1="140" y1="36" x2="170" y2="58" stroke="currentColor" strokeWidth="1" />
    <text x="156" y="32" fill="currentColor" fontSize="7" transform="rotate(36 156 32)" textAnchor="middle">Lengan (cm)</text>
  </svg>
);

const PoloSVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-44 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M70 42h60l28 22-16 22-12-8v82H75v-82L63 86 47 64z" strokeLinejoin="round" />
    {/* Collar folds */}
    <path d="M78 42l22 15 22-15" strokeLinejoin="round" />
    <path d="M85 42l15 15 15-15" strokeWidth="0.8" />
    <path d="M100 57v25" />
    <circle cx="100" cy="65" r="1.5" fill="currentColor" />
    <circle cx="100" cy="74" r="1.5" fill="currentColor" />
    {/* Panjang */}
    <line x1="38" y1="38" x2="38" y2="162" stroke="currentColor" strokeWidth="1" />
    <text x="32" y="105" fill="currentColor" fontSize="8" textAnchor="middle" transform="rotate(-90 32 105)">Panjang (cm)</text>
    {/* Lebar */}
    <line x1="55" y1="172" x2="145" y2="172" stroke="currentColor" strokeWidth="1" />
    <text x="100" y="184" fill="currentColor" fontSize="8" textAnchor="middle">Lebar (cm)</text>
  </svg>
);

const VestSVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-44 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="1.2">
    {/* Highly detailed utility vest outline */}
    <path d="M72 40h56l16 25v95H56V65z" strokeLinejoin="round" />
    {/* V-Neck opening */}
    <path d="M72 40l28 45 28-45" />
    {/* Center Zipper Line */}
    <line x1="100" y1="85" x2="100" y2="160" />
    {/* Chest Pockets */}
    <path d="M68 80c0-3 18-3 18 0v4H68z" fill="none" strokeLinejoin="round" />
    <path d="M114 80c0-3 18-3 18 0v4h-18z" fill="none" strokeLinejoin="round" />
    <rect x="68" y="84" width="18" height="15" rx="1" />
    <rect x="114" y="84" width="18" height="15" rx="1" />
    <circle cx="77" cy="80" r="1" fill="currentColor" />
    <circle cx="123" cy="80" r="1" fill="currentColor" />
    {/* Waist Pockets */}
    <path d="M62 110c0-4 32-4 32 0v5H62z" fill="none" strokeLinejoin="round" />
    <path d="M106 110c0-4 32-4 32 0v5h-32z" fill="none" strokeLinejoin="round" />
    <rect x="62" y="115" width="32" height="25" rx="2" />
    <rect x="106" y="115" width="32" height="25" rx="2" />
    <circle cx="78" cy="110" r="1.5" fill="currentColor" />
    <circle cx="122" cy="110" r="1.5" fill="currentColor" />
    {/* Panjang */}
    <line x1="38" y1="38" x2="38" y2="162" stroke="currentColor" strokeWidth="1" />
    <text x="32" y="100" fill="currentColor" fontSize="8" textAnchor="middle" transform="rotate(-90 32 100)">Panjang (cm)</text>
    {/* Lebar */}
    <line x1="55" y1="172" x2="145" y2="172" stroke="currentColor" strokeWidth="1" />
    <text x="100" y="184" fill="currentColor" fontSize="8" textAnchor="middle">Lebar (cm)</text>
  </svg>
);

const HoodieSVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-44 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="1.2">
    {/* Detailed hoodie with drawstring & pocket */}
    <path d="M70 55h60l25 18-10 82-12-3v10H77v-10l-12 3-12-82z" strokeLinejoin="round" />
    {/* Hood */}
    <path d="M78 55c-2-20 44-20 44 0" />
    <path d="M72 55c-4-24 56-24 56 0" />
    {/* Hood opening inside */}
    <path d="M85 55c5-8 25-8 30 0" />
    {/* Drawstrings */}
    <line x1="93" y1="57" x2="93" y2="95" />
    <circle cx="93" cy="95" r="1" fill="currentColor" />
    <line x1="107" y1="57" x2="107" y2="95" />
    <circle cx="107" cy="95" r="1" fill="currentColor" />
    {/* Kangaroo Pocket */}
    <path d="M80 120h40l8 20H72z" strokeLinejoin="round" />
    {/* Ribbed cuffs & hem */}
    <rect x="77" y="162" width="46" height="8" rx="1" />
    <line x1="82" y1="162" x2="82" y2="170" strokeWidth="0.8" />
    <line x1="88" y1="162" x2="88" y2="170" strokeWidth="0.8" />
    <line x1="94" y1="162" x2="94" y2="170" strokeWidth="0.8" />
    <line x1="100" y1="162" x2="100" y2="170" strokeWidth="0.8" />
    <line x1="106" y1="162" x2="106" y2="170" strokeWidth="0.8" />
    <line x1="112" y1="162" x2="112" y2="170" strokeWidth="0.8" />
    <line x1="118" y1="162" x2="118" y2="170" strokeWidth="0.8" />
    {/* Panjang */}
    <line x1="38" y1="50" x2="38" y2="170" stroke="currentColor" strokeWidth="1" />
    <text x="32" y="110" fill="currentColor" fontSize="8" textAnchor="middle" transform="rotate(-90 32 110)">Panjang (cm)</text>
    {/* Lebar */}
    <line x1="55" y1="180" x2="145" y2="180" stroke="currentColor" strokeWidth="1" />
    <text x="100" y="192" fill="currentColor" fontSize="8" textAnchor="middle">Lebar (cm)</text>
    {/* Lengan */}
    <line x1="145" y1="58" x2="165" y2="132" stroke="currentColor" strokeWidth="1" />
    <text x="160" y="95" fill="currentColor" fontSize="7" transform="rotate(75 160 95)" textAnchor="middle">Lengan (cm)</text>
  </svg>
);

const ShirtSVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-44 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="1.2">
    {/* Collared open-neck shirt (Short sleeve shirt style) */}
    <path d="M68 40h64l28 20-16 22-12-8v86H76v-86L64 82 52 60z" strokeLinejoin="round" />
    {/* Open collar fold */}
    <path d="M68 40l18 18h28l18-18" strokeLinejoin="round" />
    <path d="M86 58l14 10 14-10" />
    {/* Button placket */}
    <line x1="100" y1="68" x2="100" y2="160" />
    {/* Buttons */}
    <circle cx="100" cy="80" r="1.5" fill="currentColor" />
    <circle cx="100" cy="100" r="1.5" fill="currentColor" />
    <circle cx="100" cy="120" r="1.5" fill="currentColor" />
    <circle cx="100" cy="140" r="1.5" fill="currentColor" />
    {/* Pocket */}
    <rect x="110" y="75" width="16" height="20" rx="1" />
    {/* Panjang */}
    <line x1="38" y1="38" x2="38" y2="162" stroke="currentColor" strokeWidth="1" />
    <text x="32" y="100" fill="currentColor" fontSize="8" textAnchor="middle" transform="rotate(-90 32 100)">Panjang (cm)</text>
    {/* Lebar */}
    <line x1="55" y1="172" x2="145" y2="172" stroke="currentColor" strokeWidth="1" />
    <text x="100" y="184" fill="currentColor" fontSize="8" textAnchor="middle">Lebar (cm)</text>
    {/* Lengan */}
    <line x1="140" y1="36" x2="170" y2="58" stroke="currentColor" strokeWidth="1" />
    <text x="156" y="32" fill="currentColor" fontSize="7" transform="rotate(36 156 32)" textAnchor="middle">Lengan (cm)</text>
  </svg>
);

const SIZE_CHARTS = [
  {
    id: 'kids',
    title: 'KIDS SIZE',
    SVG: KidsSVG,
    columns: ['Size', 'Panjang', 'Lebar', 'Lengan Pendek', 'Lengan Panjang'],
    rows: [
      { size: 'XS', values: ['40', '28', '11', '35'] },
      { size: 'S', values: ['44', '31', '13', '39'] },
      { size: 'M', values: ['48', '35', '15', '43'] },
      { size: 'L', values: ['54', '40', '17', '48'] },
      { size: 'XL', values: ['61', '44', '19', '55'] }
    ]
  },
  {
    id: 'boxy',
    title: 'BOXY FIT',
    SVG: BoxySVG,
    columns: ['Size', 'Panjang Badan', 'Lebar Badan', 'Lebar Bahu', 'Panjang Lengan', 'Lingkar Lengan'],
    rows: [
      { size: 'S', values: ['65', '56', '20', '19.5', '36'] },
      { size: 'M', values: ['67', '58', '21', '20.5', '38'] },
      { size: 'L', values: ['69', '60', '22', '21.5', '40'] },
      { size: 'XL', values: ['71', '64', '23', '22.5', '42'] },
      { size: 'XXL', values: ['73', '66', '24', '23.5', '44'] }
    ]
  },
  {
    id: 'oversize',
    title: 'OVERSIZE FIT',
    SVG: OversizeSVG,
    columns: ['Size', 'Panjang', 'Lebar', 'Lengan'],
    rows: [
      { size: 'S', values: ['70', '53', '25'] },
      { size: 'M', values: ['72', '55', '25.5'] },
      { size: 'L', values: ['75', '59', '26.5'] },
      { size: 'XL', values: ['77', '62', '27'] },
      { size: 'XXL', values: ['79', '65', '27.5'] }
    ]
  },
  {
    id: 'long-sleeve',
    title: 'LONG SLEEVE',
    SVG: LongSleeveSVG,
    columns: ['Size', 'Panjang', 'Lebar', 'Lengan'],
    rows: [
      { size: 'S', values: ['68', '46', '56'] },
      { size: 'M', values: ['71', '48', '57'] },
      { size: 'L', values: ['73', '51', '58'] },
      { size: 'XL', values: ['75', '54', '59'] },
      { size: 'XXL', values: ['77', '56', '60'] },
      { size: '3XL', values: ['79', '58', '62'] },
      { size: '4XL', values: ['81', '61', '64'] },
      { size: '5XL', values: ['83', '64', '67'] },
      { size: '6XL', values: ['83', '67', '67'] }
    ]
  },
  {
    id: 'short-sleeve',
    title: 'SHORT SLEEVE',
    SVG: ShortSleeveSVG,
    columns: ['Size', 'Panjang', 'Lebar', 'Lengan'],
    rows: [
      { size: 'S', values: ['68', '46', '20'] },
      { size: 'M', values: ['71', '48', '21'] },
      { size: 'L', values: ['73', '51', '22'] },
      { size: 'XL', values: ['75', '54', '23'] },
      { size: 'XXL', values: ['77', '56', '24'] },
      { size: '3XL', values: ['79', '58', '25'] },
      { size: '4XL', values: ['81', '61', '26'] },
      { size: '5XL', values: ['83', '64', '27'] },
      { size: '6XL', values: ['83', '67', '28'] }
    ]
  },
  {
    id: 'polo',
    title: 'POLO SHIRT',
    SVG: PoloSVG,
    columns: ['Size', 'Panjang', 'Lebar', 'Lengan Pendek', 'Lengan Panjang'],
    rows: [
      { size: 'S', values: ['68', '46', '20', '56'] },
      { size: 'M', values: ['71', '48', '21', '57'] },
      { size: 'L', values: ['73', '51', '22', '58'] },
      { size: 'XL', values: ['75', '54', '23', '59'] },
      { size: 'XXL', values: ['77', '56', '24', '60'] },
      { size: '3XL', values: ['79', '58', '25', '62'] },
      { size: '4XL', values: ['81', '61', '27', '64'] },
      { size: '5XL', values: ['83', '64', '28', '67'] },
      { size: '6XL', values: ['83', '67', '28', '67'] }
    ]
  },
  {
    id: 'vest',
    title: 'VEST',
    SVG: VestSVG,
    columns: ['Size', 'Panjang', 'Lebar'],
    rows: [
      { size: 'S', values: ['63', '53'] },
      { size: 'M', values: ['65', '55'] },
      { size: 'L', values: ['67', '57'] },
      { size: 'XL', values: ['69', '59'] },
      { size: '2XL', values: ['71', '61'] },
      { size: '3XL', values: ['73', '63'] },
      { size: '4XL', values: ['75', '65'] }
    ]
  },
  {
    id: 'hoodie',
    title: 'HOODIE',
    SVG: HoodieSVG,
    columns: ['Size', 'Panjang', 'Lebar', 'Lengan'],
    rows: [
      { size: 'S', values: ['68', '48', '56'] },
      { size: 'M', values: ['72', '52', '57'] },
      { size: 'L', values: ['73', '54', '58'] },
      { size: 'XL', values: ['75', '58', '59'] },
      { size: 'XXL', values: ['79', '61', '60'] },
      { size: '3XL', values: ['84', '66', '62'] },
      { size: '4XL', values: ['87', '69', '64'] }
    ]
  },
  {
    id: 'shirt',
    title: 'SHIRT',
    SVG: ShirtSVG,
    columns: ['Size', 'Panjang', 'Lebar', 'Lengan Pendek', 'Lengan Panjang'],
    rows: [
      { size: 'S', values: ['69', '46', '20', '55'] },
      { size: 'M', values: ['71', '48', '21', '57'] },
      { size: 'L', values: ['73', '51', '22', '58'] },
      { size: 'XL', values: ['75', '54', '22', '59'] },
      { size: 'XXL', values: ['77', '56', '24', '60'] },
      { size: '3XL', values: ['79', '58', '25', '62'] },
      { size: '4XL', values: ['81', '61', '27', '64'] }
    ]
  }
];

const SizeChartPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: '#090909' }}>
      {/* Header */}
      <div className="border-b border-white/[0.05] py-16 mb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-cherry-500" />
            <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase">PANDUAN UKURAN</span>
            <span className="h-px w-8 bg-cherry-500" />
          </div>
          <h1 
            className="text-4xl md:text-6xl text-zinc-50 tracking-wider mb-4" 
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
          >
            SIZE CHART & SPESIFIKASI
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            Panduan standar ukuran pakaian konveksi UPPERINK untuk memudahkan kecocokan fitting pemesanan Anda
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SIZE_CHARTS.map((chart) => {
            const { SVG } = chart;
            return (
              <div 
                key={chart.id} 
                className="glass-card p-6 flex flex-col justify-between hover:border-cherry-500/30 transition-all duration-300 relative group"
                style={{ background: '#1A1819' }}
              >
                {/* Visual Illustration wrapper */}
                <div 
                  className="rounded-none p-4 flex items-center justify-center mb-6 border border-zinc-800 transition-colors group-hover:border-zinc-700"
                  style={{ background: '#090909' }}
                >
                  <SVG />
                </div>
                
                {/* Category Title */}
                <h3 
                  className="text-lg font-display text-zinc-100 mb-4 tracking-widest text-center border-b border-zinc-800 pb-3"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {chart.title}
                </h3>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-cherry-950/40 text-zinc-100 border-b border-zinc-800">
                        {chart.columns.map((col, idx) => (
                          <th key={idx} className="px-2.5 py-2.5 font-bold uppercase tracking-wider text-center text-[10px]">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900 text-zinc-400 font-medium">
                      {chart.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors border-b border-zinc-900">
                          <td className="px-2.5 py-2.5 font-bold text-zinc-200 text-center bg-white/[0.01]">
                            {row.size}
                          </td>
                          {row.values.map((val, valIdx) => (
                            <td key={valIdx} className="px-2.5 py-2.5 text-center">
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footnote */}
                <div className="mt-6 pt-3 border-t border-zinc-900 text-[10px] text-zinc-500 text-center italic">
                  *Toleransi &plusmn; 2 cm dari Size Chart
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SizeChartPage;
