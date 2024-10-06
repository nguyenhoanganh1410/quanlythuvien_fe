import React from 'react';

import { SVGAttributes } from 'react';

interface Props extends SVGAttributes<SVGSVGElement> {}

const CheckSquareIcon = React.memo(({ ...props }: Props) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="0.5" y="0.5" width="19" height="19" rx="2.5" stroke={props.stroke ?? '#9CA3AF'} />
    </svg>
  );
});

export default CheckSquareIcon;
