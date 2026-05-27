import { useEffect, useState } from "react";
import type { Artwork } from "../schemas/artwork.schema";
import { getGallery, saveGallery } from "../services/gallery.service";

export function useGallery() {
  const [gallery, setGallery] = useState<Artwork[]>([]);

  useEffect(() => {
    setGallery(getGallery());
  }, []);

  function addArtwork(artwork: Artwork) {
    setGallery((prev) => {
      const exists = prev.find((a) => a.id === artwork.id);
      if (exists) return prev;

      const updated = [...prev, artwork];
      saveGallery(updated);
      return updated;
    });
  }

  function removeArtwork(id: number) {
    setGallery((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      saveGallery(updated);
      return updated;
    });
  }

  function updateNote(id: number, note: string) {
    const updated = gallery.map((a) =>
      a.id === id ? { ...a, note } : a
    );

    setGallery(updated);
    saveGallery(updated);
  }

  return {
    gallery,
    addArtwork,
    removeArtwork,
    updateNote,
  };
}