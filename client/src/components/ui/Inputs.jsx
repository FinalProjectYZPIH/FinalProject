import { useColorStore } from "../../context/data/dataStore";
import { useState } from "react";

export const Inputs = ({ type, label, ph, onChangeFn, value, onKeyPress }) => {
    return (
        <div >
            <label htmlFor={label} className="text-sm px-2 py-2.3">{label}</label>
            <input
                className="bg-blue-950 bg-opacity-5 block w-full px-10 py-1 text-lg text-cyan-400 focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 border-b-2 rounded-lg border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:text-white focus:bg-sky-600 focus:bg-opacity-25 focus:border-blue-600 hover:border-b-cyan-400"
                type={type}
                placeholder={ph}
                id={label}
                name={label}
                onChange={onChangeFn}
                value={value}
                onKeyPress={onKeyPress}
            />
        </div>
    );
};




export const ColorInputs = ({ type, label, ph, onChangeFn, onKeyPress }) => {
    const { color } = useColorStore();
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (onChangeFn) {
            onChangeFn(e); // Pass the event to the provided onChange function if needed
        }
    };

    return (
        <div className={`ml-5`} >
            <label htmlFor={label} className="text-sm">{label}</label>
            <input
                className={`${color} h-40 bg-transparent rounded-lg w-full `}
                type={type}
                placeholder={ph}
                id={label}
                name={label}
                onChange={handleInputChange}
                value={inputValue}
                onKeyPress={onKeyPress}
            />
        </div>
    );
};

// export const ColorInputs = ({ type, label, ph, onChangeFn, value, onKeyPress }) => {
//     const { colorPosition, setColorPosition, setSpecificColor, color } =
//     useColorStore();
//     return (
//         <div className={`ml-5`} >
//             <label htmlFor={label} className="text-sm ">{label}</label>
//             <input
//                 className={`${color} h-40 bg-transparent rounded-lg`}
//                 type={type}
//                 placeholder={ph}
//                 id={label}
//                 name={label}
//                 onChange={onChangeFn}
//                 value={value}
//                  onKeyPress={onKeyPress}
//             />
//         </div>
//     );
// };
