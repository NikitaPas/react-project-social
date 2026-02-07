const InputField = (props) => {
    const {
        children,
        type,
        value,
        onInput,
        placeholder,
        ref,
        isInvalid = false,
    } = props

    const inputStyles = `
        rounded-lg bg-gray-700 mt-2 p-2 
        focus:bg-gray-800 focus:outline-none border-2 transition-colors
        ${isInvalid ? 'border-red-500' : 'border-transparent focus:border-blue-500'}
    `;

    return (
        <div className='flex flex-col text-gray-400 py-2'>
            <label>{children}</label>
            <input ref={ref} placeholder={placeholder} value={value} onInput={onInput} className={inputStyles} type={type} />
        </div>
    )
}

export default InputField