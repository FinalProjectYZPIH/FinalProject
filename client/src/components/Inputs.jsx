export const Inputs = ({ type, label, ph, onChangeFn, value }) => {
    return (
        <div className='my-4'>
            <label htmlFor={label} className="text-sm text-cyan-600 px-2 py-2.3">{label}</label>
            <input
                className="bg-blue-950 bg-opacity-5  block w-72 py-2.3 px-10 pb-2 mb-7 text-lg text-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 border-b-2 rounded-lg border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:bg-sky-600 focus:bg-opacity-25 focus:border-blue-600 hover:border-b-cyan-400"
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