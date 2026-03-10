"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const DEFAULT_TEST_DURATION_SECONDS = 30;
const TIME_OPTIONS_SECONDS = [15, 30, 60] as const;
const INITIAL_WORD_COUNT = 450;
const WORDS_PER_LINE = 13;

const WORD_BANK = [
  "if",
  "school",
  "turn",
  "part",
  "down",
  "there",
  "face",
  "develop",
  "over",
  "these",
  "come",
  "house",
  "she",
  "change",
  "around",
  "out",
  "feel",
  "the",
  "too",
  "hand",
  "long",
  "however",
  "in",
  "give",
  "high",
  "early",
  "here",
  "off",
  "large",
  "into",
  "show",
  "which",
  "of",
  "for",
  "than",
  "child",
  "at",
  "that",
  "get",
  "know",
  "help",
  "before",
  "good",
  "new",
  "about",
  "might",
  "think",
  "world",
  "very",
  "through",
  "must",
  "week",
  "water",
  "work",
  "while",
  "between",
  "right",
  "name",
  "after",
  "great",
  "still",
  "same",
];

type TestStatus = "idle" | "running" | "finished";
type LineBlock = {
  text: string;
  start: number;
  end: number;
};

function createWordSet(count: number) {
  const words: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const index = Math.floor(Math.random() * WORD_BANK.length);
    words.push(WORD_BANK[index]);
  }
  return words;
}

function countCorrectChars(target: string, typed: string) {
  let correct = 0;
  const limit = Math.min(target.length, typed.length);
  for (let i = 0; i < limit; i += 1) {
    if (typed[i] === target[i]) {
      correct += 1;
    }
  }
  return correct;
}

function createLineBlocks(words: string[], wordsPerLine: number) {
  const blocks: LineBlock[] = [];
  let cursor = 0;

  for (let i = 0; i < words.length; i += wordsPerLine) {
    const lineWords = words.slice(i, i + wordsPerLine);
    const isLastLine = i + wordsPerLine >= words.length;
    const text = isLastLine ? lineWords.join(" ") : `${lineWords.join(" ")} `;
    const start = cursor;
    const end = start + text.length;
    blocks.push({ text, start, end });
    cursor = end;
  }

  return blocks;
}

export default function TypingTest() {
  const [words, setWords] = useState<string[]>(() => createWordSet(INITIAL_WORD_COUNT));
  const [typedText, setTypedText] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<number>(DEFAULT_TEST_DURATION_SECONDS);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TEST_DURATION_SECONDS);
  const [status, setStatus] = useState<TestStatus>("idle");

  const targetText = useMemo(() => words.join(" "), [words]);
  const lineBlocks = useMemo(() => createLineBlocks(words, WORDS_PER_LINE), [words]);
  const caretIndex = Math.min(typedText.length, targetText.length);
  const activeLineIndex = useMemo(() => {
    const index = lineBlocks.findIndex((line) => caretIndex < line.end);
    if (index === -1) {
      return Math.max(0, lineBlocks.length - 1);
    }
    return index;
  }, [caretIndex, lineBlocks]);
  const visibleLineStart = useMemo(() => {
    const maxStart = Math.max(0, lineBlocks.length - 3);
    const desiredStart = Math.max(0, activeLineIndex - 2);
    return Math.min(desiredStart, maxStart);
  }, [activeLineIndex, lineBlocks.length]);

  const elapsedSeconds = selectedDuration - timeLeft;
  const correctChars = useMemo(
    () => countCorrectChars(targetText, typedText),
    [targetText, typedText],
  );

  const accuracy = typedText.length === 0 ? 100 : (correctChars / typedText.length) * 100;
  const grossWpm = elapsedSeconds <= 0 ? 0 : (typedText.length / 5 / elapsedSeconds) * 60;
  const netWpm = elapsedSeconds <= 0 ? 0 : (correctChars / 5 / elapsedSeconds) * 60;

  const resetTest = useCallback((nextDuration?: number) => {
    const duration = nextDuration ?? selectedDuration;
    if (nextDuration !== undefined) {
      setSelectedDuration(nextDuration);
    }
    setWords(createWordSet(INITIAL_WORD_COUNT));
    setTypedText("");
    setTimeLeft(duration);
    setStatus("idle");
  }, [selectedDuration]);

  useEffect(() => {
    if (status !== "running") {
      return;
    }

    const timerId = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timerId);
          setStatus("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [status]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (timeLeft <= 0 || status === "finished") {
        if (event.key === "Tab") {
          event.preventDefault();
          resetTest();
          return;
        }
        event.preventDefault();
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        resetTest();
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        setTypedText((prev) => prev.slice(0, -1));
        return;
      }

      if (event.key === " ") {
        event.preventDefault();
        setTypedText((prev) => {
          if (prev.length >= targetText.length) {
            return prev;
          }
          if (prev.length === 0 || prev.endsWith(" ")) {
            return prev;
          }
          return `${prev} `;
        });
      }

      if (event.key.length !== 1) {
        return;
      }

      const normalized = event.key.toLowerCase();
      if (!/^[a-z]$/.test(normalized)) {
        return;
      }

      if (status === "idle") {
        setStatus("running");
      }

      event.preventDefault();
      setTypedText((prev) => {
        if (prev.length >= targetText.length) {
          return prev;
        }
        return `${prev}${normalized}`;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resetTest, status, targetText.length, timeLeft]);

  return (
    <section className="mx-auto flex w-full flex-col items-center text-center">
      <div className="mb-5 flex items-center justify-center gap-5 text-sm text-neutral-400">
        <span className="text-amber-500 tabular-nums">{timeLeft}s</span>
        <span className="tabular-nums">{Math.round(netWpm)} wpm</span>
        <span className="tabular-nums">{Math.round(accuracy)}%</span>
        <div className="flex items-center gap-1 rounded-md border border-neutral-500 p-0.5">
          {TIME_OPTIONS_SECONDS.map((seconds) => (
            <button
              key={`duration-${seconds}`}
              type="button"
              onClick={() => resetTest(seconds)}
              className={`rounded px-2 py-0.5 text-xs transition-colors ${
                selectedDuration === seconds
                  ? "bg-neutral-700 text-neutral-100"
                  : "text-neutral-700 hover:bg-neutral-300"
              }`}
            >
              {seconds}s
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => resetTest()}
          className="rounded-md border border-neutral-700 px-2.5 py-1 text-xs text-neutral-700 transition-colors hover:border-neutral-800 hover:text-neutral-900"
        >
          reset
        </button>
      </div>

      <div
        className={`px-1 text-[22px] leading-[1.4] tracking-wide transition-[filter,opacity] duration-200 sm:text-[26px] ${
          status === "finished" ? "blur-[2px] opacity-60" : ""
        }`}
        aria-live="polite"
      >
        <div className="space-y-1">
          {[0, 1, 2].map((offset) => {
            const lineIndex = visibleLineStart + offset;
            const line = lineBlocks[lineIndex];

            if (!line) {
              return (
                <div key={`line-${offset}`} className="min-h-[1.4em]">
                  <span className="invisible">.</span>
                </div>
              );
            }

            return (
              <div key={`line-${lineIndex}`} className="min-h-[1.4em]">
                {line.text.split("").map((char, index) => {
                  const globalIndex = line.start + index;
                  const typedChar = typedText[globalIndex];
                  const isTyped = typedChar !== undefined;
                  const isCorrect = typedChar === char;
                  const isActive = globalIndex === caretIndex && status !== "finished";
                  const classes = isTyped
                    ? isCorrect
                      ? "text-neutral-900"
                      : "text-rose-500 underline decoration-2 underline-offset-6"
                    : "text-neutral-500";

                  return (
                    <span
                      key={`char-${globalIndex}`}
                      className={`${classes} ${isActive ? "border-l-2 border-amber-400" : ""}`}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 text-xs text-neutral-500">
        start typing • press{" "}
        <kbd className="rounded border border-neutral-500 bg-neutral-200 px-1 text-neutral-700">tab</kbd>{" "}
        to restart • gross{" "}
        {Math.round(grossWpm)} wpm
      </div>
    </section>
  );
}
