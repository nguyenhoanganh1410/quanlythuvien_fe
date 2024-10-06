import { EPolicyStatus } from '@/constants/enum';
import React, { useMemo } from 'react';

import { SVGAttributes } from 'react';

interface Props extends SVGAttributes<SVGSVGElement> {
  status: string;
}

const PolicyChatIcon = React.memo(({ ...props }: Props) => {
  const renderFillColor = useMemo(() => {
    if (props.status === EPolicyStatus.CLARIFIED) {
      return '#33475B';
    } else if (props.status === EPolicyStatus.TRAINING) {
      return '#F26524';
    } else {
      return '#D1D0D6';
    }
  }, [props.status]);

  return (
    <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.7002 9.2498C3.7002 8.2685 4.09002 7.32739 4.7839 6.63351C5.47778 5.93962 6.41889 5.5498 7.4002 5.5498H20.3502C21.3315 5.5498 22.2726 5.93962 22.9665 6.63351C23.6604 7.32739 24.0502 8.2685 24.0502 9.2498V16.6498C24.0502 17.6311 23.6604 18.5722 22.9665 19.2661C22.2726 19.96 21.3315 20.3498 20.3502 20.3498H16.6502L11.1002 25.8998V20.3498H7.4002C6.41889 20.3498 5.47778 19.96 4.7839 19.2661C4.09002 18.5722 3.7002 17.6311 3.7002 16.6498V9.2498Z"
        fill={props.fill ?? renderFillColor}
      />
      <path
        d="M27.7503 12.9502V16.6502C27.7503 18.6128 26.9707 20.495 25.5829 21.8828C24.1952 23.2706 22.3129 24.0502 20.3503 24.0502H18.1821L14.915 27.3191C15.433 27.5948 16.0232 27.7502 16.6503 27.7502H20.3503L25.9003 33.3002V27.7502H29.6003C30.5816 27.7502 31.5227 27.3604 32.2166 26.6665C32.9105 25.9726 33.3003 25.0315 33.3003 24.0502V16.6502C33.3003 15.6689 32.9105 14.7278 32.2166 14.0339C31.5227 13.34 30.5816 12.9502 29.6003 12.9502H27.7503Z"
        fill={props.fill ?? renderFillColor}
      />
    </svg>
  );
});

export default PolicyChatIcon;
