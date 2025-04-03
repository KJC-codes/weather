import N5_KANJI from '@/app/lib/constants/N5';

const keys: Record<string, string[]> = {
  n5: N5_KANJI.map(k => k.kanji)
};

const invalidKanji = (query: string, set: string = 'n5') => {
  const result = query.split('').filter(kanji => !keys[set].includes(kanji));
  return result.length > 0
}

export default invalidKanji