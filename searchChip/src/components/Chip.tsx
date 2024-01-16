import "./chip.css";

interface Props {
  data: {
    name: string;
    email: string;
  };
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
  inputValue?: string;
  hello?: string;
  setSelectedChips?: React.Dispatch<
    React.SetStateAction<{ name: string; email: string }[]>
  >;
  setFilteredChips?: React.Dispatch<
    React.SetStateAction<{ name: string; email: string }[]>
  >;
  selectedChips?: { name: string; email: string }[];
}
const Chip = ({
  data,
  setInputValue,
  inputValue,
  setSelectedChips,
  setFilteredChips,
  selectedChips,
}: Props) => {
  const handleInputChange = (name: string, email: string) => {
    console.log(name);
    console.log(inputValue, "inputValue before update");
    setInputValue?.(name);
    console.log(inputValue, "inputValue after update");
    console.log(selectedChips, "selectedChips");
    setSelectedChips?.((prevSelectedChips) => [
      ...prevSelectedChips,
      { name: data.name, email: data.email },
    ]);
    setFilteredChips?.((prevChips) =>
      prevChips.filter(
        (chip) =>
          chip.email !== email &&
          !selectedChips?.some(
            (selectedChip) => selectedChip.email === chip.email
          )
      )
    );
    setInputValue?.(" ");
  };
  return (
    <div
      className="chip"
      onClick={() => handleInputChange(data.name, data.email)}
    >
      <div className="logo">{data.name[0] + data.name.split(" ")[1][0]}</div>
      <p className="name">{data.name}</p>
      <p className="email">{data.email}</p>
    </div>
  );
};

export default Chip;
