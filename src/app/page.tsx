import N5_KANJI, { KanjiEntry } from "./lib/n5";

const capilatize = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1)

export default function Home() {
  const currentConcept = 'place';
  // const allConcepts = [...new Set(N5_KANJI.flatMap(item => item.concept))];
  const list = currentConcept ? N5_KANJI.filter(kanji => kanji.concept.includes(currentConcept)) : N5_KANJI
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8  gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="bg-zinc-800  rounded-2xl backdrop-blur-3xl p-8 flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-amber-400 text-6xl">Basic {capilatize(currentConcept)} Kanji ({list.length})</h1>
        {/* <select>
          {allConcepts.sort((a, b) => a.localeCompare(b)).map(concept => (
            <option key={concept} value={concept}>{capilatize(concept)}</option>
          ))}
        </select> */}
        <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 break-words break-keep">
          {list.map((kanji: KanjiEntry) => (
            <div key={kanji.kanji} className="bg-zinc-900 text-amber-400  text-white rounded-lg p-8" >
              <h3 className="text-7xl jp-text mb-8">{kanji.kanji}</h3>
              <p className="text-sm line-height-lg flex"><span className="text-zinc-400 mr-3">Onyomi: </span><span className="jp-text">{kanji.readings.onyomi.join(', ') || '--'}</span></p>
              <p className="text-sm line-height-lg flex"><span className="text-zinc-400 mr-3">Kunyomi: </span><span className="jp-text">{kanji.readings.kunyomi.join(', ') || '--'}</span></p>
              <p className="text-sm line-height-lg flex"><span className="text-zinc-400 mr-3">Concept: </span>{kanji.concept.map(concept => capilatize(concept)).join(', ')}</p>
              <p className="text-sm line-height-lg flex"><span className="text-zinc-400 mr-3">Strokes: </span>{kanji.strokes}</p>
              <p className="text-2xl mt-4">{kanji.meaning.map(concept => capilatize(concept)).join(', ')}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="text-xs row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p> &copy; 2025 Blah Blah Goat Kitty</p>
      </footer>
    </div>
  )
}
