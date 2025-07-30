import styled from 'styled-components';
import { Button } from '@mui/material';

const commonTransition = `
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); /* Smooth, professional animation curve */
`;

const commonHoverEffect = `
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.12), 0px 4px 8px rgba(0, 0, 0, 0.06); /* Enhanced, more premium shadow */
  transform: translateY(-4px); /* Slightly higher lift effect */
  filter: brightness(1.05); /* Subtle brightness boost */
`;

const commonActiveEffect = `
  transform: translateY(-1px); /* Small press effect */
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1); /* Reduced shadow when pressed */
  filter: brightness(0.98); /* Subtle dimming when pressed */
`;

const commonButtonBaseStyles = `
  padding: 12px 28px; /* More spacious padding for better touch targets */
  font-size: 1rem; /* Slightly larger for better readability */
  font-weight: 600; /* More pronounced weight for emphasis */
  letter-spacing: 0.2px; /* Subtle letter spacing for professionalism */
  text-transform: none; /* Keep text as is, don't force uppercase */
  border-radius: 10px; /* More modern, slightly rounded corners */
  min-width: 140px; /* Wider minimum for better proportion */
  ${commonTransition}
  position: relative; /* For potential effects */
  overflow: hidden; /* For ripple effects if needed */
`;

export const RedButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background: linear-gradient(135deg, #FF5F6D 0%, #DC3545 100%); /* Gradient red */
    color: white;
    box-shadow: 0px 4px 15px rgba(220, 53, 69, 0.25); /* Subtle color-matched shadow */

    &:hover {
      background: linear-gradient(135deg, #FF5F6D 0%, #C82333 100%); /* Slightly darker gradient */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover:before {
      opacity: 1;
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background: linear-gradient(135deg, #45484D 0%, #232526 100%); /* Subtle gradient */
    color: white;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Matching shadow */

    &:hover {
      background: linear-gradient(135deg, #3A3D42 0%, #1A1C1E 100%); /* Darker gradient */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover:before {
      opacity: 1;
    }
  }
`;

export const DarkRedButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background: linear-gradient(135deg, #CB356B 0%, #A30000 100%); /* Rich gradient */
    color: white;
    box-shadow: 0px 4px 15px rgba(163, 0, 0, 0.25); /* Color-matched shadow */

    &:hover {
      background: linear-gradient(135deg, #BD2D63 0%, #800000 100%); /* Darker gradient */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover:before {
      opacity: 1;
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background: linear-gradient(135deg, #36D1DC 0%, #007BFF 100%); /* Modern blue gradient */
    color: white;
    box-shadow: 0px 4px 15px rgba(0, 123, 255, 0.3); /* Color-matched shadow */

    &:hover {
      background: linear-gradient(135deg, #2CC2CD 0%, #0062CC 100%); /* Slightly darker */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover:before {
      opacity: 1;
    }
  }
`;

export const PurpleButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background: linear-gradient(135deg, #a4508b 0%, #6a0572 100%); /* Our theme gradient */
    color: white;
    box-shadow: 0px 4px 15px rgba(106, 5, 114, 0.3); /* Color-matched shadow */

    &:hover {
      background: linear-gradient(135deg, #b55a9c 0%, #5c0461 100%); /* Enhanced gradient */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover:before {
      opacity: 1;
    }
  }
`;

export const LightPurpleButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background: linear-gradient(135deg, #9D50BB 0%, #6E48AA 100%); /* Lighter purple gradient */
    color: white;
    box-shadow: 0px 4px 15px rgba(111, 66, 193, 0.3); /* Color-matched shadow */

    &:hover {
      background: linear-gradient(135deg, #8E45AC 0%, #5E35B1 100%); /* Slightly darker */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover:before {
      opacity: 1;
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background: linear-gradient(135deg, #56AB2F 0%, #28A745 100%); /* Fresh green gradient */
    color: white;
    box-shadow: 0px 4px 15px rgba(40, 167, 69, 0.25); /* Color-matched shadow */

    &:hover {
      background: linear-gradient(135deg, #4C9729 0%, #218838 100%); /* Slightly darker */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover:before {
      opacity: 1;
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background: linear-gradient(135deg, #868F96 0%, #596164 100%); /* Sophisticated gray gradient */
    color: white;
    box-shadow: 0px 4px 15px rgba(108, 117, 125, 0.25); /* Color-matched shadow */

    &:hover {
      background: linear-gradient(135deg, #78828A 0%, #4A5054 100%); /* Slightly darker */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover:before {
      opacity: 1;
    }
  }
`;

export const IndigoButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background: linear-gradient(135deg, #8E2DE2 0%, #6610F2 100%); /* Rich indigo gradient */
    color: white;
    box-shadow: 0px 4px 15px rgba(102, 16, 242, 0.3); /* Color-matched shadow */

    &:hover {
      background: linear-gradient(135deg, #7C1DD0 0%, #5600E8 100%); /* Slightly darker */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover:before {
      opacity: 1;
    }
  }
`;