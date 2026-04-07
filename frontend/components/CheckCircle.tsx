import { useState } from "react";

function CheckCircle() {
  const [checked, setChecked] = useState(false);

  return (
    <div
      onClick={() => setChecked((prev) => !prev)}
      className={`size-[28px] rounded-full flex items-center justify-center shrink-0 cursor-pointer ${
        checked ? "bg-blue-500" : "bg-gray-200"
      }`}
    />
  );
}

export default CheckCircle;