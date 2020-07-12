import React from 'react';
import { storiesOf } from '@storybook/react';

import 'bootstrap/scss/bootstrap.scss';
import 'antd/dist/antd.css';
import '../App.scss';

import BookList from '../components/BookList';

storiesOf ('BookList', module)
  .add(
    'default',
    () => (
      <BookList item = {
        {coverUrl: "https://res.cloudinary.com/tutq8118/image/upload/v1592759991/hello-express/cover/esh9estd8mbmqo52upk5.jpg",
        title: "The Godfather",
        desc: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son"}
      } />
    )
  )