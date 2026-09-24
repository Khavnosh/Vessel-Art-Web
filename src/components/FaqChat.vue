<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue'
import MascotFace from './MascotFace.vue'
import {
  matchFaq,
  fallbackReplies,
  quickPrompts,
  type MascotMood,
  type FaqEntry,
} from '../data/faq'

interface Message {
  id: number
  role: 'user' | 'mascot'
  text: string
  mood?: MascotMood
  isFallback?: boolean
}

const messages = ref<Message[]>([])
const input = ref('')
const isTyping = ref(false)
const currentMood = ref<MascotMood>('idle')
const listEl = ref<HTMLElement | null>(null)
let nextId = 1
let fallbackIdx = 0

function scrollToEnd() {
  nextTick(() => {
    listEl.value?.scrollTo({ top: listEl.value.scrollHeight, behavior: 'smooth' })
  })
}

async function typeReply(text: string, mood: MascotMood) {
  isTyping.value = true
  currentMood.value = mood === 'idle' ? 'thinking' : 'thinking'
  // simulate "thinking" delay — no LLM, just theatre
  await new Promise((r) => setTimeout(r, 550 + Math.min(text.length * 8, 900)))
  currentMood.value = mood
  messages.value.push({ id: nextId++, role: 'mascot', text, mood })
  isTyping.value = false
  scrollToEnd()
}

async function ask(raw: string) {
  const text = raw.trim()
  if (!text || isTyping.value) return

  messages.value.push({ id: nextId++, role: 'user', text })
  input.value = ''
  scrollToEnd()

  const match: FaqEntry | null = matchFaq(text)
  if (match) {
    await typeReply(match.answer, match.mood)
  } else {
    const fb = fallbackReplies[fallbackIdx % fallbackReplies.length]!
    fallbackIdx += 1
    await typeReply(fb.text, fb.mood)
  }
}

function usePrompt(p: string) {
  void ask(p)
}

onMounted(() => {
  typeReply(
    "Online. I'm Lumen, Vessel's terminal face. Query me about the art, the writing, or this black-and-white monolith.",
    'happy',
  )
})

watch(
  messages,
  () => scrollToEnd(),
  { deep: true },
)
</script>

<template>
  <div class="chat-shell">
    <!-- device frame -->
    <div class="phone">
      <div class="phone-bezel">
        <div class="phone-notch">
          <span class="speaker" />
          <span class="cam" />
        </div>

        <div class="phone-header">
          <MascotFace :mood="currentMood" :size="44" />
          <div class="phone-header-text">
            <strong>Lumen</strong>
            <span class="status">
              <i class="dot" :class="{ live: isTyping }" />
              {{ isTyping ? 'processing…' : 'terminal online' }}
            </span>
          </div>
          <span class="sigil">■</span>
        </div>

        <div ref="listEl" class="chat-list" role="log" aria-live="polite">
          <div
            v-for="m in messages"
            :key="m.id"
            class="bubble-row"
            :class="m.role"
          >
            <MascotFace v-if="m.role === 'mascot'" :mood="m.mood ?? 'idle'" :size="32" />
            <div class="bubble" :class="[m.role, { fallback: m.isFallback }]">
              {{ m.text }}
            </div>
          </div>

          <div v-if="isTyping" class="bubble-row mascot">
            <MascotFace mood="thinking" :size="32" />
            <div class="bubble mascot typing" aria-label="Lumen is typing">
              <span /><span /><span />
            </div>
          </div>
        </div>

        <div class="chips" aria-label="Suggested questions">
          <button
            v-for="p in quickPrompts"
            :key="p"
            type="button"
            class="chip"
            :disabled="isTyping"
            @click="usePrompt(p)"
          >
            {{ p }}
          </button>
        </div>

        <form class="composer" @submit.prevent="ask(input)">
          <input
            v-model="input"
            type="text"
            name="question"
            autocomplete="off"
            placeholder="Enter query…"
            :disabled="isTyping"
            aria-label="Your question"
          />
          <button type="submit" class="send" :disabled="isTyping || !input.trim()" aria-label="Send">
            →
          </button>
        </form>
      </div>
    </div>

    <aside class="faq-side">
      <p class="section-intro">
        A pocket terminal with a handful of true answers. No models in the cloud —
        just a face, a mood, and a hand-written archive.
      </p>
      <div class="mood-stage panel">
        <MascotFace :mood="currentMood" :size="96" />
        <div>
          <h3 style="margin-bottom: 0.25rem">Lumen is feeling…</h3>
          <p class="mood-name">{{ currentMood }}</p>
          <p class="muted" style="margin: 0">
            The face mirrors the topic — curious for art, focused for writing,
            delighted for commissions.
          </p>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.chat-shell {
  display: grid;
  grid-template-columns: minmax(280px, 380px) 1fr;
  gap: 1.75rem;
  align-items: start;
}

.phone {
  position: relative;
}

.phone-bezel {
  background: var(--coal);
  border: 3px solid var(--line-strong);
  border-radius: var(--radius);
  padding: 0.7rem 0.7rem 0.9rem;
  box-shadow: 8px 8px 0 #000;
}

.phone-notch {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  height: 1.1rem;
  margin-bottom: 0.4rem;
}

.speaker {
  width: 52px;
  height: 4px;
  background: var(--iron);
}

.cam {
  width: 7px;
  height: 7px;
  background: var(--bone);
}

.phone-header {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.4rem 0.55rem 0.7rem;
  border-bottom: 2px solid var(--line);
}

.phone-header-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: var(--font-ui);
  line-height: 1.2;
}

.phone-header-text strong {
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--pure);
}

.status {
  font-size: 0.7rem;
  color: var(--ash);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.dot {
  width: 7px;
  height: 7px;
  background: var(--bone);
  display: inline-block;
}

.dot.live {
  animation: blink 0.85s steps(2, end) infinite;
  background: var(--pure);
}

@keyframes blink {
  50% { opacity: 0.2; }
}

.sigil {
  color: var(--bone);
  font-size: 0.85rem;
}

.chat-list {
  height: 340px;
  overflow-y: auto;
  padding: 0.85rem 0.45rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  scroll-behavior: smooth;
}

.bubble-row {
  display: flex;
  align-items: flex-end;
  gap: 0.4rem;
  max-width: 100%;
}

.bubble-row.user {
  justify-content: flex-end;
}

.bubble-row.mascot {
  justify-content: flex-start;
}

.bubble {
  max-width: 78%;
  padding: 0.65rem 0.9rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.45;
  white-space: pre-wrap;
  border: 2px solid var(--line-strong);
}

.bubble.user {
  background: var(--pure);
  color: var(--black);
  border-color: var(--pure);
  box-shadow: 3px 3px 0 rgba(255, 255, 255, 0.12);
}

.bubble.mascot {
  background: var(--steel);
  border-color: var(--line);
  color: var(--bone);
}

.bubble.typing {
  display: inline-flex;
  gap: 5px;
  align-items: center;
  min-width: 56px;
  min-height: 38px;
}

.bubble.typing span {
  width: 6px;
  height: 6px;
  background: var(--bone);
  animation: bounce 1.1s steps(2, end) infinite;
}

.bubble.typing span:nth-child(2) { animation-delay: 0.15s; }
.bubble.typing span:nth-child(3) { animation-delay: 0.3s; }

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
  30% { transform: translateY(-3px); opacity: 1; }
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0.5rem 0.35rem 0.6rem;
  border-top: 2px solid var(--line);
}

.chip {
  font-family: var(--font-ui);
  font-size: 0.7rem;
  padding: 0.32rem 0.65rem;
  border: 1px solid var(--line-strong);
  background: transparent;
  color: var(--bone);
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}

.chip:hover:not(:disabled) {
  background: var(--pure);
  color: var(--black);
  border-color: var(--pure);
}

.chip:disabled {
  opacity: 0.4;
  cursor: default;
}

.composer {
  display: flex;
  gap: 0.45rem;
  padding: 0.4rem;
  border-top: 2px solid var(--line);
}

.composer input {
  flex: 1;
  border: 2px solid var(--line-strong);
  background: var(--black);
  border-radius: var(--radius);
  padding: 0.6rem 0.9rem;
  font-family: var(--font-ui);
  font-size: 0.88rem;
  color: var(--pure);
  outline: none;
  transition: border-color 0.12s;
}

.composer input::placeholder {
  color: var(--ash);
}

.composer input:focus {
  border-color: var(--pure);
}

.composer input:disabled {
  opacity: 0.5;
}

.send {
  width: 44px;
  height: 44px;
  border: 3px solid var(--pure);
  background: var(--pure);
  color: var(--black);
  font-family: var(--font-ui);
  font-size: 1.15rem;
  cursor: pointer;
  box-shadow: 3px 3px 0 rgba(255, 255, 255, 0.15);
  transition: transform 0.1s, filter 0.1s;
}

.send:hover:not(:disabled) {
  transform: translate(-1px, -1px);
}

.send:disabled {
  opacity: 0.35;
  cursor: default;
}

.faq-side {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mood-stage {
  display: flex;
  gap: 1.15rem;
  align-items: center;
}

.mood-name {
  font-family: var(--font-ui);
  color: var(--pure);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin: 0 0 0.4rem;
}

@media (max-width: 820px) {
  .chat-shell {
    grid-template-columns: 1fr;
  }

  .phone {
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
