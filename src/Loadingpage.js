import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

function Loadingpage() {
  return (
    <div className='loader '>
       <header>
          <p> 
            <FontAwesomeIcon icon={faHandHoldingDollar} beat />
          </p>
          <h1>
           <p> Money<b>Verse</b></p>
        <div className='bar'></div>
          </h1>
        </header>
    </div>
  )
}

export default Loadingpage ;
