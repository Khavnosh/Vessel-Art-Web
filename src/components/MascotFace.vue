<script setup lang="ts">
import { computed } from 'vue'
import type { MascotMood } from '../data/faq'

const props = withDefaults(
  defineProps<{
    mood?: MascotMood
    size?: number
  }>(),
  { mood: 'idle', size: 72 },
)

/** Lumen — terminal face. Expression shifts with conversation mood. */
const eyePaths = computed(() => {
  switch (props.mood) {
    case 'happy':
    case 'delighted':
      return { left: 'M 28 40 Q 36 32 44 40', right: 'M 56 40 Q 64 32 72 40', open: false }
    case 'thinking':
      return { left: 'M 28 38 Q 36 42 44 38', right: 'M 56 36 Q 64 34 72 38', open: false }
    case 'curious':
      return { left: 'M 32 40 A 6 8 0 1 0 44 40 A 6 8 0 1 0 32 40', right: 'M 58 38 A 7 9 0 1 0 72 38 A 7 9 0 1 0 58 38', open: true }
    case 'mystical':
      return { left: 'M 28 40 Q 36 34 44 40', right: 'M 56 40 Q 64 34 72 40', open: true }
    case 'calm':
      return { left: 'M 30 40 L 42 40', right: 'M 58 40 L 70 40', open: false }
    case 'playful':
      return { left: 'M 30 38 Q 36 46 42 38', right: 'M 58 36 Q 64 44 70 36', open: true }
    default:
      return { left: 'M 32 40 A 5 6 0 1 0 42 40 A 5 6 0 1 0 32 40', right: 'M 58 40 A 5 6 0 1 0 68 40 A 5 6 0 1 0 58 40', open: true }
  }
})

const mouthPath = computed(() => {
  switch (props.mood) {
    case 'happy':
    case 'delighted':
      return 'M 38 58 Q 50 68 62 58'
    case 'thinking':
      return 'M 42 60 Q 50 58 56 62'
    case 'curious':
      return 'M 44 60 Q 50 64 56 60'
    case 'mystical':
      return 'M 40 60 Q 50 56 60 60'
    case 'calm':
      return 'M 42 60 L 58 60'
    case 'playful':
      return 'M 40 58 Q 50 70 60 58'
    default:
      return 'M 42 58 Q 50 62 58 58'
  }
})

const showMarks = computed(
  () => props.mood === 'mystical' || props.mood === 'delighted' || props.mood === 'happy',
)
</script>

<template>
  <div
    class="mascot-face"
    :data-mood="mood"
    :style="{ width: size + 'px', height: size + 'px' }"
    aria-hidden="true"
  >
    <svg viewBox="0 0 100 100" role="img">
      <!-- outer heavy frame -->
      <rect x="6" y="6" width="88" height="88" fill="none" stroke="#f2f2f2" stroke-width="3" />

      <!-- head block -->
      <rect x="18" y="18" width="64" height="64" fill="#1f1f1f" stroke="#f2f2f2" stroke-width="2.5" />

      <!-- antenna — single bar -->
      <path d="M50 18 V 8" stroke="#f2f2f2" stroke-width="3" />
      <rect x="44" y="4" width="12" height="6" fill="#f2f2f2" />

      <!-- eyes -->
      <path
        v-if="!eyePaths.open"
        :d="eyePaths.left"
        fill="none"
        stroke="#f2f2f2"
        stroke-width="2.6"
        stroke-linecap="square"
      />
      <path
        v-else
        :d="eyePaths.left"
        fill="#f2f2f2"
        stroke="#f2f2f2"
        stroke-width="1"
      />
      <path
        v-if="!eyePaths.open"
        :d="eyePaths.right"
        fill="none"
        stroke="#f2f2f2"
        stroke-width="2.6"
        stroke-linecap="square"
      />
      <path
        v-else
        :d="eyePaths.right"
        fill="#f2f2f2"
        stroke="#f2f2f2"
        stroke-width="1"
      />

      <!-- mouth -->
      <path :d="mouthPath" fill="none" stroke="#f2f2f2" stroke-width="2.4" stroke-linecap="square" />

      <!-- status marks -->
      <g v-if="showMarks" class="sparkles">
        <rect x="10" y="36" width="5" height="5" fill="#f2f2f2" />
        <rect x="85" y="48" width="4" height="4" fill="#f2f2f2" />
        <rect x="48" y="9" width="4" height="4" fill="#f2f2f2" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.mascot-face {
  flex-shrink: 0;
  filter: drop-shadow(4px 4px 0 #000);
}

.mascot-face svg {
  width: 100%;
  height: 100%;
  display: block;
}

.sparkles {
  animation: signal-blink 1.4s steps(2, end) infinite;
}

@keyframes signal-blink {
  from { opacity: 0.25; }
  to { opacity: 1; }
}
</style>
