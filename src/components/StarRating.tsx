import { FaStar } from "react-icons/fa";

const Star = ({
  selected = false,
  onSelect = () => {},
}: {
  selected?: boolean;
  onSelect?: () => void;
}) => <FaStar color={selected ? "red" : "gray"} onClick={onSelect} />;

const createArray = (length: number): undefined[] => [...Array(length)];

interface StarRatingProps {
  totalStars?: number;
  selectedStars?: number;
  onChange?: (newRating: number) => void;
}

function StarRating({
  totalStars = 5,
  selectedStars = 0,
  onChange = () => {},
}: StarRatingProps) {
  return (
    <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
      {createArray(totalStars).map((_, i) => (
        <Star
          key={i}
          selected={i < selectedStars}
          onSelect={() => onChange(i + 1)}
        />
      ))}

      <p className="text-sm text-gray-600 mt-1">
        {selectedStars} of {totalStars} {totalStars > 1 ? "Stars" : "Star"}{" "}
        selected
      </p>
    </div>
  );
}

export default StarRating;
