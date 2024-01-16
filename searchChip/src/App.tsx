import "./App.css";
import ChipContainer from "./components/ChipContainer";
import { useState, useEffect } from "react";
// import Chip from "./components/chip";

interface Chip {
  name: string;
  email: string;
}

export interface ChipProps {
  chips: {
    name: string;
    email: string;
  }[];
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
  inputValue?: string;
  setSelectedChips?: React.Dispatch<
    React.SetStateAction<{ name: string; email: string }[]>
  >;
  setFilteredChips?: React.Dispatch<
    React.SetStateAction<{ name: string; email: string }[]>
  >;
  selectedChips?: { name: string; email: string }[];
}

function App() {
  const [chipData, setChipData] = useState<Chip[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredChips, setFilteredChips] = useState<Chip[]>([]);
  const [selectedChips, setSelectedChips] = useState<Chip[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/src/components/data.json");
        const data = await response.json();
        setChipData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const filtered = chipData.filter((chip) =>
      chip.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredChips(filtered);
  };

  const handleOnClose = (chip?: Chip) => {
    if (chip) {
      setSelectedChips(
        selectedChips.filter(
          (selectedChip) => selectedChip.email !== chip.email
        )
      );
      setFilteredChips([chip, ...filteredChips]);
    }
  };

  return (
    <>
      <div className="main__container">
        <div className="input__container">
          <div className="input-chip__container">
            {selectedChips.map((chip) => (
              <div className="chip" key={chip.email}>
                <div className="logo">{chip.name[0]}</div>
                <p className="name">{chip.name}</p>
                <div
                  className="close"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOnClose(chip);
                  }}
                >
                  ❌
                </div>
              </div>
            ))}
          </div>
          <input
          className="input__field"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search by name"
          />
        </div>
        <ChipContainer
          chips={filteredChips}
          setInputValue={setInputValue}
          inputValue={inputValue}
          selectedChips={selectedChips}
          setSelectedChips={setSelectedChips}
          setFilteredChips={setFilteredChips}
        />
      </div>
    </>
  );
}

export default App;
