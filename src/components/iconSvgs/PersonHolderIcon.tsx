import React from 'react';

import { SVGAttributes } from 'react';

interface Props extends SVGAttributes<SVGSVGElement> {}

const PersonHolderIcon = React.memo(({ ...props }: Props) => {
  return (
    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M19.4136 20.0319C18.9009 18.5941 17.7685 17.3242 16.1943 16.4182C14.6202 15.5123 12.6911 15.021 10.7068 15.021C8.72251 15.021 6.79342 15.5123 5.21928 16.4182C3.64513 17.3242 2.5127 18.5941 2 20.0319"
        stroke={props.stroke ?? '#F26524'}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M10.7045 10.5144C13.1937 10.5144 15.2117 8.49648 15.2117 6.00721C15.2117 3.51795 13.1937 1.5 10.7045 1.5C8.21521 1.5 6.19727 3.51795 6.19727 6.00721C6.19727 8.49648 8.21521 10.5144 10.7045 10.5144Z"
        stroke={props.stroke ?? '#F26524'}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
});

export default PersonHolderIcon;
