import React from "react";

interface props {
  placeholder: string;
  type: string;
  [x: string]: any;
}

const TextInput: React.FC<props> = ({ placeholder, type, ...otherprops }) => {
  return <input type={type} placeholder={placeholder} {...otherprops} />;
};

export default TextInput;
