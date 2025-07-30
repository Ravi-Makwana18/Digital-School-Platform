import styled from 'styled-components';
import { Button } from '@mui/material';

const commonTransition = `
  transition: all 0.25s ease-in-out; /* Slightly longer, smoother transition */
`;

const commonHoverEffect = `
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1), 0px 2px 5px rgba(0, 0, 0, 0.05); /* Softer, more pronounced lift */
  transform: translateY(-3px); /* Slightly higher lift effect */
`;

const commonActiveEffect = `
  transform: translateY(0); /* Resets position when pressed */
  box-shadow: none; /* Removes shadow when pressed */
`;

const commonButtonBaseStyles = `
  padding: 10px 24px; /* Consistent padding for medium-sized buttons */
  font-size: 0.95rem; /* Standard readable font size */
  font-weight: 500; /* Medium weight for professionalism */
  text-transform: none; /* Keep text as is, don't force uppercase */
  border-radius: 8px; /* Consistent, soft rounded corners */
  min-width: 120px; /* Ensure a minimum width for consistent appearance */
  ${commonTransition}
`;

export const RedButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background-color: #DC3545; /* Bootstrap-inspired vibrant red */
    color: white;

    &:hover {
      background-color: #C82333; /* Darker red on hover */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background-color: #343A40; /* Dark Charcoal - Versatile neutral */
    color: white;

    &:hover {
      background-color: #23272B; /* Even darker on hover */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
  }
`;

export const DarkRedButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background-color: #A30000; /* Deep, muted red for strong warnings/actions */
    color: white;

    &:hover {
      background-color: #800000; /* Darker on hover */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background-color: #007BFF; /* Standard, clear blue for primary actions */
    color: #fff;

    &:hover {
      background-color: #0062CC; /* Darker blue on hover */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
  }
`;

export const PurpleButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background-color: #6a0572; /* Deep Plum (from your index.css root variables) */
    color: #fff;

    &:hover {
      background-color: #a4508b; /* Muted Rose (from your index.css root variables) */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
  }
`;

export const LightPurpleButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background-color: #6F42C1; /* Lighter, distinct purple */
    color: #fff;

    &:hover {
      background-color: #5E35B1; /* Darker on hover */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background-color: #28A745; /* Vibrant, standard green for success */
    color: #fff;

    &:hover {
      background-color: #218838; /* Darker green on hover */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background-color: #6C757D; /* Muted Gray/Brown - for secondary actions or less emphasis */
    color: white;

    &:hover {
      background-color: #5A6268; /* Darker on hover */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
  }
`;

export const IndigoButton = styled(Button)`
  && {
    ${commonButtonBaseStyles}
    background-color: #6610F2; /* Stronger Indigo/Violet */
    color: white;

    &:hover {
      background-color: #5600E8; /* Darker on hover */
      ${commonHoverEffect}
    }
    &:active {
      ${commonActiveEffect}
    }
  }
`;