import type { Artwork } from "../schemas/artwork.schema";

type Props = {
  artwork: Artwork;
  onAdd?: (artwork: Artwork) => void;
};

export default function ArtworkCard({ artwork, onAdd }: Props) {
  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    : "https://via.placeholder.com/400x300";

  return (
    <div className="border rounded-xl p-3">
      <img src={imageUrl} className="h-64 w-full object-cover rounded" />

      <h3 className="font-semibold mt-2">{artwork.title}</h3>
      <p className="text-sm text-gray-500">{artwork.artist_title}</p>

      {onAdd && (
        <button
          onClick={() => onAdd(artwork)}
          className="mt-2 bg-black text-white px-3 py-1 rounded"
        >
          Add to Gallery
        </button>
      )}
    </div>
  );
}