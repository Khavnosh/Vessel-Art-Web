<script setup lang="ts">
import { artPieces } from '../data/portfolio'
</script>

<template>
  <section id="art" class="section">
    <div class="section-head">
      <span class="rune">01</span>
      <h2>Selected Work</h2>
    </div>
    <p class="section-intro">
      Structural light, night mass, and places that only exist between drafts.
    </p>

    <div class="grid">
      <article v-for="piece in artPieces" :key="piece.id" class="card panel">
        <div class="swatch" :style="{ background: piece.swatch }" role="img" :aria-label="piece.title">
          <span class="year">{{ piece.year }}</span>
          <span class="frame-mark" aria-hidden="true" />
        </div>
        <div class="body">
          <h3>{{ piece.title }}</h3>
          <p class="medium muted">{{ piece.medium }}</p>
          <p class="blurb">{{ piece.blurb }}</p>
          <div class="tags">
            <span v-for="t in piece.tags" :key="t" class="tag">{{ t }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.35rem;
}

.card {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  transition: transform 0.12s, box-shadow 0.12s;
}

.card:hover {
  transform: translate(-3px, -3px);
  box-shadow:
    11px 11px 0 #000,
    0 0 0 3px var(--pure);
}

.swatch {
  position: relative;
  height: 170px;
  border-radius: var(--radius);
  border: 2px solid var(--line-strong);
  overflow: hidden;
}

.swatch::after {
  content: "";
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  pointer-events: none;
}

.frame-mark {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  pointer-events: none;
}

.frame-mark::before,
.frame-mark::after {
  content: "";
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
}

.frame-mark::before {
  left: 50%;
  top: -8px;
  bottom: -8px;
  width: 1px;
  transform: translateX(-50%);
}

.frame-mark::after {
  top: 50%;
  left: -8px;
  right: -8px;
  height: 1px;
  transform: translateY(-50%);
}

.year {
  position: absolute;
  top: 0.55rem;
  right: 0.55rem;
  font-family: var(--font-ui);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  color: var(--black);
  background: var(--pure);
  padding: 0.18rem 0.45rem;
  border: 1px solid var(--pure);
}

.body {
  padding: 0 0.35rem 0.55rem;
}

.body h3 {
  font-size: 1.05rem;
  margin-bottom: 0.25rem;
}

.medium {
  margin: 0 0 0.55rem;
  font-family: var(--font-ui);
  font-size: 0.75rem;
  letter-spacing: 0.04em;
}

.blurb {
  margin: 0 0 0.85rem;
  font-size: 1rem;
  color: var(--silver);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
</style>
