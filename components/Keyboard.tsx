"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type Variant = "light" | "dark" | "esc";
type IconName =
  | "brightness-down"
  | "brightness-up"
  | "layout-dashboard"
  | "search"
  | "microphone"
  | "moon"
  | "player-track-prev"
  | "player-skip-forward"
  | "player-track-next"
  | "volume-3"
  | "volume-2"
  | "volume"
  | "frame"
  | "bulb"
  | "arrow-narrow-left"
  | "chevron-up"
  | "chevron-left"
  | "chevron-down"
  | "chevron-right"
  | "command";

type KeySpec = {
  width?: number;
  variant?: Variant;
  content: ReactNode;
  bindings?: string[];
};

function Icon({ name, size = 10 }: { name: IconName; size?: number }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style: { width: size, height: size },
  };

  switch (name) {
    case "brightness-down":
      return (
        <svg {...common}>
          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M12 5l0 .01" />
          <path d="M17 7l0 .01" />
          <path d="M19 12l0 .01" />
          <path d="M17 17l0 .01" />
          <path d="M12 19l0 .01" />
          <path d="M7 17l0 .01" />
          <path d="M5 12l0 .01" />
          <path d="M7 7l0 .01" />
        </svg>
      );
    case "brightness-up":
      return (
        <svg {...common}>
          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M12 5l0 -2" />
          <path d="M17 7l1.4 -1.4" />
          <path d="M19 12l2 0" />
          <path d="M17 17l1.4 1.4" />
          <path d="M12 19l0 2" />
          <path d="M7 17l-1.4 1.4" />
          <path d="M6 12l-2 0" />
          <path d="M7 7l-1.4 -1.4" />
        </svg>
      );
    case "layout-dashboard":
      return (
        <svg {...common}>
          <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
          <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
          <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
          <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg>
      );
    case "microphone":
      return (
        <svg {...common}>
          <path d="M9 5a3 3 0 0 1 3 -3a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3a3 3 0 0 1 -3 -3l0 -5" />
          <path d="M5 10a7 7 0 0 0 14 0" />
          <path d="M8 21l8 0" />
          <path d="M12 17l0 4" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008" />
        </svg>
      );
    case "player-track-prev":
      return (
        <svg {...common}>
          <path d="M21 5v14l-8 -7l8 -7" />
          <path d="M10 5v14l-8 -7l8 -7" />
        </svg>
      );
    case "player-skip-forward":
      return (
        <svg {...common}>
          <path d="M4 5v14l12 -7l-12 -7" />
          <path d="M20 5l0 14" />
        </svg>
      );
    case "player-track-next":
      return (
        <svg {...common}>
          <path d="M3 5v14l8 -7l-8 -7" />
          <path d="M14 5v14l8 -7l-8 -7" />
        </svg>
      );
    case "volume-3":
      return (
        <svg {...common}>
          <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
          <path d="M16 10l4 4m0 -4l-4 4" />
        </svg>
      );
    case "volume-2":
      return (
        <svg {...common}>
          <path d="M15 8a5 5 0 0 1 0 8" />
          <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
        </svg>
      );
    case "volume":
      return (
        <svg {...common}>
          <path d="M15 8a5 5 0 0 1 0 8" />
          <path d="M17.7 5a9 9 0 0 1 0 14" />
          <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
        </svg>
      );
    case "frame":
      return (
        <svg {...common}>
          <path d="M4 7l16 0" />
          <path d="M4 17l16 0" />
          <path d="M7 4l0 16" />
          <path d="M17 4l0 16" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...common} style={{ width: 12, height: 12 }}>
          <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
          <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
          <path d="M9.7 17l4.6 0" />
        </svg>
      );
    case "arrow-narrow-left":
      return (
        <svg {...common} style={{ width: 12, height: 12 }}>
          <path d="M5 12l14 0" />
          <path d="M5 12l4 4" />
          <path d="M5 12l4 -4" />
        </svg>
      );
    case "chevron-up":
      return (
        <svg {...common} style={{ width: 12, height: 12 }}>
          <path d="M6 15l6 -6l6 6" />
        </svg>
      );
    case "chevron-left":
      return (
        <svg {...common} style={{ width: 12, height: 12 }}>
          <path d="M15 6l-6 6l6 6" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...common} style={{ width: 12, height: 12 }}>
          <path d="M6 9l6 6l6 -6" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...common} style={{ width: 12, height: 12 }}>
          <path d="M9 6l6 6l-6 6" />
        </svg>
      );
    case "command":
      return (
        <svg {...common} style={{ width: 12, height: 12 }}>
          <path d="M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10" />
        </svg>
      );
    default:
      return null;
  }
}

function KeyboardKey({
  width = 50,
  variant = "light",
  content,
  pressed = false,
}: KeySpec & { pressed?: boolean }) {
  const outerVariantClass =
    variant === "esc"
      ? "bg-[#F57644]/80"
      : variant === "dark"
        ? "bg-neutral-500/80"
        : "bg-neutral-100/80";

  const innerVariantClass =
    variant === "esc"
      ? "bg-[#F57644] text-black/50"
      : variant === "dark"
        ? "bg-neutral-500 text-white/70"
        : "bg-neutral-100 text-black/70";

  return (
    <div style={{ height: 50, width }} className="flex items-end">
      <div
        className={`relative overflow-hidden h-[50px] rounded-[4px] rounded-t-[12px] border border-neutral-800/60 flex items-start justify-center transition-[transform] duration-75 ${outerVariantClass} ${pressed ? "translate-y-[4px]" : "translate-y-0"}`}
        style={{ width }}
      >
        <div
          className={`relative z-10 rounded-[6px] border border-t-0 border-neutral-800/60 transition-[height,transform] duration-75 text-[9px] font-medium flex flex-col items-center justify-between p-1 gap-0.5 select-none ${innerVariantClass}`}
          style={{
            width: width - 13,
            height: pressed ? 34 : 37,
            transform: pressed ? "translateY(2px)" : "translateY(0)",
          }}
        >
          {content}
        </div>
        <div
          className={`absolute z-0 bottom-0 right-0 h-px w-8 rotate-70 translate-x-3.5 bg-neutral-800/50 transition-opacity duration-75 ${pressed ? "opacity-30" : "opacity-100"}`}
        />
        <div
          className={`absolute z-0 bottom-0 left-0 h-px w-8 -rotate-70 -translate-x-3.5 bg-neutral-800/50 transition-opacity duration-75 ${pressed ? "opacity-30" : "opacity-100"}`}
        />
      </div>
    </div>
  );
}

const iconFnKey = (
  icon: IconName,
  label: string,
  variant: Variant,
  bindings: string[] = [],
): KeySpec => ({
  variant,
  bindings,
  content: (
    <>
      <Icon name={icon} />
      <span>{label}</span>
    </>
  ),
});

const singleTextKey = (
  text: string,
  variant: Variant = "light",
  width = 50,
  bindings: string[] = [],
): KeySpec => ({
  width,
  variant,
  bindings,
  content: text,
});

const stackTextKey = (
  top: string,
  bottom: string,
  variant: Variant = "light",
  width = 50,
  bindings: string[] = [],
): KeySpec => ({
  width,
  variant,
  bindings,
  content: (
    <>
      <span>{top}</span>
      <span>{bottom}</span>
    </>
  ),
});

const iconOnlyKey = (
  icon: IconName,
  variant: Variant = "dark",
  width = 50,
  size = 10,
  bindings: string[] = [],
): KeySpec => ({
  width,
  variant,
  bindings,
  content: <Icon name={icon} size={size} />,
});

const rows: KeySpec[][] = [
  [
    singleTextKey("esc", "esc", 50, ["Escape"]),
    iconFnKey("brightness-down", "F1", "light", ["F1"]),
    iconFnKey("brightness-up", "F2", "light", ["F2"]),
    iconFnKey("layout-dashboard", "F3", "light", ["F3"]),
    iconFnKey("search", "F4", "light", ["F4"]),
    iconFnKey("microphone", "F5", "dark", ["F5"]),
    iconFnKey("moon", "F6", "dark", ["F6"]),
    iconFnKey("player-track-prev", "F7", "dark", ["F7"]),
    iconFnKey("player-skip-forward", "F8", "dark", ["F8"]),
    iconFnKey("player-track-next", "F9", "dark", ["F9"]),
    iconFnKey("volume-3", "F10", "light", ["F10"]),
    iconFnKey("volume-2", "F11", "light", ["F11"]),
    iconFnKey("volume", "F12", "light", ["F12"]),
    iconOnlyKey("frame", "dark", 50, 10, ["PrintScreen"]),
    singleTextKey("del", "dark", 50, ["Delete"]),
    iconOnlyKey("bulb", "dark", 50, 12),
  ],
  [
    stackTextKey("~", "`", "light", 50, ["Backquote"]),
    stackTextKey("!", "1", "light", 50, ["Digit1"]),
    stackTextKey("@", "2", "light", 50, ["Digit2"]),
    stackTextKey("#", "3", "light", 50, ["Digit3"]),
    stackTextKey("$", "4", "light", 50, ["Digit4"]),
    stackTextKey("%", "5", "light", 50, ["Digit5"]),
    stackTextKey("^", "6", "light", 50, ["Digit6"]),
    stackTextKey("&", "7", "light", 50, ["Digit7"]),
    stackTextKey("*", "8", "light", 50, ["Digit8"]),
    stackTextKey("(", "9", "light", 50, ["Digit9"]),
    stackTextKey(")", "0", "light", 50, ["Digit0"]),
    stackTextKey("_", "-", "light", 50, ["Minus"]),
    stackTextKey("+", "=", "light", 50, ["Equal"]),
    iconOnlyKey("arrow-narrow-left", "dark", 100, 12, ["Backspace"]),
    singleTextKey("pgup", "dark", 50, ["PageUp"]),
  ],
  [
    singleTextKey("tab", "dark", 75, ["Tab"]),
    singleTextKey("Q", "light", 50, ["KeyQ"]),
    singleTextKey("W", "light", 50, ["KeyW"]),
    singleTextKey("E", "light", 50, ["KeyE"]),
    singleTextKey("R", "light", 50, ["KeyR"]),
    singleTextKey("T", "light", 50, ["KeyT"]),
    singleTextKey("Y", "light", 50, ["KeyY"]),
    singleTextKey("U", "light", 50, ["KeyU"]),
    singleTextKey("I", "light", 50, ["KeyI"]),
    singleTextKey("O", "light", 50, ["KeyO"]),
    singleTextKey("P", "light", 50, ["KeyP"]),
    stackTextKey("{", "[", "light", 50, ["BracketLeft"]),
    stackTextKey("}", "]", "light", 50, ["BracketRight"]),
    stackTextKey("|", "\\", "dark", 75, ["Backslash"]),
    singleTextKey("pgdn", "dark", 50, ["PageDown"]),
  ],
  [
    singleTextKey("caps lock", "dark", 100, ["CapsLock"]),
    singleTextKey("A", "light", 50, ["KeyA"]),
    singleTextKey("S", "light", 50, ["KeyS"]),
    singleTextKey("D", "light", 50, ["KeyD"]),
    singleTextKey("F", "light", 50, ["KeyF"]),
    singleTextKey("G", "light", 50, ["KeyG"]),
    singleTextKey("H", "light", 50, ["KeyH"]),
    singleTextKey("J", "light", 50, ["KeyJ"]),
    singleTextKey("K", "light", 50, ["KeyK"]),
    singleTextKey("L", "light", 50, ["KeyL"]),
    stackTextKey(":", ";", "light", 50, ["Semicolon"]),
    stackTextKey('"', "'", "light", 50, ["Quote"]),
    singleTextKey("return", "dark", 100, ["Enter"]),
    singleTextKey("home", "dark", 50, ["Home"]),
  ],
  [
    singleTextKey("shift", "dark", 123, ["ShiftLeft"]),
    singleTextKey("Z", "light", 50, ["KeyZ"]),
    singleTextKey("X", "light", 50, ["KeyX"]),
    singleTextKey("C", "light", 50, ["KeyC"]),
    singleTextKey("V", "light", 50, ["KeyV"]),
    singleTextKey("B", "light", 50, ["KeyB"]),
    singleTextKey("N", "light", 50, ["KeyN"]),
    singleTextKey("M", "light", 50, ["KeyM"]),
    stackTextKey("<", ",", "light", 50, ["Comma"]),
    stackTextKey(">", ".", "light", 50, ["Period"]),
    stackTextKey("?", "/", "light", 50, ["Slash"]),
    singleTextKey("shift", "dark", 77, ["ShiftRight"]),
    iconOnlyKey("chevron-up", "light", 50, 12, ["ArrowUp"]),
    singleTextKey("end", "dark", 50, ["End"]),
  ],
  [
    singleTextKey("ctrl", "dark", 62, ["ControlLeft"]),
    singleTextKey("option", "dark", 62, ["AltLeft"]),
    iconOnlyKey("command", "dark", 62, 12, ["MetaLeft"]),
    singleTextKey("", "light", 314, ["Space"]),
    iconOnlyKey("command", "dark", 50, 12, ["MetaRight"]),
    singleTextKey("fn", "dark"),
    singleTextKey("ctrl", "dark", 50, ["ControlRight"]),
    iconOnlyKey("chevron-left", "light", 50, 12, ["ArrowLeft"]),
    iconOnlyKey("chevron-down", "light", 50, 12, ["ArrowDown"]),
    iconOnlyKey("chevron-right", "light", 50, 12, ["ArrowRight"]),
  ],
];

export default function Keyboard() {
  const [pressedCodes, setPressedCodes] = useState<Set<string>>(() => new Set());
  const pressedCodesRef = useRef<Set<string>>(new Set());
  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);

  const supportedCodes = useMemo(() => {
    const codes = new Set<string>();
    rows.forEach((row) => {
      row.forEach((key) => key.bindings?.forEach((code) => codes.add(code)));
    });
    return codes;
  }, []);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") {
      return null;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }

    if (audioContextRef.current.state === "suspended") {
      void audioContextRef.current.resume();
    }

    return audioContextRef.current;
  }, []);

  const getNoiseBuffer = useCallback((context: AudioContext) => {
    if (noiseBufferRef.current) {
      return noiseBufferRef.current;
    }

    const length = Math.floor(context.sampleRate * 0.06);
    const noiseBuffer = context.createBuffer(1, length, context.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      const decay = 1 - i / length;
      data[i] = (Math.random() * 2 - 1) * decay;
    }

    noiseBufferRef.current = noiseBuffer;
    return noiseBuffer;
  }, []);

  const playSyntheticKeychronSound = useCallback(
    (context: AudioContext, type: "down" | "up") => {
      const now = context.currentTime;
      const jitter = (Math.random() - 0.5) * 0.08;

      const clickOsc = context.createOscillator();
      const clickGain = context.createGain();
      clickOsc.type = "square";
      clickOsc.frequency.setValueAtTime(type === "down" ? 2200 : 1700, now);
      clickOsc.frequency.exponentialRampToValueAtTime(type === "down" ? 1200 : 900, now + 0.016);
      clickGain.gain.setValueAtTime(0.0001, now);
      clickGain.gain.exponentialRampToValueAtTime(type === "down" ? 0.2 : 0.13, now + 0.002);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
      clickOsc.connect(clickGain);
      clickGain.connect(context.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.03);

      const bodyOsc = context.createOscillator();
      const bodyGain = context.createGain();
      bodyOsc.type = "triangle";
      bodyOsc.frequency.setValueAtTime(type === "down" ? 170 : 145, now);
      bodyOsc.frequency.exponentialRampToValueAtTime(type === "down" ? 96 : 82, now + 0.05);
      bodyGain.gain.setValueAtTime(0.0001, now + 0.001);
      bodyGain.gain.exponentialRampToValueAtTime(type === "down" ? 0.24 : 0.16, now + 0.006);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      bodyOsc.connect(bodyGain);
      bodyGain.connect(context.destination);
      bodyOsc.start(now);
      bodyOsc.stop(now + 0.07);

      const noise = context.createBufferSource();
      const noiseFilter = context.createBiquadFilter();
      const noiseGain = context.createGain();
      noise.buffer = getNoiseBuffer(context);
      noise.playbackRate.value = Math.max(
        0.86,
        Math.min(1.18, type === "down" ? 1.02 + jitter : 0.95 + jitter * 0.7),
      );
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = type === "down" ? 1550 : 1250;
      noiseFilter.Q.value = 0.8;
      noiseGain.gain.setValueAtTime(0.0001, now);
      noiseGain.gain.exponentialRampToValueAtTime(type === "down" ? 0.16 : 0.1, now + 0.002);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(context.destination);
      noise.start(now);
      noise.stop(now + 0.05);
    },
    [getNoiseBuffer],
  );

  const playKeySound = useCallback(
    (type: "down" | "up") => {
      const context = getAudioContext();

      if (!context) {
        return;
      }

      playSyntheticKeychronSound(context, type);
    },
    [getAudioContext, playSyntheticKeychronSound],
  );

  useEffect(() => {
    return () => {
      pressedCodesRef.current = new Set();
      noiseBufferRef.current = null;
      if (audioContextRef.current) {
        void audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!supportedCodes.has(event.code)) {
        return;
      }

      if (pressedCodesRef.current.has(event.code)) {
        return;
      }

      setPressedCodes((prev) => {
        const next = new Set(prev);
        next.add(event.code);
        pressedCodesRef.current = next;
        return next;
      });

      playKeySound("down");
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!supportedCodes.has(event.code)) {
        return;
      }

      if (!pressedCodesRef.current.has(event.code)) {
        return;
      }

      setPressedCodes((prev) => {
        const next = new Set(prev);
        next.delete(event.code);
        pressedCodesRef.current = next;
        return next;
      });

      playKeySound("up");
    };

    const handleBlur = () => {
      const cleared = new Set<string>();
      pressedCodesRef.current = cleared;
      setPressedCodes(cleared);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [playKeySound, supportedCodes]);

  return (
    <div className="bg-neutral-600 border-2 border-neutral-900 p-3 rounded-[16px]">
      <div className="bg-neutral-800 border border-neutral-900 rounded-[5px] rounded-t-[8px] h-[278px]">
        <div className="-space-y-1 -translate-y-1 rounded-[5px] overflow-hidden">
          {rows.map((row, rowIndex) => (
            <div className="flex" key={`row-${rowIndex}`}>
              {row.map((key, keyIndex) => (
                <KeyboardKey
                  key={`key-${rowIndex}-${keyIndex}`}
                  width={key.width}
                  variant={key.variant}
                  content={key.content}
                  bindings={key.bindings}
                  pressed={Boolean(key.bindings?.some((code) => pressedCodes.has(code)))}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
