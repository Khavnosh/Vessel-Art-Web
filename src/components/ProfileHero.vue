<script setup lang="ts">
const profile = {
  name: 'Vessel',
  title: 'Artist · Writer · Monolith Studio',
  location: 'sector 7 · core block',
  bio: 'I collect structural light, floor plans, and the silence between monoliths. This is a load-bearing wall of images and words — less portfolio, more open terminal.',
  links: [
    { label: 'Art', href: '#art' },
    { label: 'Writing', href: '#writing' },
    { label: 'Ask Lumen', href: '#faq' },
  ],
}
</script>

<template>
  <header class="hero">
    <div class="coord top-left">SYS / 0x01</div>
    <div class="coord top-right">GRID · ACTIVE</div>

    <div class="crest" aria-hidden="true">
      <svg viewBox="0 0 120 120" class="crest-svg">
        <!-- heavy frame -->
        <rect x="8" y="8" width="104" height="104" fill="none" stroke="#f2f2f2" stroke-width="4" />
        <rect x="18" y="18" width="84" height="84" fill="none" stroke="#f2f2f2" stroke-width="1.5" opacity="0.45" />
        <!-- monolith skyline -->
        <path d="M28 88V52h14v36H28zm22 0V38h16v50H50zm22 0V48h14v40H72z" fill="#f2f2f2" />
        <path d="M24 94h72" stroke="#f2f2f2" stroke-width="4" />
        <!-- solid slots -->
        <rect class="win w1" x="33" y="58" width="4" height="4" fill="#050505" />
        <rect class="win w2" x="33" y="68" width="4" height="4" fill="#050505" />
        <rect class="win w3" x="55" y="46" width="4" height="4" fill="#050505" />
        <rect class="win w4" x="55" y="56" width="4" height="4" fill="#050505" />
        <rect class="win w5" x="77" y="56" width="4" height="4" fill="#050505" />
      </svg>
    </div>

    <p class="eyebrow">monolith archive · art &amp; writing</p>
    <h1 class="name">{{ profile.name }}</h1>
    <p class="title">{{ profile.title }}</p>
    <p class="loc">[ {{ profile.location }} ]</p>
    <p class="bio">{{ profile.bio }}</p>

    <nav class="hero-nav" aria-label="Primary">
      <a v-for="l in profile.links" :key="l.href" :href="l.href" class="btn ghost">{{ l.label }}</a>
    </nav>
  </header>
</template>

<style scoped>
.hero {
  position: relative;
  text-align: center;
  padding: 2.75rem 1rem 2rem;
  overflow: hidden;
}

.coord {
  position: absolute;
  top: 1rem;
  font-family: var(--font-ui);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  color: var(--ash);
  user-select: none;
}

.coord.top-left { left: 0.5rem; }
.coord.top-right { right: 0.5rem; }

.crest {
  width: 110px;
  height: 110px;
  margin: 0 auto 0.85rem;
  filter: drop-shadow(6px 6px 0 #000);
}

.crest-svg {
  width: 100%;
  height: 100%;
}

.win.w1 { animation: blink-win 3.2s steps(2, end) infinite; }
.win.w2 { animation: blink-win 4.1s steps(2, end) infinite 0.6s; }
.win.w3 { animation: blink-win 2.8s steps(2, end) infinite 0.3s; }
.win.w4 { animation: blink-win 3.6s steps(2, end) infinite 1s; }
.win.w5 { animation: blink-win 4.4s steps(2, end) infinite 0.2s; }

@keyframes blink-win {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.15; }
}

.eyebrow {
  font-family: var(--font-ui);
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--silver);
  margin: 0 0 0.5rem;
}

.name {
  font-family: var(--font-display);
  font-size: clamp(3rem, 10vw, 5rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  margin: 0;
  color: var(--pure);
  text-transform: uppercase;
  line-height: 0.95;
}

.title {
  font-family: var(--font-ui);
  font-size: 0.88rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--bone);
  margin: 0.55rem 0 0.4rem;
}

.loc {
  font-family: var(--font-ui);
  font-size: 0.8rem;
  color: var(--ash);
  letter-spacing: 0.12em;
  margin: 0 0 1rem;
}

.bio {
  max-width: 48ch;
  margin: 0 auto 1.5rem;
  color: var(--silver);
  font-size: 1.08rem;
}

.hero-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

@media (max-width: 600px) {
  .coord { display: none; }
  .hero { padding: 1.75rem 0.5rem 1.5rem; }
}
</style>
