import React from 'react';

import { SVGAttributes } from 'react';

interface Props extends SVGAttributes<SVGSVGElement> {}

const XMarkIcon = React.memo(({ ...props }: Props) => {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15.085 15.458L30.1699 30.5429M30.1699 15.458L15.085 30.5429"
        stroke={props.stroke ?? 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default XMarkIcon;
