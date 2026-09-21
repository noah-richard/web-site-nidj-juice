/* ==========================================================================
   NIDJ JUICE (MOBILE) — AGENCY-GRADE VECTOR ICONS
   Pure SVG Line Icons • Zero Emojis • International Agency Standard
   ========================================================================== */

import React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
  strokeWidth?: number;
}

export const HomeIcon: React.FC<IconProps> = ({
  color = '#1A1D20',
  size = 22,
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 21V12H15V21"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CompassIcon: React.FC<IconProps> = ({
  color = '#1A1D20',
  size = 22,
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M15.5 8.5L13.5 13.5L8.5 15.5L10.5 10.5L15.5 8.5Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const StoreIcon: React.FC<IconProps> = ({
  color = '#1A1D20',
  size = 22,
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9L4.5 4H19.5L21 9V10.5C21 11.88 19.88 13 18.5 13C17.12 13 16 11.88 16 10.5C16 11.88 14.88 13 13.5 13C12.12 13 11 11.88 11 10.5C11 11.88 9.88 13 8.5 13C7.12 13 6 11.88 6 10.5C6 11.88 4.88 13 3.5 13C2.12 13 1 11.88 1 10.5V9"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 13V20C4 20.55 4.45 21 5 21H19C19.55 21 20 20.55 20 20V13"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M9 21V15H15V21"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BagIcon: React.FC<IconProps> = ({
  color = '#1A1D20',
  size = 22,
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 8V6C6 4.34315 7.34315 3 9 3H15C16.6569 3 18 4.34315 18 6V8"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect
      x="3"
      y="8"
      width="18"
      height="13"
      rx="3"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="9" cy="12" r="1" fill={color} />
    <Circle cx="15" cy="12" r="1" fill={color} />
  </Svg>
);

export const PlusIcon: React.FC<IconProps> = ({
  color = '#FFFFFF',
  size = 18,
  strokeWidth = 2.5,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5V19M5 12H19"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ArrowBackIcon: React.FC<IconProps> = ({
  color = '#FFFFFF',
  size = 22,
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 19L8 12L15 5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MoreDotsIcon: React.FC<IconProps> = ({
  color = '#FFFFFF',
  size = 22,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="5" cy="12" r="2" fill={color} />
    <Circle cx="12" cy="12" r="2" fill={color} />
    <Circle cx="19" cy="12" r="2" fill={color} />
  </Svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({
  color = '#71767B',
  size = 16,
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 5L16 12L9 19"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const VolumeIcon: React.FC<IconProps> = ({
  color = '#E8590C',
  size = 20,
  strokeWidth = 1.8,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 3H15M10 3V6.5L6 14.5C5.5 15.5 6.2 16.5 7.3 16.5H16.7C17.8 16.5 18.5 15.5 18 14.5L14 6.5V3"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.5 13H16.5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

export const LeafIcon: React.FC<IconProps> = ({
  color = '#E8590C',
  size = 20,
  strokeWidth = 1.8,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21C12 21 19 19 20 10C21 1 12 2 12 2C12 2 3 1 4 10C5 19 12 21 12 21Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 21V9M12 13L8 11M12 16L16 14"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

export const DropIcon: React.FC<IconProps> = ({
  color = '#E8590C',
  size = 20,
  strokeWidth = 1.8,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2.5C12 2.5 5 11 5 15.5C5 19.0899 8.13401 22 12 22C15.866 22 19 19.0899 19 15.5C19 11 12 2.5 12 2.5Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const StarFilledIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 14,
  color = '#F59E0B',
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </Svg>
);

export const SearchIcon: React.FC<IconProps> = ({
  color = '#71767B',
  size = 18,
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M20 20L16 16"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

export const PhoneIcon: React.FC<IconProps> = ({
  color = '#1A1D20',
  size = 16,
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3521 21.4019C21.1468 21.5902 20.9046 21.7334 20.6407 21.8224C20.3768 21.9113 20.0974 21.9441 19.82 21.919C16.7428 21.5839 13.787 20.5342 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.19 12.85C3.49997 10.2413 2.44944 7.27109 2.12 4.17999C2.095 3.90353 2.12741 3.62497 2.21516 3.36182C2.30292 3.09867 2.44406 2.85694 2.62955 2.65213C2.81504 2.44732 3.04071 2.2841 3.29177 2.17319C3.54283 2.06227 3.81363 2.00623 4.09 2.00899H7.09C7.57393 1.99616 8.04356 2.16955 8.40428 2.49399C8.765 2.81843 8.99127 3.27218 9.04 3.76999C9.13111 4.70783 9.36056 5.62934 9.72 6.50999C9.86638 6.86241 9.9056 7.24973 9.83354 7.62386C9.76148 7.99798 9.58124 8.34241 9.315 8.61499L8.04 9.88999C9.46747 12.3995 11.5405 14.4725 14.05 15.9L15.32 14.625C15.5926 14.3587 15.937 14.1785 16.3111 14.1064C16.6853 14.0344 17.0726 14.0736 17.425 14.22C18.3057 14.5794 19.2272 14.8089 20.165 14.9C20.6681 14.9493 21.1264 15.1804 21.4524 15.5484C21.7784 15.9164 21.9489 16.3938 21.93 16.88L22 16.92Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MessageSquareIcon: React.FC<IconProps> = ({
  color = '#FFFFFF',
  size = 16,
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SunCloudIcon: React.FC<IconProps> = ({
  color = '#F59E0B',
  size = 22,
  strokeWidth = 1.8,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="7" r="3" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M12 1V3M12 11V13M6.34 3.66L7.75 5.07M16.25 10.93L17.66 12.34M1 7H3M17 7H19M4 17C4 14.8 5.8 13 8 13C8.7 13 9.4 13.2 10 13.5C10.7 11.5 12.7 10 15 10C17.8 10 20 12.2 20 15C20 15.3 20 15.7 19.9 16C21.1 16.6 22 17.7 22 19C22 20.7 20.7 22 19 22H6C4.3 22 3 20.7 3 19C3 18 3.5 17.2 4 17Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CheckIcon: React.FC<IconProps> = ({
  color = '#FFFFFF',
  size = 18,
  strokeWidth = 2.5,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17L4 12"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TrashIcon: React.FC<IconProps> = ({
  color = '#D32F2F',
  size = 18,
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6H5H21M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
