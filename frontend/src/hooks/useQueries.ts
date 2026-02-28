import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Surah, Ayah, JuzMapping, Bookmark } from '../backend';

export function useGetSurahs() {
  const { actor, isFetching } = useActor();
  return useQuery<Surah[]>({
    queryKey: ['surahs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSurahs();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 60,
  });
}

export function useGetSurah(surahNumber: number) {
  const { actor, isFetching } = useActor();
  return useQuery<Surah>({
    queryKey: ['surah', surahNumber],
    queryFn: async () => {
      if (!actor) throw new Error('No actor');
      return actor.getSurah(BigInt(surahNumber));
    },
    enabled: !!actor && !isFetching && surahNumber > 0,
    staleTime: 1000 * 60 * 60,
  });
}

export function useGetAyahs(surahNumber: number) {
  const { actor, isFetching } = useActor();
  return useQuery<Ayah[]>({
    queryKey: ['ayahs', surahNumber],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAyahs(BigInt(surahNumber));
    },
    enabled: !!actor && !isFetching && surahNumber > 0,
    staleTime: 1000 * 60 * 60,
  });
}

export function useGetJuzIndex() {
  const { actor, isFetching } = useActor();
  return useQuery<JuzMapping[]>({
    queryKey: ['juzIndex'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJuzIndex();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 60,
  });
}

export function useGetBookmark() {
  const { actor, isFetching } = useActor();
  return useQuery<Bookmark | null>({
    queryKey: ['bookmark'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBookmark();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveBookmark() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ surahNumber, ayahNumber }: { surahNumber: number; ayahNumber: number }) => {
      if (!actor) throw new Error('No actor');
      await actor.saveBookmark(BigInt(surahNumber), BigInt(ayahNumber));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark'] });
    },
  });
}
