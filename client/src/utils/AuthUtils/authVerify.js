import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const isTokenExpired = () => {
  const token = Cookies.get('token');
  if (token) {
    const decodedJwt = parseJwt(token);
    if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
      return true;
    }
  }
  return false;
};
