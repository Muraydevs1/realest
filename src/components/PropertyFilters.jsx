/* eslint-disable react/prop-types */
import { useEffect, useId, useRef, useState } from 'react'
import { SlidersHorizontal, X, Check } from 'lucide-react'
import {
    availableCategories,
    availableFilterGroups,
    activeFilterCount,
    toggleFilterValue,
    createFilters,
} from '../utils/listings'

/**
 * Primary category tabs + a secondary filter panel.
 *
 * Everything rendered here is derived from the data passed in — no filter
 * value is hardcoded in JSX. A tab or checkbox appears the moment a verified
 * entry carries that value, and disappears when none does.
 *
 * The panel is a full-width expandable region at every breakpoint (one of the
 * mobile patterns the spec allows). That keeps it accessible without a focus
 * trap or body scroll-lock, which are the parts of drawer UIs that most often
 * break on real devices.
 */
function PropertyFilters({ projects, filters, onChange, resultCount }) {
    const [panelOpen, setPanelOpen] = useState(false)
    const panelId = useId()
    const filtersButtonRef = useRef(null)
    const panelRef = useRef(null)

    const categories = availableCategories(projects)
    const groups = availableFilterGroups(projects, filters)
    const activeCount = activeFilterCount(filters)

    // Escape closes the panel and returns focus to the trigger.
    useEffect(() => {
        if (!panelOpen) return undefined
        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.stopPropagation()
                setPanelOpen(false)
                filtersButtonRef.current?.focus()
            }
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [panelOpen])

    // Move focus into the panel when it opens so keyboard users land on the
    // controls rather than having to tab back through the page.
    useEffect(() => {
        if (panelOpen) panelRef.current?.querySelector('input')?.focus()
    }, [panelOpen])

    const clearAll = () => onChange(createFilters({ category: filters.category }))

    return (
        <div className='mb-10'>
            {/* Primary categories. Plain buttons with aria-pressed rather than a
                tablist: each is individually tabbable and needs no roving
                tabindex, which is more robust than a hand-rolled tab widget. */}
            <div
                role='group'
                aria-label='Filter properties by category'
                className='-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0'
            >
                {categories.map((category) => {
                    const active = filters.category === category.key
                    return (
                        <button
                            key={category.key}
                            type='button'
                            aria-pressed={active}
                            onClick={() => onChange({ ...createFilters({ category: category.key }) })}
                            className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${active
                                ? 'border-brand-500 bg-brand-500 text-white'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-brand-500 hover:text-brand-600'
                                }`}
                        >
                            {category.label}
                            <span className={active ? 'ml-2 text-white/80' : 'ml-2 text-gray-400'}>{category.count}</span>
                        </button>
                    )
                })}
            </div>

            {/* Toolbar: result count + filters trigger. The trigger only exists
                when the current data actually offers something to filter by. */}
            <div className='mt-5 flex flex-wrap items-center justify-between gap-3'>
                <p className='text-sm text-gray-600' aria-live='polite'>
                    {resultCount} {resultCount === 1 ? 'property' : 'properties'}
                    {activeCount > 0 && <span className='text-gray-400'> · {activeCount} filter{activeCount === 1 ? '' : 's'} applied</span>}
                </p>

                {groups.length > 0 && (
                    <div className='flex items-center gap-3'>
                        {activeCount > 0 && (
                            <button
                                type='button'
                                onClick={clearAll}
                                className='rounded-full px-3 py-2 text-sm text-gray-500 underline underline-offset-4 transition hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
                            >
                                Clear filters
                            </button>
                        )}
                        <button
                            ref={filtersButtonRef}
                            type='button'
                            onClick={() => setPanelOpen((open) => !open)}
                            aria-expanded={panelOpen}
                            aria-controls={panelId}
                            className='inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-brand-500 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
                        >
                            <SlidersHorizontal className='size-4' aria-hidden='true' />
                            Filters
                            {activeCount > 0 && (
                                <span className='flex size-5 items-center justify-center rounded-full bg-brand-500 text-xs font-semibold text-white'>
                                    {activeCount}
                                </span>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {groups.length > 0 && (
                <div
                    id={panelId}
                    ref={panelRef}
                    hidden={!panelOpen}
                    className='mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm'
                >
                    <div className='mb-4 flex items-center justify-between'>
                        <h2 className='text-base font-semibold text-gray-900'>Refine results</h2>
                        <button
                            type='button'
                            onClick={() => { setPanelOpen(false); filtersButtonRef.current?.focus() }}
                            aria-label='Close filters'
                            className='flex size-11 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
                        >
                            <X className='size-5' aria-hidden='true' />
                        </button>
                    </div>

                    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        {groups.map((group) => (
                            <fieldset key={group.key}>
                                <legend className='mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400'>
                                    {group.label}
                                </legend>
                                <ul className='space-y-1'>
                                    {group.options.map((option) => {
                                        const checked = (filters[group.key] ?? []).includes(option.value)
                                        return (
                                            <li key={option.value}>
                                                <label className='flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 focus-within:ring-2 focus-within:ring-brand-500'>
                                                    <span className='relative flex size-5 shrink-0 items-center justify-center'>
                                                        <input
                                                            type='checkbox'
                                                            checked={checked}
                                                            onChange={() => onChange(toggleFilterValue(filters, group.key, option.value))}
                                                            className='peer size-5 cursor-pointer appearance-none rounded border border-gray-300 checked:border-brand-500 checked:bg-brand-500 focus:outline-none'
                                                        />
                                                        <Check className='pointer-events-none absolute size-3.5 text-white opacity-0 peer-checked:opacity-100' aria-hidden='true' />
                                                    </span>
                                                    <span className='flex-1'>{option.label}</span>
                                                    <span className='text-xs text-gray-400'>{option.count}</span>
                                                </label>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </fieldset>
                        ))}
                    </div>

                    {/* Filters apply immediately, so there is no Apply button —
                        only a reset, per the spec's guidance. */}
                    <div className='mt-5 flex items-center justify-between border-t border-gray-100 pt-4'>
                        <p className='text-sm text-gray-600'>
                            {resultCount} {resultCount === 1 ? 'result' : 'results'}
                        </p>
                        <button
                            type='button'
                            onClick={clearAll}
                            disabled={activeCount === 0}
                            className='rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:border-brand-500 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PropertyFilters
