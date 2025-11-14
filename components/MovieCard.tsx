"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  release_date?: string;
};

const IMG_BASE = 'https://image.tmdb.org/t/p/w342'

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="block group"
    >
      <div className="relative rounded-md overflow-hidden aspect-[2/3] bg-gray-800">
        {movie.poster_path ? (
          <Image
            src={`${IMG_BASE}${movie.poster_path}`}
            alt={movie.title}
            fill
            sizes="(min-width: 1024px) 180px, (min-width: 640px) 160px, 140px"
            style={{ objectFit: 'cover' }}
            className="transform transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      <div className="mt-2">
        <h4 className="text-sm font-medium line-clamp-2">{movie.title}</h4>
        {movie.release_date && (
          <p className="text-xs text-gray-400">{movie.release_date}</p>
        )}
      </div>
    </Link>
  )
}
