import React from 'react';
import ChatContainer from '../ui/pages/chatContainer';

export const chatRouterList = [
  {
    path: '/chat',
    component: ChatContainer,
    isProtected:true,
  },
  /*{
    path: '/example/:screenState',
    component: ExampleContainer,
    isProtected:true,
  },
  {
    path: '/example',
    component: ExampleContainer,
    isProtected:true,
  },*/
];
