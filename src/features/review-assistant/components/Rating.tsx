import { FaStar } from "react-icons/fa";

interface RatingProps {
  value: number;
}

export const Rating: React.FC<RatingProps> = ({ value }) => {
  return (
    <div className="py-4 flex flex-row gap-2">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          size={24}
          color={index < value ? "#ffc107" : "#e4e5e9"}
          className="cursor-pointer"
        />
      ))}
    </div>
  );
};
