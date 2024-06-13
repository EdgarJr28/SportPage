
const InputWithLabel = ({ label, onChange, name, type, className, autoComplete, value }) => {
    return <div className={`${className} border border-rounded bg-transparent flex flex-col rounded-lg p-2 font-medium`}>
        <label htmlFor={name} className="text-white text-xs">{label}</label>
        <input
            autoComplete={autoComplete}
            id={name}
            itemID={name}
            value={`${value}`}
            name={`${name}`}
            className="focus-within:outline-none text-sm text-white bg-transparent decoration-none"
            type={type ?? "text"}
            onChange={onChange}
        />
    </div>
}

export default InputWithLabel