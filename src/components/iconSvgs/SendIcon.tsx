import React from 'react';

import { SVGAttributes } from 'react';

interface Props extends SVGAttributes<SVGSVGElement> {}

const SendIcon = React.memo(({ ...props }: Props) => {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M23.2833 2.7168L11.7905 14.2096"
        stroke={props.stroke ?? 'white'}
        strokeWidth="2.0896"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.2837 2.7168L15.9701 23.6128L11.7909 14.2096L2.3877 10.0304L23.2837 2.7168Z"
        stroke={props.stroke ?? 'white'}
        strokeWidth="2.0896"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default SendIcon;
