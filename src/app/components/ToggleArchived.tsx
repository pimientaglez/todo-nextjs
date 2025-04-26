import React, { useState } from "react";

interface ToggleArchivedProps {
  onToggleCheck: (selection: boolean) => void;
}

const ToggleArchived: React.FC<ToggleArchivedProps> = ({ onToggleCheck }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    onToggleCheck(e.target.checked);
  };
  return (
    <div>
      <input
        type="checkbox"
        name="checkbox"
        checked={checked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheck(e)}
      />{" "}
      Show Archived
    </div>
  );
};

export default ToggleArchived;
