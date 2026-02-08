export interface SentimentAnalysisProps {
  value: "Positive" | "Negative" | "Neutral";
}

export const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({
  value,
}) => {
  const sentimentColor =
    {
      Positive: "bg-green-100 text-green-700",
      Negative: "bg-red-100 text-red-700",
      Neutral: "bg-gray-100 text-gray-700",
    }[value] || "bg-gray-100 text-gray-700";
  return (
    <span className={`${sentimentColor} rounded-md px-2 font-medium`}>
      {value}
    </span>
  );
};
