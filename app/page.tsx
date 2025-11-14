
import React from 'react'
import HeroBanner from '../components/HeroBanner'
import MovieRow from '../components/MovieRow'

type MovieListResponse = {
  results: Array<any> 
}

const TMDB_BASE = 'https://api.themoviedb.org/3'

async function fetchCategory(path: string) {
  const key = process.env.TMDB_API_KEY
  const url = `${TMDB_BASE}${path}?api_key=${key}&language=en-US&page=1`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch ${path}`)
  const data = (await res.json()) as MovieListResponse
  return data.results
}

export default async function HomePage() {
 
  const [popular, topRated, nowPlaying] = await Promise.all([
    fetchCategory('/movie/popular'),
    fetchCategory('/movie/top_rated'),
    fetchCategory('/movie/now_playing')
  ])

  const heroMovie = popular[0] ?? null

  return (
    <div className="space-y-8 pb-8">
      {heroMovie && <HeroBanner movie={heroMovie} />}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Popular</h2>
        <MovieRow movies={popular} categoryTitle="Popular" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Top Rated</h2>
        <MovieRow movies={topRated} categoryTitle="Top Rated" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Now Playing</h2>
        <MovieRow movies={nowPlaying} categoryTitle="Now Playing" />
      </section>
    </div>
  )
}
