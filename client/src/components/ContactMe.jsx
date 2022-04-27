import React from 'react'
import { useState,useEffect } from 'react';
import useStore from '../store/store';

export default function ContactMe() {
        const {loginStatus,accessToken} = useStore();
  return (
      <div>
          ContactMe
          <div>loginstatus : {loginStatus ? loginStatus : 'nono' }</div>
          <div>accessToken : {accessToken ? accessToken : 'nono' }</div>
      </div>
      
  )
}
