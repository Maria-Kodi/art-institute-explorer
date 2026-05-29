import type { Artwork } from "../schemas/artwork.schema";
import { NoteSchema } from "../schemas/note.schema";

type Props = {
  gallery: Artwork[];
  removeArtwork: (id: number) => void;
  updateNote: (id: number, note: string) => void;
};

export default function Gallery({
  gallery,
  removeArtwork,
  updateNote,
}: Props) {
  function handleNoteChange(id: number, value: string) {
    const validated = NoteSchema.safeParse(value);

    if (!validated.success) return;

    updateNote(id, value);
  }

  return (
    <section className="mt-24">
      {/* heading */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-light tracking-tight text-[#f5ede0]">
            My Gallery
          </h2>

          <p className="text-sm text-neutral-500 mt-2">
            Your saved collection
          </p>
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] opacity-70">
          {gallery.length} artworks
        </p>
      </div>

      {/* empty state */}
      {gallery.length === 0 && (
        <div className="border border-dashed border-neutral-700 rounded-3xl p-14 text-center bg-[#171412]">
          <p className="text-sm tracking-wide text-neutral-500">
            Your gallery is empty
          </p>
        </div>
      )}

      {/* gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {gallery.map((art) => {
          const imageUrl = art.image_id
            ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
            : "https://via.placeholder.com/600x400?text=No+Image";

          return (
            <div
              key={art.id}
              className="group overflow-hidden rounded-3xl bg-[#171412] border border-neutral-800 transition duration-300 hover:border-[#c9a84c]/40 hover:-translate-y-1"
            >
              {/* image */}
              <div className="overflow-hidden">
                <img
                  src={imageUrl}
                  alt={art.title}
                  className="w-full h-80 object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>

              {/* content */}
              <div className="p-6">
                <h3 className="text-xl text-[#f5ede0] font-medium leading-snug">
                  {art.title}
                </h3>

                <p className="text-sm text-neutral-500 mt-2">
                  {art.artist_title || "Unknown Artist"}
                </p>

                {/* notes */}
                <textarea
                  placeholder="Add your personal note..."
                  rows={3}
                  value={art.note || ""}
                  onChange={(e) =>
                    handleNoteChange(art.id, e.target.value)
                  }
                  className="
                    mt-5
                    w-full
                    rounded-2xl
                    border
                    border-neutral-700
                    bg-[#0f0e0d]
                    p-4
                    text-sm
                    text-[#f5ede0]
                    placeholder:text-neutral-600
                    resize-none
                    focus:outline-none
                    focus:border-[#c9a84c]
                    transition
                  "
                />

                {/* remove button */}
                <button
                  onClick={() => removeArtwork(art.id)}
                  className="
                    mt-5
                    w-full
                    rounded-2xl
                    border
                    border-red-900/40
                    bg-red-950/20
                    py-3
                    text-sm
                    text-red-300
                    transition
                    hover:bg-red-900/30
                  "
                >
                  Remove Artwork
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}