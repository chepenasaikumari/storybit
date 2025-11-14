"use client";

import React from "react";
import MovieCard from "./MovieCard";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  release_date?: string;
};

export default function MovieRow({
  movies,
  categoryTitle,
}: {
  movies: Movie[];
  categoryTitle?: string;
}) {
  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between mb-2">
        {categoryTitle && (
          <h3 className="text-lg font-medium">{categoryTitle}</h3>
        )}
      </div>

      <div className="movie-row flex gap-3 overflow-x-auto scrollbar-hide py-2">
        {movies.map((m) => (
          <div
            className="min-w-[140px] sm:min-w-[160px] md:min-w-[180px]"
            key={m.id}
          >
            <MovieCard movie={m} />
          </div>
        ))}
      </div>
    </div>
  );
}
