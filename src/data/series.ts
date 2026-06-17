// ─── Placeholder series data ──────────────────────────────────────────────────

export interface Series {
  id:    string;
  title: string;
  badge: string;
  image: string; // remote picsum URL for development
}

const img = (seed: string, w = 200, h = 300) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const TREND_SERIES: Series[] = [
  { id: 'tr1', title: 'Gölge Çiçeği',   badge: 'TREND', image: img('cf1') },
  { id: 'tr2', title: 'Yıldız Düşmanı', badge: 'YENİ',  image: img('cf2') },
  { id: 'tr3', title: 'Kızıl Ay',       badge: 'HOT',   image: img('cf3') },
  { id: 'tr4', title: 'Mor Perde',      badge: 'TREND', image: img('cf4') },
  { id: 'tr5', title: 'Mavi Sis',       badge: 'YENİ',  image: img('cf5') },
  { id: 'tr6', title: 'Demir Kanat',    badge: 'HOT',   image: img('cf6') },
  { id: 'tr7', title: 'Neon Kalp',      badge: 'TREND', image: img('cf7') },
  { id: 'tr8', title: 'Pembe Gece',     badge: 'YENİ',  image: img('cf8') },
  { id: 'tr9', title: 'Sessiz Orman',   badge: 'HOT',   image: img('cf9') },
];

export const DISCOVER_SERIES: Series[] = [
  { id: 'ds1', title: 'Gölge Çiçeği',  badge: '',      image: img('wt1') },
  { id: 'ds2', title: 'Yıldız Düşmanı',badge: '',      image: img('wt2') },
  { id: 'ds3', title: 'Kızıl Ay',      badge: '',      image: img('wt3') },
  { id: 'ds4', title: 'Mor Perde',     badge: '',      image: img('wt4') },
  { id: 'ds5', title: 'Mavi Sis',      badge: '',      image: img('wt5') },
  { id: 'ds6', title: 'Demir Kanat',   badge: '',      image: img('wt6') },
  { id: 'ds7', title: 'Sessiz Orman',  badge: '',      image: img('wt7') },
  { id: 'ds8', title: 'Altın Kuş',     badge: '',      image: img('wt8') },
];

export const NEW_MINNAKS: Series[] = [
  { id: 'nm1', title: 'Tatlı Felaket',  badge: 'YENİ', image: img('nm1') },
  { id: 'nm2', title: 'Neon Kalp',      badge: 'YENİ', image: img('nm2') },
  { id: 'nm3', title: 'Pembe Gece',     badge: 'YENİ', image: img('nm3') },
  { id: 'nm4', title: 'Şeker Büyüsü',   badge: 'YENİ', image: img('nm4') },
  { id: 'nm5', title: 'Yıldız Kız',     badge: 'YENİ', image: img('nm5') },
  { id: 'nm6', title: 'Masumane',       badge: 'YENİ', image: img('nm6') },
  { id: 'nm7', title: 'Çiçek Günlüğü',  badge: 'YENİ', image: img('nm7') },
  { id: 'nm8', title: 'Balerin Kız',    badge: 'YENİ', image: img('nm8') },
];

export const COMPLETED_SERIES: Series[] = Array.from({ length: 14 }, (_, i) => ({
  id:    `tc${i + 1}`,
  title: `Tamamlandı ${i + 1}`,
  badge: 'FİN',
  image: img(`tc${i + 1}`, 120, 160),
}));
