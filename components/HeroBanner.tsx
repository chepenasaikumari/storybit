"use client";

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
};
const IMG_BASE = 'https://image.tmdb.org/t/p/original'

export default function HeroBanner({ movie }: { movie: Movie }) {
  const backdrop = movie.backdrop_path ?? movie.poster_path

  return (
    <section className="relative rounded-lg overflow-hidden shadow-xl">
      <div className="relative h-64 sm:h-96 w-full bg-gray-800">
        {backdrop ? (
          <Image
            src={`${IMG_BASE}${backdrop}`}
            alt={movie.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute left-6 bottom-6 right-6 sm:left-12 sm:bottom-12 sm:right-auto max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-bold">{movie.title}</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300 line-clamp-3">{movie.overview}</p>

          <div className="mt-4 flex gap-3">

            {/* ✔ FIX: Valid Link (no <a>) */}
            <Link
              href={`/movie/${movie.id}`}
              className="px-4 py-2 bg-white text-black rounded font-medium"
            >
              View Details
            </Link>

            {/* ✔ Works because component is now a Client Component */}
            <button
              onClick={() => alert('Add to watchlist - demo')}
              className="px-4 py-2 border border-white/30 rounded text-white"
            >
              + Watchlist
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}
