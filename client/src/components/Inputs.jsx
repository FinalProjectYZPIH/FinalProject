export const Inputs = ({ type, label, ph, onChangeFn, value }) => {
    return (
        <div className='my-4'>
            <label htmlFor={label} className="text-sm text-white">{label}</label>
            <input
                className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600"
                type={type}
                placeholder={ph}
                id={label}
                name={label}
                onChange={onChangeFn}
                value={value}
            />
        </div>
    );
};