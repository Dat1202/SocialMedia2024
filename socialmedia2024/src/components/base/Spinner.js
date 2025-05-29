import React from 'react'

const Spinner = () => {
    return (
        <>        
            <div className="w-12 h-12 border-2 border-red-50 
                border-b-orange-600 rounded-full inline-block animate-spin m-2"></div>
        </>
        )
}
export default React.memo(Spinner);