"use client";

import { useEffect, useState, ReactNode } from "react";
import DICTIONARY from "@/app/lib/constants/DICTIONARY";
// import N5_KANJI, { Kanji } from "@/app/lib/constants/N5";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const Match = () => {
  const [quiz, setQuiz] = useState<{ options: {
    keb: string;
    reading: string;
    meaning: string;
  }[]; answer: {
    keb: string;
    reading: string;
    meaning: string;
  } } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState<{ status: string; selected: string, message: ReactNode } | null>(null);

  const generateQuiz = () => {
    // Filter entries by keb length and, if provided, by currentKanjiList
    const entries = DICTIONARY.filter(entry => entry.keb && entry.keb.length >=2);
    // if (currentKanjiList) {
    //   const allowedKanji = currentKanjiList.map(k => k.kanji);
    //   entries = entries.filter(entry =>
    //     allowedKanji.some(kanji => entry.keb.includes(kanji))
    //   );
    // }
    const randomIndex = Math.floor(Math.random() * entries.length);
    const baseKanji = entries[randomIndex].keb[0];
    const subset = shuffleArray(entries.filter(entry => entry.keb[0] === baseKanji)).slice(0, 4);
    setQuiz({ options: subset, answer: subset[Math.floor(Math.random() * subset.length)] });
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", modalVisible);
    return () => document.body.classList.remove("overflow-hidden");
  }, [modalVisible]);

  const checkAnswer = (selectedIndex: number) => {
    if (!quiz) return;
    const selected = quiz.options[selectedIndex];
    const isCorrect = selected.keb === quiz.answer.keb;
    const selectedChars = selected.keb.split("");
    // const meanings = selectedChars.map((char: string) => {
    //   const found = N5_KANJI.find(item => item.kanji === char);
    //   return found ? found.meaning.join(", ") : "";
    // });
    setFeedback({
      status: isCorrect ? "Correct!" : "Sorry!",
      selected: selected.keb,
      message: (<span>{selected.reading}<br />{selected.meaning}</span>)
    });
    setModalVisible(true);
  };

  const nextQuiz = () => {
    setFeedback(null);
    generateQuiz();
    setModalVisible(false);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <>
      <div className={`${modalVisible ? "blur" : ""} flex flex-col gap-4`}>
        <p className="mt-4 p-8 text-center text-3xl rounded-lg bg-sky-900 text-white">
          Which option is the kanji for {quiz.answer.reading}?
        </p>
        <ul className="grid grid-cols-2 gap-4">
          {quiz.options.map((entry, index) => (
            <li key={`${entry.keb}-${entry.meaning}`} className="p-8 text-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white">
              <button onClick={() => checkAnswer(index)} className="jp-text text-6xl cursor-pointer">
                {entry.keb}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {modalVisible && (
        <div aria-hidden="true" className="fixed inset-0 flex items-center justify-center z-50">
          <div className="text-center min-w-xl bg-zinc-800 border-2 border-white rounded-lg shadow-lg text-white p-8 flex flex-col gap-4">
            <p className="text-5xl font-bold">{feedback?.status}</p>
            <p className="jp-text text-6xl p-6">{feedback?.selected}</p>
            <p className="text-lg">{feedback?.message}</p>
            <button onClick={nextQuiz} className="cursor-pointer p-6 text-lg rounded-lg bg-sky-900 hover:bg-sky-800">
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Match;
