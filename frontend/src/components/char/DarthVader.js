import React from 'react';
import TextLoop from 'react-text-loop';
import DarthImg from '../../assets/img/darth-vader-small.png';

const DarthVader = (props) => (
  <div>
    <div className="quotes vader">
      <TextLoop speed={5000} springConfig={{ stiffness: 180, damping: 8 }}>
        <p>COME TO THE LATE SIDE { props.name }!</p>
        <p style={{fontStyle: 'bold'}}>YOU SPEAK TOOOO MUCH!!!</p>
      </TextLoop>
    </div>
    <div>
      <img src={DarthImg} alt='DarthVaderImg'/>
    </div>
  </div>
)

export default DarthVader;
