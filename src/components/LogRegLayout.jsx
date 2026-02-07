const LogRegLayout = (props) =>{
    const {
        children, 
        imageSrc ="src/assets/login.jpg",
    } = props
    
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={imageSrc} alt="Authentication" />
            </div>
            {children}
        </div>
    )
}

export default LogRegLayout