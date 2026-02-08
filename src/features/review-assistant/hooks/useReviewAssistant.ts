import { useCallback, useReducer } from "react";
import { useLanguageDetector } from "../../../shared/hooks/useLanguageDetector";
import { useLanguageModel } from "../../../shared/hooks/useLanguageModel";

enum ActionType {
  SET_STATE = "SET_STATE",
  SET_ANALYZING = "SET_ANALYZING",
}

interface ReviewAssistantState {
  analyzing: boolean;
  lang: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  rating: number;
}

interface Action extends Partial<ReviewAssistantState> {
  type: ActionType;
}

function reducer(
  state: ReviewAssistantState,
  action: Action,
): ReviewAssistantState {
  switch (action.type) {
    case ActionType.SET_STATE:
      return {
        ...state,
        lang: action.lang ?? state.lang,
        sentiment: action.sentiment ?? state.sentiment,
        rating: action.rating ?? state.rating,
      };
    case ActionType.SET_ANALYZING:
      return { ...state, analyzing: action.analyzing! };
    default:
      return state;
  }
}

export const useReviewAssistant = () => {
  const { detectLanguage } = useLanguageDetector();
  const { prompt } = useLanguageModel();
  const [state, dispatch] = useReducer(reducer, {
    analyzing: false,
    lang: "en",
    sentiment: "Neutral",
    rating: 0,
  });

  const evaluateReviewSentimentAndRating = useCallback(
    async (text: string) => {
      const sentiment = await prompt(
        `Analyze the sentiment of this review and respond with only the sentiment and calculate the rating: ${text}
        
        Example:
        Review: "I love this product! It works great and exceeded my expectations."
        Sentiment: "Positive"
        Rating: 5
        
        Review: "This is the worst purchase I've ever made. It broke after one use."
        Sentiment: "Negative"
        Rating: 1
        
        Review: "No me gustó el producto, llegó roto y el servicio al cliente fue muy lento."
        Sentiment: "Negative"
        Rating: 2
        
        Review: "The product is okay, not bad but not great either."
        Sentiment: "Neutral"
        Rating: 3`,
        {
          responseConstraint: {
            type: "object",
            properties: {
              sentiment: {
                type: "string",
                enum: ["Positive", "Negative", "Neutral"],
              },
              rating: {
                type: "number",
                minimum: 1,
                maximum: 5,
              },
            },
            required: ["sentiment", "rating"],
            additionalProperties: false,
          },
        },
      );

      const data = JSON.parse(sentiment || "{}");

      return data;
    },
    [prompt],
  );

  const analyzeReview = useCallback(
    async (text: string) => {
      dispatch({ type: ActionType.SET_ANALYZING, analyzing: true });
      try {
        const [lang, analysis] = await Promise.all([
          detectLanguage(text),
          evaluateReviewSentimentAndRating(text),
        ]);

        dispatch({
          type: ActionType.SET_STATE,
          lang: lang || "en",
          sentiment: analysis.sentiment,
          rating: analysis.rating,
        });
      } finally {
        dispatch({ type: ActionType.SET_ANALYZING, analyzing: false });
      }
    },
    [detectLanguage, evaluateReviewSentimentAndRating],
  );

  return { state, analyzeReview };
};
