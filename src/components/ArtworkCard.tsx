import type { Artwork } from "../schemas/artwork.schema";

type Props = {
  artwork: Artwork;
  onAdd?: (artwork: Artwork) => void;
};

export default function ArtworkCard({ artwork, onAdd }: Props) {
  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    : "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-neutral-100">
      
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={imageUrl}
          alt={artwork.title}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h3 className="text-lg font-medium tracking-tight line-clamp-2">
          {artwork.title}
        </h3>

        <p className="text-sm text-neutral-500">
          {artwork.artist_title || "Unknown Artist"}
        </p>

        {/* Button */}
        {onAdd && (
          <button
            onClick={() => onAdd(artwork)}
            className="mt-4 w-full py-2 rounded-xl bg-neutral-900 text-white text-sm font-medium
                       hover:bg-neutral-800 active:scale-[0.98] transition"
          >
            Add to Gallery
          </button>
        )}
      </div>
    </div>
  );
}