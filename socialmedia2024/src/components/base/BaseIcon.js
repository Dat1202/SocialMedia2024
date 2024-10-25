import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const BaseIcon = ({ icon, background }) => {
    return (
        <>
            <div style={{ background: background }} className="px-4 py-3 rounded-full hover:bg-[--hover-color] transition ease-in-out">
                <FontAwesomeIcon icon={icon} />
            </div>
        </>
    )
}

export default BaseIcon;