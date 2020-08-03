import React from 'react';
import { ListofCategories } from './components/ListOfCategories/index';
import { GlobalStyle } from './components/styles/GlobalStyles';
import { ListOfPhotoCards } from './components/ListOfPhotoCards/index';
import SvgComponent from './components/Logo/index';

// eslint-disable-next-line import/prefer-default-export
export const App = () => (
  <div>
    <GlobalStyle />
    <SvgComponent />
    <ListofCategories />
    <ListOfPhotoCards />
  </div>
);
