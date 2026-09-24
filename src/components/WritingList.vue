<script setup lang="ts">
import { writingPieces } from '../data/portfolio'
</script>

<template>
  <section id="writing" class="section">
    <div class="section-head">
      <span class="rune">02</span>
      <h2>Notes &amp; Dispatches</h2>
    </div>
    <p class="section-intro">
      Essays, flash, and studio dispatches — a solid log, kept like a core dump.
    </p>

    <ol class="list">
      <li v-for="piece in writingPieces" :key="piece.id" class="entry panel">
        <div class="meta">
          <span class="tag">{{ piece.form }}</span>
          <time class="muted">{{ piece.date }}</time>
          <span class="muted">· {{ piece.minutes }} min</span>
        </div>
        <h3>{{ piece.title }}</h3>
        <p class="excerpt">{{ piece.excerpt }}</p>
        <a href="#faq" class="read">Continue reading →</a>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.entry {
  padding: 1.35rem 1.45rem;
  transition: border-color 0.12s, box-shadow 0.12s, transform 0.12s;
}

.entry:hover {
  border-color: var(--pure);
  transform: translate(-2px, -2px);
  box-shadow: 9px 9px 0 #000;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.55rem;
  font-family: var(--font-ui);
  font-size: 0.78rem;
}

.entry h3 {
  font-size: 1.2rem;
  margin-bottom: 0.45rem;
}

.excerpt {
  margin: 0 0 0.85rem;
  color: var(--silver);
  font-size: 1.05rem;
}

.read {
  font-family: var(--font-ui);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
