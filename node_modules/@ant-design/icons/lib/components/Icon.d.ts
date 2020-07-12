import * as React from 'react';
export interface IconBaseProps {
    tabIndex?: number;
    className?: string;
    title?: string;
    onKeyUp?: React.KeyboardEventHandler<HTMLElement>;
    onClick?: React.MouseEventHandler<HTMLElement>;
    style?: React.CSSProperties;
    role?: string;
    spin?: boolean;
    rotate?: number;
    children?: React.ReactNode;
}
export interface CustomIconComponentProps {
    width: string | number;
    height: string | number;
    fill: string;
    viewBox?: string;
    className?: string;
    style?: React.CSSProperties;
}
export interface IconComponentProps extends IconBaseProps {
    viewBox?: string;
    component?: React.ComponentType<CustomIconComponentProps | React.SVGProps<SVGSVGElement>>;
    ariaLabel?: React.AriaAttributes['aria-label'];
}
declare const Icon: React.ForwardRefExoticComponent<IconComponentProps & React.RefAttributes<HTMLSpanElement>>;
export default Icon;
