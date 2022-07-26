import React, { useState, useEffect } from 'react'
import './app.css';
import DividerDesktop from './components/DividerDesktop';
import DividerMobile from './components/DividerMobile';
import Dice from './components/Dice';
import axios from 'axios';

const App = () => {

  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [isActive, setActive] = useState(false);
  const [adviceObject, setAdvice] = useState({
    id: 1,
    advice: "It is easy to sit up and take notice, what's difficult is getting up and taking action."
  });

  useEffect(() => {
    window.addEventListener('resize', () => { setPageWidth(window.innerWidth) });
    return () => window.removeEventListener('resize', () => { setPageWidth(window.innerWidth) });
  }, [])

  const getAdvice = () => {
    axios.get('https://api.adviceslip.com/advice').then(({ data }) => {
      const { slip = {} } = data;
      setAdvice({ id: slip.id, advice: slip.advice });
    })
  }

  const onMouseDown = () => {
    setActive(true);
  };

  const onMouseUp = () => {
    getAdvice();
    setActive(false);
  };

  return <div className="advice-app">
    <div className="parent container d-flex justify-content-center align-items-center h-100">
      <div className="card">
        <div className="card-body">
          <p className="card-title">ADVICE #{adviceObject.id}</p>
          <p className="card-text">"{adviceObject.advice}"</p>
          <div className="divider">
            {pageWidth > 560 ? <DividerDesktop /> : <DividerMobile />}
          </div>
          <div className={`dice-container ${isActive ? 'dice-active' : ''}`} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
            <div className="dice">
              <Dice />
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
}

export default App;
