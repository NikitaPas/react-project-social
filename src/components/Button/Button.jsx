const Button = (props) => {
    const {
        children,
        isDisabled = false,
    } = props
    return (
        <button disabled={isDisabled} className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed'>
            {children}
        </button>
    )
}

export default Button