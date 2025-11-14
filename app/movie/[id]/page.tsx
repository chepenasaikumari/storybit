import Image from "next/image";

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w780";

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: Genre[];
}


async function fetchMovieDetail(id: string) {
  const key = process.env.TMDB_API_KEY;

  if (!key) {
    throw new Error("TMDB_API_KEY is missing in .env.local");
  }

  const url = `${TMDB_BASE}/movie/${id}?api_key=${key}&language=en-US`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Failed to fetch movie detail");
  }

  return (await res.json()) as MovieDetail;
}

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const movie = await fetchMovieDetail(id);

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          {movie.poster_path ? (
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={`${IMG_BASE}${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-300 mb-4">
            {movie.release_date && <span>Release: {movie.release_date} • </span>}
            {movie.runtime && <span>Runtime: {movie.runtime} min • </span>}
            {movie.vote_average && (
              <span>Rating: {movie.vote_average}/10</span>
            )}
          </p>

          <div className="prose prose-invert max-w-none mb-6">
            <p>{movie.overview}</p>
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="px-3 py-1 rounded-full bg-gray-800 text-gray-200 text-sm"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
