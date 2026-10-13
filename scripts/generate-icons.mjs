// Generates every favicon / app icon in public/ from src/assets/logo.png.
//
// The full logo (roof + "MURRAY" + tagline) is unreadable at 16–48px, which is
// the size Google renders next to search results. So we crop just the roof
// mark, centre it on an opaque white square (Google shows favicons inside a
// circle, so transparent edges look broken in dark mode), and emit sizes that
// are multiples of 48px as Google Search requires.
//
// Run: node scripts/generate-icons.mjs
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'src/assets/logo.png')
const OUT = path.join(root, 'public')

// Roof mark occupies the top ~200px of the 399x320 logo; text starts below.
const ROOF_HEIGHT = 200
// Fraction of the canvas the mark may fill (leaves room for Google's circle crop).
const FILL = 0.88
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

async function roofMark() {
  const cropped = await sharp(SRC)
    .extract({ left: 0, top: 0, width: 399, height: ROOF_HEIGHT })
    .png()
    .toBuffer()
  return sharp(cropped).trim().png().toBuffer()
}

async function square(mark, size) {
  const inner = Math.round(size * FILL)
  const resized = await sharp(mark)
    .resize(inner, inner, { fit: 'inside', kernel: 'lanczos3' })
    .png()
    .toBuffer()
  return sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: resized, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

// Minimal ICO container holding PNG-encoded images (supported by all modern browsers).
function buildIco(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  const dir = Buffer.alloc(16 * images.length)
  let offset = 6 + dir.length
  images.forEach(({ size, data }, i) => {
    const o = i * 16
    dir.writeUInt8(size >= 256 ? 0 : size, o)
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1)
    dir.writeUInt8(0, o + 2)
    dir.writeUInt8(0, o + 3)
    dir.writeUInt16LE(1, o + 4)
    dir.writeUInt16LE(32, o + 6)
    dir.writeUInt32LE(data.length, o + 8)
    dir.writeUInt32LE(offset, o + 12)
    offset += data.length
  })
  return Buffer.concat([header, dir, ...images.map((img) => img.data)])
}

const mark = await roofMark()

const pngs = {
  'favicon-48.png': 48,
  'favicon-96.png': 96,
  'favicon-144.png': 144,
  'icon-192.png': 192,
  'icon-512.png': 512,
  'apple-touch-icon.png': 180,
}
for (const [name, size] of Object.entries(pngs)) {
  await writeFile(path.join(OUT, name), await square(mark, size))
}

const icoSizes = [16, 32, 48]
const ico = buildIco(await Promise.all(icoSizes.map(async (size) => ({ size, data: await square(mark, size) }))))
await writeFile(path.join(OUT, 'favicon.ico'), ico)

console.log(`generate-icons: wrote favicon.ico (${icoSizes.join('/')}) + ${Object.keys(pngs).join(', ')}`)
