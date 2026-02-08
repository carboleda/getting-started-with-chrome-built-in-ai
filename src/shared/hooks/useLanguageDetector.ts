import { useCallback, useEffect, useRef } from "react";

interface UseLanguageDetector {
  detectLanguage: (text: string) => Promise<string | null>;
}

export const useLanguageDetector = (): UseLanguageDetector => {
  const detector = useRef<typeof LanguageDetector | null>(null);

  const getDetector = useCallback(async () => {
    if (typeof LanguageDetector === "undefined") {
      return null;
    }

    if (detector.current) {
      return detector.current;
    }

    const availability = await LanguageDetector.availability();
    if (availability === "no") {
      console.warn("Language Detector is not available.");
      return null;
    }

    detector.current = await LanguageDetector.create({
      monitor(m: any) {
        m.addEventListener("downloadprogress", (e: any) => {
          console.log(`Downloaded ${e.loaded * 100}%`);
        });
      },
    });

    return detector.current;
  }, []);

  const detectLanguage = useCallback(
    async (text: string) => {
      const det = await getDetector();
      if (!det) {
        return null;
      }

      const results = await det.detect(text);
      return results.at(0)?.detectedLanguage ?? null;
    },
    [getDetector],
  );

  useEffect(() => {
    return () => {
      if (detector.current) {
        detector.current.destroy();
        detector.current = null;
      }
    };
  }, []);

  return { detectLanguage };
};
