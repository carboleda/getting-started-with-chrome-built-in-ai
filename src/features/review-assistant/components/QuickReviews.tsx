const quickReviews = [
  {
    sentiment: "Positive",
    text: "I absolutely love this product! It has changed my life for the better.",
  },
  {
    sentiment: "Negative",
    text: "This is the worst experience I've ever had. I'm very disappointed.",
  },
  {
    sentiment: "Neutral",
    text: "The product is okay, it works as expected but nothing extraordinary.",
  },
  {
    sentiment: "Positive",
    text: "Fue una experiencia maravillosa, superó todas mis expectativas.",
  },
  {
    sentiment: "Negative",
    text: "No me gustó el servicio, fue muy lento y poco profesional.",
  },
  {
    sentiment: "Neutral",
    text: "El producto está bien, cumple su función pero no destaca en nada especial.",
  },
  {
    sentiment: "Positive",
    text: "C'était une expérience merveilleuse, elle a dépassé toutes mes attentes.",
  },
  {
    sentiment: "Negative",
    text: "Je n'ai pas aimé le service, c'était très lent et peu professionnel.",
  },
  {
    sentiment: "Neutral",
    text: "Le produit est bien, il remplit sa fonction mais ne se distingue en rien de spécial.",
  },
];

interface QuickReviewProps {
  sentiment: string;
  text: string;
  onClick: () => void;
}

interface QuickReviewsProps {
  onSelect: (text: string) => void;
}

export const QuickReview: React.FC<QuickReviewProps> = ({
  text,
  sentiment,
  onClick,
}) => {
  return (
    <button
      className="w-fit text-left rounded p-1 bg-gray-100 hover:bg-gray-300 transition"
      onClick={onClick}
    >
      <span className="text-sm text-gray-600">
        {text}
        <span
          className="inline-block w-2 h-2 rounded-full ml-2"
          style={{
            backgroundColor:
              sentiment === "Positive"
                ? "#22c55e"
                : sentiment === "Negative"
                  ? "#ef4444"
                  : "#a3a3a3",
          }}
        />
      </span>
    </button>
  );
};

export const QuickReviews: React.FC<QuickReviewsProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {quickReviews.map((review, index) => (
        <QuickReview
          key={index}
          sentiment={review.sentiment}
          text={review.text}
          onClick={() => onSelect(review.text)}
        />
      ))}
    </div>
  );
};
