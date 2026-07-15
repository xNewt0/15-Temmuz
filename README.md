# 15 Temmuz — Sinematik Tek Sayfa Web Sitesi

React + Vite + Tailwind CSS + GSAP ScrollTrigger ile hazırlanmış, scroll tabanlı tek sayfalık 15 Temmuz anma sitesi.

## Kurulum

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages deploy

Bu proje GitHub Pages için hazırlandı:

- `vite.config.js` içinde `base: './'` ayarlı.
- `.github/workflows/deploy.yml` GitHub Actions ile `main` branch'e push sonrası otomatik build ve deploy yapar.
- Repository ayarlarında **Settings → Pages → Source: GitHub Actions** seçilmelidir.

## Video hazırlığı

Köprü bölümü `/public/kopru1.mp4` dosyasını kullanır. Daha optimize bir 40 saniyelik web videosu üretmek için:

```bash
ffmpeg -y -i kopru.mp4 -t 40 -vf "scale='min(1920,iw)':-2" -an -c:v libx264 -preset veryfast -crf 25 -movflags +faststart public/kopru1.mp4
```

> Not: GitHub Pages büyük dosyaları barındırır fakat video ne kadar küçük olursa site o kadar hızlı açılır. 20–40 MB altı hedeflenmesi önerilir.

## Dosya yapısı

```txt
src/
  App.jsx
  Hero.jsx
  Bridge.jsx
  Sehitler.jsx
  Kapanis.jsx
  index.css
public/
  1.jpg
  kopru1.mp4
  favicon.svg
```
