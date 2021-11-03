import React from 'react'
import './CollectionItem.css'

const CollectionItem = (props) => {
    return(
        <div className='collection-item'>
            <img className="photu" src={props.imag} alt={props.alt} onClick={props.clicked} />
        </div>    
    )
}

export default CollectionItem

