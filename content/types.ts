/** Every visible string exists in both languages, side by side. */
export type Bilingual<T = string> = { en: T; ne: T }

/** A heading with one word set in the handwritten accent face. */
export type Accented = { before: string; accent: string; after?: string }

export type Title = string | Accented

/** Heading copy for a section or page. */
export type SectionCopy = { title: Bilingual<Title>; lead?: Bilingual }
