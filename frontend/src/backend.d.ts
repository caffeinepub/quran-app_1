import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface JuzMapping {
    juzNumber: bigint;
    startingAyah: bigint;
    startingSurah: bigint;
}
export interface Surah {
    ayahCount: bigint;
    nameArabic: string;
    revelationType: string;
    nameEnglish: string;
    number: bigint;
}
export interface Bookmark {
    surahNumber: bigint;
    ayahNumber: bigint;
}
export interface Ayah {
    surahNumber: bigint;
    uthmaniText: string;
    urduTranslation: string;
    englishTranslation: string;
    ayahNumber: bigint;
}
export interface backendInterface {
    addAyah(ayah: Ayah): Promise<void>;
    addJuzMapping(juz: JuzMapping): Promise<void>;
    addSurah(surah: Surah): Promise<void>;
    getAyahs(surahNumber: bigint): Promise<Array<Ayah>>;
    getBookmark(): Promise<Bookmark | null>;
    getJuzIndex(): Promise<Array<JuzMapping>>;
    getSurah(surahNumber: bigint): Promise<Surah>;
    getSurahs(): Promise<Array<Surah>>;
    resetData(): Promise<void>;
    saveBookmark(surahNumber: bigint, ayahNumber: bigint): Promise<void>;
}
