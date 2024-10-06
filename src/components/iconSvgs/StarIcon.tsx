import React, { useMemo } from 'react';

import { SVGAttributes } from 'react';

interface Props extends SVGAttributes<SVGSVGElement> {
  isActive: boolean;
}

const StarIcon = React.memo(({ ...props }: Props) => {
  const renderStrokeColor = useMemo(() => {
    if (props.isActive) {
      return '#FBBC05';
    } else {
      return '#4F4F4F';
    }
  }, [props.isActive]);

  const renderFillColor = useMemo(() => {
    if (props.isActive) {
      return '#FBBC05';
    } else {
      return '#FFFFFF';
    }
  }, [props.isActive]);

  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.3181 0.863281L13.0247 6.00897L19.0774 6.83919L14.6977 10.8423L15.7313 16.4976L10.3181 13.8261L4.9049 16.4976L5.93849 10.8423L1.55887 6.83919L7.61151 6.00897L10.3181 0.863281Z"
        stroke={props.stroke ?? renderStrokeColor}
        strokeWidth="1.47959"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={props.fill ?? renderFillColor}
      />
    </svg>
  );
});

export default StarIcon;
