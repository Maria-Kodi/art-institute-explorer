import type { Artwork } from "../schemas/artwork.schema";

const KEY = "gallery";

export function getGallery(): Artwork[] {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function saveGallery(items: Artwork[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}