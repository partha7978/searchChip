import { useEffect } from "react";
import Chip from "./Chip";
import "./chipContainer.css";
import { ChipProps } from "../App";

const ChipContainer = ({
  chips,
  setInputValue,
  inputValue,
  setSelectedChips,
  setFilteredChips,
  selectedChips,
}: ChipProps) => {
  useEffect(() => {
    const container = document.querySelector(".chip__container") as HTMLElement;
    console.log(chips);
    if (chips.length > 0) {
      console.log(true);
      container.style.display = "block";
    }
  }, [chips]);

  return (
    <div className="chip__container">
      {chips.map((chip) => (
        <Chip
          key={chip.email}
          data={chip}
          setInputValue={setInputValue}
          inputValue={inputValue}
          setSelectedChips={setSelectedChips}
          setFilteredChips={setFilteredChips}
          selectedChips={selectedChips}
        />
      ))}
    </div>
  );
};

export default ChipContainer;
