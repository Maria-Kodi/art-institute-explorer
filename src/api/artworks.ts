import { ArtworkSchema, type Artwork } from "../schemas/artwork.schema";

const BASE_URL = "https://api.artic.edu/api/v1/artworks/search";

export async function searchArtworks(query: string): Promise<Artwork[]> {
  const res = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(query)}&fields=id,title,artist_title,image_id`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch artworks");
  }

  const data = await res.json();

  const results = data.data;

  // validate + clean data with Zod
  const validated: Artwork[] = results
    .map((item: unknown) => {
      const parsed = ArtworkSchema.safeParse(item);
      return parsed.success ? parsed.data : null;
    })
    .filter(Boolean);

  return validated;
}