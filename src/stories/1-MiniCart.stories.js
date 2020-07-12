import React from 'react';
import { storiesOf } from '@storybook/react';

import 'bootstrap/scss/bootstrap.scss';
import 'antd/dist/antd.css';
import '../App.scss';

import MiniCart from '../components/MiniCart';

storiesOf ('MiniCart', module)
  .add(
    'default',
    () => (
      <MiniCart />
    )
  )
