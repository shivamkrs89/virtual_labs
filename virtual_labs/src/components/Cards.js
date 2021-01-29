import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these Amazing Fields to Experiment and learn!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/EC.jpg'
              text='Utilization of science and mathematics applied to practical problems in the field of communications'
              label='Electronics & Communications'
              path='/EC'
            />
            <CardItem
              src='images/Computer-Science-Engineering.jpeg'
              text='The study of automating algorithmic processes that scale'
              label='Computer Science & Affliated Fields'
              path='/CS'
            />
            <CardItem
              src='images/electrical-engineer.jpg'
              text='Deals with the study and application of electricity, electronics, and electromagnetism.'
              label='Electrical Engineering'
              path='/EE'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/ME.jpg'
              text='The study of design, analysis, manufacturing and maintenance of mechanical systems'
              label='Mechanical Engineering'
              path='/ME'
            />
            <CardItem
              src='images/chem-lab.jpg'
              text='The study to produce, transform, transport, and properly use chemicals, materials and energy'
              label='Chemical Engineering'
              path='/Chemical'
            />
            <CardItem
              src='images/BiomedicalEngineer.jpg'
              text='The study of technological application that uses biological systems to process for specific use'
              label='Biotechnology and Biomedical Engineering'              
              path='/BT'
            />
            </ul>
            <ul className='cards__items'>
            <CardItem
              src='images/CE.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Civil Engineering'
              path='/Civil'
            />
            <CardItem
              src='images/Instrumentation-Engineering.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Instrumentation'
              path='/Inst'
            />
            <CardItem
              src='images/other.jpg'
              text='Experience Football on Top of the Himilayan Mountains'
              label='Others'              
              path='/Others'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;