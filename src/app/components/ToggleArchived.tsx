import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface ToggleArchivedProps {
  onToggleCheck: (selection: boolean) => void;
}

const ToggleArchived: React.FC<ToggleArchivedProps> = ({ onToggleCheck }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleCheck = (check: boolean) => {
    setChecked(!checked);
    onToggleCheck(check);
  };
  return (
    <div>
      <Switch
        name="check-archive"
        checked={checked}
        onCheckedChange={(check: boolean) => handleCheck(check)}
        className="cursor-pointer"
      />{" "}
      Show Archived
    </div>
  );
};

export default ToggleArchived;
