// Reads the project listings out of src/assets/assets.js for the Node build
// scripts (sitemap + per-route HTML). assets.js imports image files, so it
// cannot be imported directly in Node; the fields we need are parsed instead.
// Throws loudly if the data shape changes so routes can never silently drop.
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

const unquote = (s) => s.replace(/^["'`]|["'`]$/g, '').replace(/\\(["'`])/g, '$1')

export function readProjects() {
    const source = readFileSync(path.join(ROOT, 'src/assets/assets.js'), 'utf8')

    // `import front_east from './Feastlegon2.webp'` -> { front_east: 'Feastlegon2.webp' }
    const imports = Object.fromEntries(
        [...source.matchAll(/^import\s+(\w+)\s+from\s+['"]\.\/([^'"]+)['"]/gm)].map((m) => [m[1], m[2]])
    )

    const start = source.indexOf('export const projectsData')
    if (start === -1) throw new Error('readProjects: projectsData not found in src/assets/assets.js')
    const block = source.slice(start)

    // Each project object begins at its `id:` line; slice between consecutive ids.
    const idMatches = [...block.matchAll(/^\s{4,6}id:\s*(\d+),/gm)]
    if (!idMatches.length) throw new Error('readProjects: no project ids found — check the projectsData shape')

    return idMatches.map((m, i) => {
        const chunk = block.slice(m.index, idMatches[i + 1]?.index ?? block.length)
        const field = (name) => {
            const f = chunk.match(new RegExp(`^\\s{4,8}${name}:\\s*("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`[^\`]*\`|\\w+)`, 'm'))
            return f ? f[1] : null
        }
        const project = {
            id: Number(m[1]),
            title: field('title') && unquote(field('title')),
            location: field('location') && unquote(field('location')),
            description: field('description') && unquote(field('description')),
            status: field('status') && unquote(field('status')),
            // Source filename of the cover image (resolved to its hashed dist URL later).
            coverFile: imports[field('coverImage')] ?? null,
        }
        for (const key of ['title', 'location', 'description', 'status']) {
            if (!project[key]) throw new Error(`readProjects: project ${project.id} is missing "${key}"`)
        }
        return project
    })
}

