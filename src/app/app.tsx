import React, { useState } from 'react';
import * as styles from './app.module.css';
import { log } from './service';
const image = require('../assets/images/into-code.png');

export default function App() {
  const [state, setState] = useState(true);

  function clickHandler() {
    setState(!state);
  }

  return (
    <div className={styles.wrapper}>
      <main className={styles.content}>
        <h1 className={styles.title}>Hi, team!</h1>
        <p className={styles.text}>{log()}</p>
        <button onClick={clickHandler}>Click on me!</button>
        <div>{state ? <img className={styles.img} src={image} alt="basket" /> : ''}</div>
      </main>
    </div>
  );
}
