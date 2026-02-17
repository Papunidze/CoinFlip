import { useState, useCallback, useEffect, useRef } from "react";
import type { CoinSide, AnimPhase } from "@shared/types";

interface UseCoinFlipReturn {
  phase: AnimPhase;
  result: CoinSide | null;
  hasWon: boolean | null;
  flip: (choice: CoinSide) => void;
}

const SPIN_DURATION = 1800;
const RESULT_DISPLAY = 2200;

export function useCoinFlip(): UseCoinFlipReturn {
  const [phase, setPhase] = useState<AnimPhase>("idle");
  const [result, setResult] = useState<CoinSide | null>(null);
  const [hasWon, setHasWon] = useState<boolean | null>(null);
  const timeouts = useRef<number[]>([]);

  const clearTimeouts = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  }, []);

  const flip = useCallback(
    (choice: CoinSide) => {
      if (phase !== "idle") return;

      clearTimeouts();

      const finalSide: CoinSide = Math.random() < 0.5 ? "heads" : "tails";

      setResult(finalSide);
      setHasWon(null);
      setPhase("spinning");

      const t1 = window.setTimeout(() => {
        setPhase("result");
        setHasWon(choice === finalSide);

        const t2 = window.setTimeout(() => {
          setPhase("idle");
        }, RESULT_DISPLAY);

        timeouts.current.push(t2);
      }, SPIN_DURATION);

      timeouts.current.push(t1);
    },
    [phase, clearTimeouts]
  );

  useEffect(() => clearTimeouts, [clearTimeouts]);

  return { phase, result, hasWon, flip };
}
