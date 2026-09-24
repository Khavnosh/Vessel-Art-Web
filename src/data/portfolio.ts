export interface ArtPiece {
  id: string
  title: string
  year: string
  medium: string
  blurb: string
  /** CSS gradient used as a stand-in for the artwork */
  swatch: string
  tags: string[]
}

export interface WritingPiece {
  id: string
  title: string
  date: string
  form: string
  excerpt: string
  minutes: number
}

export const artPieces: ArtPiece[] = [
  {
    id: 'crosswalk',
    title: 'Crosswalk, After Rain',
    year: '2025',
    medium: 'Digital · ink & mass',
    blurb:
      'A figure waits at a wet crossing. Headlights stripe the asphalt; the structure of the city is just paint and patience.',
    swatch:
      'linear-gradient(90deg, transparent 42%, rgba(255,255,255,0.4) 42% 45%, transparent 45% 48%, rgba(255,255,255,0.4) 48% 51%, transparent 51%), linear-gradient(165deg, #d6d6d6 0%, #6a6a6a 45%, #0c0c0c 100%)',
    tags: ['illustration', 'street', 'night'],
  },
  {
    id: 'two-towers',
    title: 'Two Towers Over the Depot',
    year: '2025',
    medium: 'Digital · monolithic',
    blurb:
      'Twin high-rises watch a late freight yard. Cab lights drift like static; every window is a cut in the mass.',
    swatch:
      'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.45) 55%), linear-gradient(90deg, #d6d6d6 0 42%, transparent 42% 58%, #d6d6d6 58%), linear-gradient(180deg, #9a9a9a, #141414)',
    tags: ['architecture', 'mass', 'night'],
  },
  {
    id: 'risograph-overpass',
    title: 'Overpass That Keeps Score',
    year: '2026',
    medium: 'Risograph · black ink',
    blurb:
      'A concrete span tallies every bus that never reached the depot. Two-color print with intentional misregistration, like rush hour itself.',
    swatch:
      'repeating-linear-gradient(90deg, #f2f2f2 0 3px, transparent 3px 12px), linear-gradient(180deg, #0c0c0c, #6a6a6a 90%)',
    tags: ['print', 'transit', 'unfinished'],
  },
  {
    id: 'gold-thread',
    title: 'Continuous Line Transit Map',
    year: '2024',
    medium: 'Ink & digital cut',
    blurb:
      'A city transit chart stitched in a single continuous white line. Follow it past the last stop and you end up on a block that isn’t on any chart.',
    swatch:
      'conic-gradient(from 210deg at 50% 50%, #f2f2f2, #6a6a6a, #0c0c0c, #9a9a9a, #f2f2f2)',
    tags: ['maps', 'city', 'line'],
  },
  {
    id: 'familiar',
    title: 'Familiar (Study of Lumen)',
    year: '2026',
    medium: 'Digital · portrait',
    blurb:
      'Character study of the terminal face — a pocket messenger with too many moods and a load-bearing stare.',
    swatch:
      'radial-gradient(circle at 50% 40%, #fff 0%, #d6d6d6 35%, #6a6a6a 65%, #0c0c0c 100%)',
    tags: ['character', 'mascot', 'study'],
  },
  {
    id: 'half-lit',
    title: 'Half-Lit Loading Dock',
    year: '2024',
    medium: 'Digital · industrial',
    blurb:
      'Weeds that grow toward hard light through cracked pavement. Steel fixtures, pale leaves, a single white moth by the roll-up door.',
    swatch:
      'linear-gradient(120deg, #d6d6d6 0%, #9a9a9a 40%, #2e2e2e 100%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.35), transparent 40%)',
    tags: ['industrial', 'backlot', 'soft'],
  },
]

export const writingPieces: WritingPiece[] = [
  {
    id: 'letter-platform',
    title: 'A Letter to the Last Train, Unsent',
    date: '12 Mar 2026',
    form: 'Flash fiction',
    excerpt:
      'Dear last train — I left the platform light on in case your cars come back empty. The kettle has boiled twice for no one…',
    minutes: 3,
  },
  {
    id: 'memory-floorplan',
    title: 'Memory as Floor Plan',
    date: '28 Feb 2026',
    form: 'Lyrical essay',
    excerpt:
      'Some rooms in us have no doors — only windows that look into other years. I keep the hallway lit with small hard lamps…',
    minutes: 6,
  },
  {
    id: 'field-notes-dock',
    title: 'Field Notes from a Quiet Loading Dock',
    date: '04 Feb 2026',
    form: 'Studio dispatch',
    excerpt:
      'Day 3 of painting rusted shutters. The steel wants to be white again. I am letting it. A list of fragments follows…',
    minutes: 2,
  },
  {
    id: 'two-towers-log',
    title: 'Block Log: When Two Towers Light Up',
    date: '19 Jan 2026',
    form: 'Poetry',
    excerpt:
      'Bring nothing that cannot hold. / Leave your maps face-down on the sill. / Tonight the second tower remembers your name…',
    minutes: 1,
  },
  {
    id: 'kindness-curb',
    title: 'On Small Courtesies That Feel Like Kindness',
    date: '02 Jan 2026',
    form: 'Essay',
    excerpt:
      'The courtesy is ordinary: tea, a spare key, a sentence that makes someone feel less unmade. Structure is just attention, annealed…',
    minutes: 5,
  },
]
