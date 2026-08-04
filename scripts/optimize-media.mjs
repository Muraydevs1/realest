// One-off Phase 3 media generation. Kept as a reference pipeline for future
// listing media: put originals in a folder, point SOURCE_DIR at it, and reuse
// the same sharp calls (WebP q≈78 for galleries, 880w for card slots,
// AVIF+WebP triplets for full-bleed hero imagery).
//
// Usage: node scripts/optimize-media.mjs <originals-dir>
//   <originals-dir> must contain the untouched source files (incl. logo.png).
import sharp from 'sharp'
import { statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const ASSETS = path.join(ROOT, 'src/assets')
const PUBLIC = path.join(ROOT, 'public')
const BACKUP = process.argv[2]
if (!BACKUP) {
  console.error('usage: node scripts/optimize-media.mjs <originals-dir>')
  process.exit(1)
}

const kb = (f) => (statSync(f).size / 1024).toFixed(1) + 'KB'
const src = (n) => path.join(ASSETS, n)
const report = (out) => console.log('  ->', path.basename(out), kb(out))

// ---------- 1. Hero slider sources: hero-<slide-id>-<w>.{avif,webp} ----------
// One entry per slide in src/assets/heroSlides.js. Widths: 640 (mobile),
// 960 (tablet), native (desktop) — never upscale. When a final ≥1920px photo
// arrives, add it to a source list here with widths [640, 960, 1440, 1920].
const HERO_SLIDES = [
  ['eastlegon2.webp', 'hero-east-legon', [640, 960, 1080]],
  ['dawhwnya4.webp', 'hero-dawhenya', [640, 960, 1000]],
  ['eastlegon3.webp', 'hero-east-legon-2', [640, 960, 1080]],
]
for (const [source, base, widths] of HERO_SLIDES) {
  for (const w of widths) {
    const pipe = sharp(src(source)).resize({ width: w })
    const webpOut = src(`${base}-${w}.webp`)
    await pipe.clone().webp({ quality: 78, effort: 6 }).toFile(webpOut)
    report(webpOut)
    const avifOut = src(`${base}-${w}.avif`)
    await pipe.clone().avif({ quality: 55, effort: 6 }).toFile(avifOut)
    report(avifOut)
  }
}

// ---------- 2. Services cards: authentic Murray imagery, 880w (2x of ~440px slot) ----------
// Property Development <- Dawhenya under-construction (authentic)
await sharp(src('dawhwnya1.webp')).resize({ width: 880 }).webp({ quality: 76, effort: 6 }).toFile(src('svc-propdev.webp'))
report(src('svc-propdev.webp'))
// Property Management <- Dawhenya completed apartments (authentic)
await sharp(path.join(BACKUP, 'dawhwnya4.jpeg')).resize({ width: 880 }).webp({ quality: 76, effort: 6 }).toFile(src('svc-propman.webp'))
report(src('svc-propman.webp'))
// Property Renovation: keep stock theme image but resize 1256->880
await sharp(path.join(BACKUP, 'proprenov.webp')).resize({ width: 880 }).webp({ quality: 76, effort: 6 }).toFile(src('svc-proprenov.webp'))
report(src('svc-proprenov.webp'))

// ---------- 3. Frafraha landscape cover crop (4/3) from portrait original ----------
// Building band of the 750x1000 portrait; avoid the parked car lower-left.
await sharp(path.join(BACKUP, 'frafraha.jpeg'))
  .extract({ left: 0, top: 290, width: 750, height: 562 })
  .webp({ quality: 80, effort: 6 })
  .toFile(src('Ffrafraha.webp'))
report(src('Ffrafraha.webp'))

// ---------- 4. Gallery/detail JPEG -> WebP conversions ----------
// Keep-if-smaller rule: tamale2/3/4/7 are excluded because their WebP
// re-encodes came out LARGER than the source JPEGs — always compare byte
// sizes after converting and keep the original when WebP doesn't win.
const conv = ['dawhwnya2', 'dawhwnya3', 'dawhwnya4', 'tamale1', 'tamale6', 'frafraha', 'frafraha1']
for (const n of conv) {
  const out = src(`${n}.webp`)
  await sharp(path.join(BACKUP, `${n}.jpeg`)).webp({ quality: 78, effort: 6 }).toFile(out)
  report(out)
}

// ---------- 5. Logo: tight crop + downscale (alpha kept, appearance unchanged) ----------
// The master canvas (1536x1024) is ~55% transparent padding; the art's alpha
// bbox is 424,144 -> 1118,696. Cropping with a 12px safe margin lets the
// rendered box height equal the visible art height in the navbar/footer.
// Displayed at up to 64 CSS px tall; 320px covers 5x DPR headroom. Palette
// PNG: the art is flat red/black + AA, so 255 colors are lossless in practice.
const LOGO_CROP = { left: 412, top: 132, width: 719, height: 577 }
await sharp(path.join(BACKUP, 'logo.png')).extract(LOGO_CROP)
  .resize({ height: 320 }).png({ palette: true, colors: 255, compressionLevel: 9 }).toFile(src('logo.png'))
report(src('logo.png'))

// ---------- 5b. Dark-background logo variant for the navy footer ----------
// Pixel rule: official red (strong R dominance) untouched; every other
// visible pixel recolored white at its original alpha. No inversion, no
// added effects — geometry and spacing stay byte-identical.
{
  const { data, info } = await sharp(path.join(BACKUP, 'logo.png')).extract(LOGO_CROP).raw().toBuffer({ resolveWithObject: true })
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue
    if (data[i] - Math.max(data[i + 1], data[i + 2]) > 60) continue
    data[i] = 255; data[i + 1] = 255; data[i + 2] = 255
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .resize({ height: 320 }).png({ palette: true, colors: 255, compressionLevel: 9 }).toFile(src('logo-dark.png'))
  report(src('logo-dark.png'))
}

// ---------- 6. Favicon from the roof mark of the official logo ----------
// Hand-tuned bounding box of the roof mark; sharp's trim() misreads the
// soft glow as background, so the region is fixed instead.
const mark = await sharp(path.join(BACKUP, 'logo.png'))
  .extract({ left: 420, top: 130, width: 720, height: 380 })
  .toBuffer()
for (const [size, name] of [[64, 'favicon.png'], [180, 'apple-touch-icon.png']]) {
  const out = path.join(PUBLIC, name)
  await sharp(mark)
    .resize({ width: size, height: size, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(out)
  report(out)
}

console.log('done')
