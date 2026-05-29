import type { Artwork } from "../schemas/artwork.schema";
import { NoteSchema } from "../schemas/note.schema";

type Props = {
  gallery: Artwork[];
  removeArtwork: (id: number) => void;
  updateNote: (id: number, note: string) => void;
};

export default function Gallery({ gallery, removeArtwork, updateNote }: Props) {
  function handleNoteChange(id: number, value: string) {
    const validated = NoteSchema.safeParse(value);
    if (!validated.success) return;
    updateNote(id, value);
  }

  if (gallery.length === 0) return null;

  return (
    <section className="mt-24">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-light tracking-tight text-[#f5ede0]">
            My Gallery
          </h2>
          <p className="text-sm text-neutral-500 mt-2">
            Your saved collection
          </p>
        </div>

        <span className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] opacity-70">
          {gallery.length} {gallery.length === 1 ? "artwork" : "artworks"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {gallery.map((art) => {
          const imageUrl = art.image_id
            ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
            : null;

          return (
            <div
              key={art.id}
              className="group overflow-hidden rounded-3xl bg-[#171412] border border-neutral-800 transition-all duration-300 hover:border-[#c9a84c]/40 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
            >
              <div className="overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={art.title}
                    className="w-full h-72 sm:h-80 object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-72 sm:h-80 bg-[#1a1714] flex items-center justify-center">
                    <span className="text-xs tracking-widest uppercase text-neutral-600">
                      No Image
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl text-[#f5ede0] font-medium leading-snug line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-500 mt-1.5">
                  {art.artist_title || "Unknown Artist"}
                </p>

                <textarea
                  placeholder="Add your personal note..."
                  rows={3}
                  value={art.note || ""}
                  onChange={(e) => handleNoteChange(art.id, e.target.value)}
                  className="
                    mt-5 w-full rounded-2xl
                    border border-neutral-700
                    bg-[#0f0e0d]
                    p-4
                    text-sm text-[#f5ede0]
                    placeholder:text-neutral-600
                    resize-none
                    focus:outline-none focus:border-[#c9a84c]/60
                    transition-all duration-300
                  "
                />

                <button
                  onClick={() => removeArtwork(art.id)}
                  className="
                    mt-4 w-full rounded-2xl
                    border border-[#3a1a1a]
                    bg-transparent
                    py-3 px-4
                    text-xs font-semibold tracking-widest uppercase
                    text-[#8f8577]
                    hover:border-red-900/60
                    hover:text-red-400
                    hover:bg-red-950/20
                    active:scale-[0.98]
                    transition-all duration-300
                  "
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}