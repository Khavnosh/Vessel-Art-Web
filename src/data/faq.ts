export type MascotMood =
  | 'idle'
  | 'thinking'
  | 'curious'
  | 'happy'
  | 'mystical'
  | 'delighted'
  | 'calm'
  | 'playful'

export interface FaqEntry {
  id: string
  mood: MascotMood
  keywords: string[]
  question: string
  answer: string
}

/** Rule-based FAQ knowledge — no real LLM, pure keyword matching. */
export const faqEntries: FaqEntry[] = [
  {
    id: 'who',
    mood: 'happy',
    keywords: ['who', 'you', 'yourself', 'name', 'vessel', 'about', 'introduce'],
    question: 'Who are you?',
    answer:
      "I'm Vessel — a builder of crosswalks, loading docks, and unfinished monoliths. I make images and write stories that feel like notes left on a structural wall.",
  },
  {
    id: 'art',
    mood: 'curious',
    keywords: ['art', 'draw', 'paint', 'illustration', 'image', 'picture', 'visual', 'digital', 'style'],
    question: 'What kind of art do you make?',
    answer:
      'Mostly digital illustration with a hard, heavy edge — night buses, transit maps, quiet figures under floodlight. I love white mass, black cut, and the moment a sketch turns into a floor plan.',
  },
  {
    id: 'writing',
    mood: 'mystical',
    keywords: ['write', 'writing', 'story', 'stories', 'poetry', 'poem', 'fiction', 'blog', 'essay', 'words', 'novel'],
    question: 'What do you write?',
    answer:
      'Flash fiction, lyrical essays, and the occasional long letter to no one in particular. Themes: memory as floor plan, neighbors across blocks, and small courtesies that feel like kindness.',
  },
  {
    id: 'process',
    mood: 'thinking',
    keywords: ['process', 'how', 'make', 'create', 'workflow', 'start', 'inspiration', 'idea', 'inspired'],
    question: 'How do you work?',
    answer:
      'I begin with a single image or a single sentence, then orbit the block. Sketches become maps; maps become stories. I keep a black notebook for fragments and let the finished pieces find each other later.',
  },
  {
    id: 'tools',
    mood: 'calm',
    keywords: ['tool', 'software', 'app', 'brush', 'procreate', 'clip', 'photoshop', 'tablet', 'pen', 'program'],
    question: 'What tools do you use?',
    answer:
      'A well-loved drawing tablet, Clip Studio Paint for illustration, and plain text for almost all writing. Occasional risograph experiments. The contrast is always in the palette, never in the hardware.',
  },
  {
    id: 'commission',
    mood: 'delighted',
    keywords: ['commission', 'hire', 'work with', 'collaborate', 'project', 'client', 'freelance', 'available'],
    question: 'Are you open for commissions?',
    answer:
      'Selectively, yes — personal pieces, book covers, and small collaborative worlds. Write to me with the shape of what you need. If it holds weight on the street plan, we should talk.',
  },
  {
    id: 'contact',
    mood: 'calm',
    keywords: ['contact', 'email', 'reach', 'message', 'talk', 'hello', 'hi', 'social', 'twitter', 'instagram'],
    question: 'How can I reach you?',
    answer:
      'Drop a note at hello@vessel.art (placeholder) or find me as @vesselmakes in the usual quiet corners of the internet. I answer slowly and solidly.',
  },
  {
    id: 'theme',
    mood: 'mystical',
    keywords: ['theme', 'white', 'gold', 'black', 'design', 'sci', 'fantasy', 'aesthetic', 'look', 'color', 'colour', 'urban', 'city', 'bw', 'monochrome'],
    question: 'Why black and white?',
    answer:
      'Black is the mass before the cut. White is the edge that holds a block together. Together they feel like floodlight on concrete — half city grid, half monolith. No color, just weight.',
  },
  {
    id: 'blog',
    mood: 'playful',
    keywords: ['blog', 'journal', 'post', 'entry', 'update', 'diary', 'personal'],
    question: 'Is this a blog?',
    answer:
      'A hard one, yes. Think field notes from a corner studio — art drops, writing fragments, and the occasional dispatch from the loading dock. Less feed, more core log.',
  },
  {
    id: 'favorite',
    mood: 'delighted',
    keywords: ['favorite', 'favourite', 'best', 'love', 'most', 'piece', 'work'],
    question: "What's your favorite piece?",
    answer:
      "The unfinished one I'm not ready to show — something about an overpass that keeps score. Among the finished pieces, I'm fond of *Crosswalk, After Rain*.",
  },
  {
    id: 'mascot',
    mood: 'playful',
    keywords: ['mascot', 'you', 'face', 'chat', 'bot', 'ai', 'llm', 'robot', 'companion'],
    question: 'What are you, little face?',
    answer:
      "I'm Lumen — Vessel's terminal face. No models, no clouds, just a pocket messenger with a handful of true answers and a talent for looking solid.",
  },
  {
    id: 'thanks',
    mood: 'happy',
    keywords: ['thank', 'thanks', 'cool', 'love it', 'amazing', 'beautiful', 'nice', 'great'],
    question: 'Thank you!',
    answer: '■ Anytime. May your day hold its structure.',
  },
]

export const fallbackReplies: { mood: MascotMood; text: string }[] = [
  {
    mood: 'thinking',
    text: 'Hmm — that note is still on the board. Try asking about art, writing, process, commissions, or how this place was built.',
  },
  {
    mood: 'curious',
    text: 'Lumen tilts their head. The terminal holds answers about Vessel’s art, writing, tools, and commissions — query me one of those?',
  },
  {
    mood: 'playful',
    text: 'That one is off my block. Ask again with words like *art*, *writing*, *process*, or *contact*.',
  },
]

export const quickPrompts = [
  'Who are you?',
  'What kind of art do you make?',
  'What do you write?',
  'Are commissions open?',
  'Why black and white?',
]

/**
 * Pure keyword matcher — returns the best FAQ entry or null.
 * Scores by how many keywords appear as whole words in the input.
 */
export function matchFaq(input: string): FaqEntry | null {
  const words = input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)

  if (!words.length) return null

  let best: FaqEntry | null = null
  let bestScore = 0

  for (const entry of faqEntries) {
    let score = 0
    for (const kw of entry.keywords) {
      const k = kw.toLowerCase()
      if (words.includes(k)) score += k.includes(' ') ? 2 : 1
      else if (k.length > 3 && words.some((w) => w.includes(k))) score += 0.5
    }
    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  }

  return bestScore >= 1 ? best : null
}
