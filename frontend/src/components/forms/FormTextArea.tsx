import { useState, useEffect, ChangeEventHandler } from 'react';

type FormTextAreaType = {
  title: string;
  name: string;
  classLabel?: string;
  classTextarea?: string;
  placeholder: string;
  errors: string[];
  value?: string;
  onChange: ChangeEventHandler;
};

const FormTextArea = ({ title, name, classLabel = '', classTextarea = '', placeholder, errors, value, onChange }: FormTextAreaType) => {
  const [errorsList, setErrorsList] = useState<string[]>([]);

  useEffect(() => {
    setErrorsList([...errors]);
  }, [errors]);

  return (
    <div className="w-full flex flex-col">
      <label className={`relative w-full block border-2 border-gray-400 rounded-lg p-3 ${classLabel}
        focus-within:border-blue-400 focus-within:shadow-md
      `}>
        <span className="font-bold text-sm absolute -top-3 px-1 bg-white">{title}</span>

        <textarea
          name={name}
          className={`text-xs block w-full p-1 outline-none resize-none ${classTextarea}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></textarea>
      </label>

      {errorsList.length > 0 && errorsList.map((error) => (
        <small key={error} className="block text-xs text-red-500 px-2">{error}</small>
      ))
      }
    </div>
  );
};

export default FormTextArea;
