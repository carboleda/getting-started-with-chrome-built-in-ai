import React, { useEffect, useState } from "react";
import { FaBrain } from "react-icons/fa";

interface TextAreaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange" | "value"
> {
  value: string;
  lang: string;
  analyzing: boolean;
  onChange: (newValue: string) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  analyzing,
  lang,
  onChange,
}) => {
  const [text, setText] = useState(value);

  const handleChange = (newValue: string) => {
    setText(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <div className="relative">
      <textarea
        id="textarea"
        className="w-full h-32 p-2 rounded-md bg-white dark:bg-zinc-800"
        lang={lang}
        placeholder="Enter your text here..."
        cols={50}
        rows={4}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="absolute bottom-1 right-2 py-2 flex gap-2">
        <span
          className={`text-sm font-bold text-white-500 ${analyzing ? "animate-pulse" : ""}`}
        >
          {analyzing && <FaBrain className="inline mr-1 text-blue-500" />}
        </span>
        <span className="text-sm font-bold bg-red-900 px-1 rounded-md text-white-500">
          {lang.toUpperCase()}
        </span>
      </div>
    </div>
  );
};
