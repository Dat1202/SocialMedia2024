import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const BaseIcon = ({ icon, background }) => {
    return (
        <>
            <div style={{ background: background }} className="rounded-full px-4 py-3">
                <FontAwesomeIcon icon={icon} />
            </div>
        </>
    )
}

export default BaseIcon;