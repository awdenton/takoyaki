import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { GameBoard } from './components';

ReactDOM.render(
  <React.StrictMode>
    <GameBoard />
  </React.StrictMode>,
  document.getElementById('root')
);