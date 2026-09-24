<script setup lang="ts">
import ProfileHero from './components/ProfileHero.vue'
import ArtGallery from './components/ArtGallery.vue'
import WritingList from './components/WritingList.vue'
import FaqChat from './components/FaqChat.vue'
</script>

<template>
  <ProfileHero />

  <ArtGallery />

  <WritingList />

  <section id="faq" class="section">
    <div class="section-head">
      <span class="rune">03</span>
      <h2>Terminal · FAQ</h2>
    </div>
    <p class="section-intro">
      Query Lumen. The face listens; the archive answers. No LLM required —
      only solid structure and a few true things.
    </p>
    <FaqChat />
  </section>

  <footer class="foot">
    <div class="rule">████████████████████████████████</div>
    <p class="muted">© {{ new Date().getFullYear() }} Vessel · black, white, and load-bearing mass</p>
    <p class="muted" style="margin-top: 0.25rem; font-size: 0.85rem">
      Lumen is a hand-written terminal assistant. No models were harmed.
    </p>
  </footer>
</template>

<style scoped>
.foot {
  margin-top: 3.5rem;
  text-align: center;
}

.rule {
  font-family: var(--font-ui);
  color: var(--iron);
  letter-spacing: 0;
  font-size: 0.55rem;
  margin-bottom: 0.85rem;
  overflow: hidden;
  white-space: nowrap;
}

.foot p {
  margin: 0;
}
</style>
