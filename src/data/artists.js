// Fictional artists and albums. Every album is sold in two formats:
// a physical copy (shipped) and a digital copy (licensed download).
// `colors` drive the CSS gradient used as album cover art.

const artists = [
  {
    id: 'nova-reyes',
    name: 'Nova Reyes',
    genre: 'R&B',
    hometown: 'Queens, NY',
    bio: 'Late-night soul with warm synths and close-mic vocals.',
    albums: [
      {
        id: 'nr-midnight-transit',
        title: 'Midnight Transit',
        year: 2025,
        tracks: 11,
        colors: ['#1d2b64', '#f8cdda'],
        physical: { label: 'Vinyl LP', price: 29.99, stock: 4 },
        digital: { label: 'Digital album (WAV)', price: 9.99 },
      },
      {
        id: 'nr-glass-hours',
        title: 'Glass Hours',
        year: 2023,
        tracks: 9,
        colors: ['#4b134f', '#c94b4b'],
        physical: { label: 'CD', price: 14.99, stock: 0 },
        digital: { label: 'Digital album (WAV)', price: 8.99 },
      },
    ],
  },
  {
    id: 'the-ferry-line',
    name: 'The Ferry Line',
    genre: 'Indie Rock',
    hometown: 'Staten Island, NY',
    bio: 'Four-piece guitar band writing loud songs about quiet commutes.',
    albums: [
      {
        id: 'fl-harbor-lights',
        title: 'Harbor Lights',
        year: 2026,
        tracks: 12,
        colors: ['#f7971e', '#ffd200'],
        physical: { label: 'Vinyl LP', price: 27.99, stock: 12 },
        digital: { label: 'Digital album (WAV)', price: 10.99 },
      },
      {
        id: 'fl-saltwater',
        title: 'Saltwater EP',
        year: 2024,
        tracks: 5,
        colors: ['#136a8a', '#267871'],
        physical: { label: 'Cassette', price: 11.99, stock: 7 },
        digital: { label: 'Digital EP (WAV)', price: 4.99 },
      },
    ],
  },
  {
    id: 'kavi-lanka',
    name: 'Kavi',
    genre: 'Hip-Hop',
    hometown: 'Colombo, Sri Lanka',
    bio: 'Bilingual verses over sampled baila horns and heavy drums.',
    albums: [
      {
        id: 'kv-monsoon-tapes',
        title: 'Monsoon Tapes',
        year: 2025,
        tracks: 14,
        colors: ['#0f2027', '#2c5364'],
        physical: { label: 'Vinyl 2xLP', price: 34.99, stock: 2 },
        digital: { label: 'Digital album (WAV)', price: 11.99 },
      },
    ],
  },
  {
    id: 'aurora-hale',
    name: 'Aurora Hale',
    genre: 'Electronic',
    hometown: 'Reykjavík, Iceland',
    bio: 'Glacial ambient techno built from field recordings.',
    albums: [
      {
        id: 'ah-ice-memory',
        title: 'Ice Memory',
        year: 2026,
        tracks: 8,
        colors: ['#00c6ff', '#0072ff'],
        physical: { label: 'Vinyl LP', price: 31.99, stock: 6 },
        digital: { label: 'Digital album (WAV)', price: 9.99 },
      },
      {
        id: 'ah-polar-night',
        title: 'Polar Night',
        year: 2022,
        tracks: 10,
        colors: ['#232526', '#414345'],
        physical: { label: 'CD', price: 13.99, stock: 3 },
        digital: { label: 'Digital album (WAV)', price: 7.99 },
      },
    ],
  },
  {
    id: 'delta-june',
    name: 'Delta June',
    genre: 'Jazz',
    hometown: 'New Orleans, LA',
    bio: 'Trumpet-led quintet playing modern takes on second-line rhythms.',
    albums: [
      {
        id: 'dj-blue-porch',
        title: 'Blue Porch',
        year: 2024,
        tracks: 7,
        colors: ['#283c86', '#45a247'],
        physical: { label: 'Vinyl LP', price: 26.99, stock: 9 },
        digital: { label: 'Digital album (WAV)', price: 8.99 },
      },
    ],
  },
]

export default artists
