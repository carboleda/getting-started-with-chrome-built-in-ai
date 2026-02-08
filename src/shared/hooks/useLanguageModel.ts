import { useCallback, useEffect, useRef } from "react";

interface UseLanguageModelProps {
  // systemPrompt: string;
}

interface UseLanguageModel {
  prompt: (text: string, options?: PromptOptions) => Promise<string | null>;
}

export const useLanguageModel =
  ({}: UseLanguageModelProps = {}): UseLanguageModel => {
    const session = useRef<typeof LanguageModel | null>(null);

    const getSession = useCallback(async () => {
      if (typeof LanguageModel === "undefined") {
        return null;
      }

      if (session.current) {
        return session.current;
      }

      const availability = await LanguageModel.availability();
      if (availability === "no") {
        console.warn("Language Model is not available.");
        return null;
      }

      session.current = await LanguageModel.create({
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            console.log(`Downloaded ${e.loaded * 100}%`);
          });
        },
      });

      return session.current;
    }, []);

    const prompt = useCallback(
      async (text: string, options?: PromptOptions) => {
        const sessionInstance = await getSession();
        if (!sessionInstance) {
          return null;
        }

        const response = await sessionInstance.prompt(text, options);

        return response;
      },
      [getSession],
    );

    useEffect(() => {
      return () => {
        if (session.current) {
          session.current.destroy();
          session.current = null;
        }
      };
    }, []);

    return { prompt };
  };
