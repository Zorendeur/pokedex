"use client"
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-white">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="text-white font-semibold p-2 bg-indigo-600 border-2 border-white rounded-md shadow-[3px_3px_12px_-2px_rgba(0,0,0,0.3)] shadow-white"
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
  )
}