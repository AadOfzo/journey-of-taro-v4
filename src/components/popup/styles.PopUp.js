import React, { useState } from 'react';
import styled from 'styled-components';
import LoginPopup from './LoginPopup';

const PopupButton = styled.button`
  background-color: #eaa733;
  color: black;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const PopupContainer = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const PopupContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #eaa733;
  color: black;
  padding: 20px;
  border-radius: 10px;
`;
