import React from 'react';

/**
 * JSX wrapper for CSS's alignment style
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const Align = props => {
  const {
    children,
    type,
    alignCenter,
    alignStart,
    alignEnd,
    justifyCenter,
    justifyBetween,
    justifyEvenly,
    justifyStart,
    justifyEnd,
    justifyAround,
  } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: type || 'row',
        ...(alignCenter ? { alignItems: 'center' } : {}),
        ...(alignEnd ? { alignItems: 'flex-end' } : {}),
        ...(alignStart ? { alignItems: 'flex-start' } : {}),
        ...(justifyCenter ? { justifyContent: 'center' } : {}),
        ...(justifyAround ? { justifyContent: 'space-around' } : {}),
        ...(justifyBetween ? { justifyContent: 'space-between' } : {}),
        ...(justifyEnd ? { justifyContent: 'flex-end' } : {}),
        ...(justifyStart ? { justifyContent: 'flex-start' } : {}),
        ...(justifyEvenly ? { justifyContent: 'space-evenly' } : {}),
      }}
    >
      {children}
    </div>
  );
};

/**
 * JSX wrapper for CSS's Padding styles
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const Padding = props => {
  const { left, right, top, bottom, children, style = {} } = props;
  return (
    <div
      style={{
        paddingLeft: left || 0,
        paddingRight: right || 0,
        paddingTop: top || 0,
        paddingBottom: bottom || 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * JSX wrapper for CSS's Margin
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const Margin = props => {
  const { left, right, top, bottom, children, style = {} } = props;
  return (
    <div
      style={{
        marginLeft: left || 0,
        marginRight: right || 0,
        marginTop: top || 0,
        marginBottom: bottom || 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const FacebookIcon = () => {
  return (
    <span className={'anticon'} style={{ paddingRight: 20 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <path
          className="a"
          fill="#447ac4"
          d="M23.4,4.5H5.6A1.1,1.1,0,0,0,4.5,5.6V23.4a1.1,1.1,0,0,0,1.1,1.1h8.9V16.583H12.109V13.667H14.5V11.51a3.8,3.8,0,0,1,4.1-3.99c1.1,0,2.292.083,2.568.12v2.7H19.328c-1.255,0-1.495.594-1.495,1.469v1.859h2.99l-.391,2.917h-2.6V24.5H23.4a1.1,1.1,0,0,0,1.1-1.1V5.6A1.1,1.1,0,0,0,23.4,4.5Z"
          transform="translate(-4.5 -4.5)"
        />
      </svg>
    </span>
  );
};
export const GoogleIcon = () => {
  return (
    <span className={'anticon'} style={{ paddingRight: 20 }}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 512 512"
        version="1.1"
        id="Layer_1"
      >
        <path
          fill="#FBBB00"
          d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256  c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456  C103.821,274.792,107.225,292.797,113.47,309.408z"
        />
        <path
          fill="#518EF8"
          d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451  c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535  c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
        />
        <path
          fill="#28B446"
          d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512  c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771  c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
        />
        <path
          fill="#F14336"
          d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012  c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0  C318.115,0,375.068,22.126,419.404,58.936z"
        />
      </svg>
    </span>
  );
};
export const Logo = () => {
  return (
    <span className={'anticon'}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="102.83"
        height="21.034"
        viewBox="0 0 102.83 21.034"
      >
        <path
          fill="#3e82ff"
          d="M-37.453-5.434c0-6.11-9.022-4.68-9.022-7.852A1.618,1.618,0,0,1-44.6-14.95a1.976,1.976,0,0,1,2.106,1.9h4.81c-.182-3.484-2.86-5.46-6.838-5.46-3.822,0-6.656,1.924-6.656,5.382-.052,6.474,9.074,4.654,9.074,8.034,0,1.066-.832,1.716-2.132,1.716A2.093,2.093,0,0,1-46.5-5.46h-4.732c.13,3.692,3.2,5.642,7.124,5.642C-39.845.182-37.453-2.366-37.453-5.434Zm16.536-9.074h-4.446V-6.63c0,1.976-1.092,3.068-2.808,3.068-1.664,0-2.782-1.092-2.782-3.068v-7.878h-4.42v8.476c0,3.874,2.262,6.188,5.616,6.188a5.286,5.286,0,0,0,4.394-2.132V0h4.446Zm7.124,7.774c0-2.5,1.222-3.224,3.328-3.224h1.222v-4.706a5.408,5.408,0,0,0-4.55,2.574v-2.418h-4.446V0h4.446Zm4.784-7.774L-3.861,0H1.625L6.773-14.508H2.041L-1.105-4.16-4.251-14.508Zm23.53,3.354a2.508,2.508,0,0,1,2.73,2.5H11.687A2.75,2.75,0,0,1,14.521-11.154ZM21.463-4.81H16.731a2.364,2.364,0,0,1-2.314,1.4,2.69,2.69,0,0,1-2.756-2.782H21.723a11.235,11.235,0,0,0,.078-1.3,6.837,6.837,0,0,0-7.228-7.228c-4.316,0-7.332,2.86-7.332,7.462S10.309.208,14.573.208A6.78,6.78,0,0,0,21.463-4.81ZM23.621,0h4.446V-19.24H23.621Zm7.15,0h4.446V-14.508H30.771Zm2.236-16.016a2.448,2.448,0,0,0,2.626-2.392,2.452,2.452,0,0,0-2.626-2.418,2.46,2.46,0,0,0-2.652,2.418A2.456,2.456,0,0,0,33.007-16.016Zm11.31,4.862a2.508,2.508,0,0,1,2.73,2.5H41.483A2.75,2.75,0,0,1,44.317-11.154ZM51.259-4.81H46.527a2.364,2.364,0,0,1-2.314,1.4,2.69,2.69,0,0,1-2.756-2.782H51.519a11.235,11.235,0,0,0,.078-1.3,6.837,6.837,0,0,0-7.228-7.228c-4.316,0-7.332,2.86-7.332,7.462S40.105.208,44.369.208A6.78,6.78,0,0,0,51.259-4.81Z"
          transform="translate(51.233 20.826)"
        />
      </svg>
    </span>
  );
};
