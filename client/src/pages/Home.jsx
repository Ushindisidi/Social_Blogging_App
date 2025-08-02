import React from 'react'

export default function Home() {
  return (
    <div>
        <section className="p-8 space-y-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <h2 className="text-3xl font-bold">🌗 Theme Toggle Test</h2>
        <p>This paragraph should be dark text on light mode, and light text on dark mode.</p>

        <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-md">
            <p>Card with border: light in light mode, darker in dark mode.</p>
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-300">
            Test Button
        </button>
        </section>

    </div>
  )
}
