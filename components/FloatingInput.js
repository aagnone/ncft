import React from 'react';

const FloatingInput = ({type, name, value, onchange}) => {
    return (
        <div className="relative border-b-2 focus-within:border-main">
        <input
          type={type}
          name={name}
          placeholder=" "
          className="block w-full appearance-none focus:outline-none bg-transparent"
          value={value}
          onChange={onchange}
          id={name}
        />
        <label htmlFor={name} className="absolute top-0 -z-1 duration-300 origin-0">
          {name}
        </label>
      </div>
    );
};

export default FloatingInput;