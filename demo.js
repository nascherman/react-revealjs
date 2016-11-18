require('babel-polyfill');


import React from 'react';
import ReactDOM from 'react-dom';
import ReactReveal from './dist/index.js';
import { sections } from './presentation.json';

const revealConfig = {
    width: 1000,
    height: 800,
    margin: 0.1,
    controls: true,
    progress: true,
    slideNumber: true,
    history: true,
    keyboard: true,
    overview: true,
    center: true,
    touch: true,
    loop: false,
    rtl: false,
    shuffle: false,
    fragments: true,
    embedded: false,
    help: true,
    showNotes: false,
    autoSlide: 1,
    autoSlideStoppable: true,
    mouseWheel: false,
    hideAddressBar: true,
    previewLinks: false, 
    transition: 'default',
    transitionSpeed: 'default',
    backgroundTransition: 'default',
    viewDistance: 10, 
    parallaxBackgroundImage: '', 
    parallaxBackgroundSize: '',
    parallaxBackgroundHorizontal: null,
    parallaxBackgroundVertical: null
}

const app = document.querySelector('#app');

function start () {
  ReactDOM.render(
    <ReactReveal
      sections={sections}
      reveal={revealConfig}
    />,
    app
  );
};

start();