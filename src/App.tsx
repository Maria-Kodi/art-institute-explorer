
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ArtworkCard from "./components/ArtworkCard";
import { searchArtworks } from "./api/artworks";
import type { Artwork } from "./schemas/artwork.schema";
import { useGallery } from "./hooks/useGallery";

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);

  const { gallery, addArtwork } = useGallery();

  async function handleSearch(query: string) {
    setLoading(true);

    try {
      const data = await searchArtworks(query);
      setArtworks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">
          Art Institute Explorer
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Saved artworks: {gallery.length}
        </p>
      </header>

      {/* Search */}
      <SearchBar onSearch={handleSearch} />

      {/* Loading */}
      {loading && (
        <p className="mt-4 text-gray-500">Loading artworks...</p>
      )}

      {/* Empty state */}
      {!loading && artworks.length === 0 && (
        <p className="mt-6 text-gray-500">
          Search for artworks to start exploring 🎨
        </p>
      )}

      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {artworks.map((art) => (
          <ArtworkCard
            key={art.id}
            artwork={art}
            onAdd={addArtwork}
          />
        ))}
      </div>
    </main>
  );
}

export default App;