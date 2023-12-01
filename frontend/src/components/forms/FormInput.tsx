import { HTMLInputTypeAttribute, useState, useEffect, ChangeEventHandler } from 'react';

type FormInputType = {
  title: string;
  name: string;
  type: HTMLInputTypeAttribute;
  classLabel?: string;
  classInput?: string;
  placeholder: string;
  errors: string[];
  value: string;
  onChange: ChangeEventHandler; // eslint-disable-line no-unused-vars
};

const FormInput = ({ title, name, type, classLabel, classInput, placeholder, errors, value, onChange }: FormInputType) => {
  const [errorsList, setErrorsList] = useState<string[]>([]);

  useEffect(() => {
    setErrorsList([...errors]);
  }, [errors]);

  return (
    <div>
      <label className={`relative w-full block border-2 border-gray-400 rounded-lg p-3 ${classLabel}
        focus-within:border-blue-400 focus-within:shadow-md
      `}>
        <span className="font-bold text-sm absolute -top-3 px-1 bg-white">{title}</span>
        <input
          type={type || 'text'}
          name={name}
          className={`text-xs block w-full p-1 outline-none ${classInput}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </label>

      {errorsList.length > 0 && errorsList.map((error) => (
        <small key={error} className="block text-xs text-red-500 px-2">{error}</small>
      ))
      }
    </div>
  );
};

export default FormInput;
