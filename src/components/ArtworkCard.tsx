import type { Artwork } from "../schemas/artwork.schema";

// props type
type Props = {
  artwork: Artwork;
  onAdd?: (artwork: Artwork) => void;
};

export default function ArtworkCard({ artwork, onAdd }: Props) {

  // artwork image
  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    : "https://via.placeholder.com/600x400?text=No+Image";

  return (

    // card
    <div
      className="
        group
        bg-[#181614]
        rounded-2xl
        overflow-hidden
        border border-[#2a2622]
        hover:border-[#c9a84c]/30
        hover:-translate-y-1
        hover:shadow-2xl
        transition-all duration-500
      "
    >

      {/* image container */}
      <div className="overflow-hidden">

        {/* artwork image */}
        <img
          src={imageUrl}
          alt={artwork.title}
          className="
            w-full
            h-72
            object-cover
            group-hover:scale-105
            transition-transform
            duration-700
          "
        />

      </div>

      {/* content */}
      <div className="p-5 space-y-3">

        {/* title */}
        <h3
          className="
            text-lg
            font-medium
            tracking-tight
            line-clamp-2
            text-[#f5ede0]
          "
        >
          {artwork.title}
        </h3>

        {/* artist */}
        <p
          className="
            text-sm
            text-[#b7ab98]
          "
        >
          {artwork.artist_title || "Unknown Artist"}
        </p>

        {/* divider */}
        <div
          className="
            w-12
            h-px
            bg-[#c9a84c]/30
          "
        />

        {/* button */}
        {onAdd && (
          <button
            onClick={() => onAdd(artwork)}
            className="
              mt-4
              w-full
              py-3
              rounded-xl

              bg-[#c9a84c]
              text-black

              text-sm
              font-medium
              tracking-wide

              hover:bg-[#d8b45a]
              active:scale-[0.98]

              transition-all
              duration-300
            "
          >
            Add to Gallery
          </button>
        )}

      </div>
    </div>
  );
}