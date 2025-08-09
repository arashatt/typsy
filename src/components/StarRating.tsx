import { motion } from "framer-motion";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
const MotionStar = motion(FaStar);

const Star = ({
  selected = false,
  onSelect = () => {},
}: {
  selected?: boolean;
  onSelect?: () => void;
}) => (
  <MotionStar
    whileHover={{ scale: 1.3 }}
    color={selected ? "red" : "gray"}
    onClick={onSelect}
  />
);

const createArray = (length: number): undefined[] => {
  return [...Array(length)];
};

function StarRating({ totalStars = 5 }) {
  const [selectedStars, setSelectedStars] = useState(3);
  return (
    <>
      <div style={{ display: "flex", gap: "4px" }}>
        {createArray(totalStars).map((_, i) => (
          <Star
            key={i}
            selected={i < selectedStars}
            onSelect={() => setSelectedStars(i + 1)}
          />
        ))}
      </div>
      <p>
        {" "}
        {selectedStars > totalStars ? totalStars : selectedStars} of{" "}
        {totalStars} {totalStars > 1 ? "Stars" : "Star"} was selected.
      </p>
    </>
  );
}

export default StarRating;
