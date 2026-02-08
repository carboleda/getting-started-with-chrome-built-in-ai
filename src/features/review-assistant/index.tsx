import { useState } from "react";
import { QuickReviews } from "./components/QuickReviews";
import { Rating } from "./components/Rating";
import { SentimentAnalysis } from "./components/Sentiment";
import { TextArea } from "./components/TextArea";
import { useReviewAssistant } from "./hooks/useReviewAssistant";

export const ReviewAssistant: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<string>("");
  const { state, analyzeReview } = useReviewAssistant();

  const handleQuickReviewSelect = (text: string) => {
    setSelectedReview(text);
    analyzeReview(text);
  };

  return (
    <div className={"p-4 border rounded shadow"}>
      <TextArea
        value={selectedReview}
        onChange={() => {}}
        analyzing={state.analyzing}
        lang={state.lang}
      />
      <QuickReviews onSelect={handleQuickReviewSelect} />
      <div className="flex items-center justify-end gap-2">
        <SentimentAnalysis value={state.sentiment} />
        <Rating value={state.rating} />
      </div>
    </div>
  );
};
