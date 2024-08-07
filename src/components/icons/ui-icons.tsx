/* eslint-disable react/display-name */
// define function createIcon to behave like createIcon from @chakra-ui/icons

const createFromIconfontCN = (icon: any) => {
  const { path } = icon;
  return () => {
    return <>{path}</>;
  };
};

type IconProps = {
  viewBox: string;
  path: JSX.Element;
  displayName: string;
};

const createIcon = (props: IconProps) => {
  const { viewBox, path } = props;
  const icon = {
    viewBox,
    path,
    defaultProps: {
      fill: 'currentColor'
    }
  };
  return createFromIconfontCN(icon);
};

export const MaiarDefiWalletIcon = createIcon({
  displayName: 'MaiarDefiWalletIcon',
  viewBox: '0 0 25 23',
  path: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='20'
      viewBox='0 0 24 21'
    >
      <defs>
        <style></style>
      </defs>
      <g transform='translate(11024 -18800.5)'>
        <path
          fill='#23f7dd'
          d='M21.619-15H3.75A.75.75,0,0,1,3-15.75a.75.75,0,0,1,.75-.75h18a.75.75,0,0,0,.75-.75,2.25,2.25,0,0,0-2.25-2.25H3a3,3,0,0,0-3,3v15a3,3,0,0,0,3,3H21.619A2.321,2.321,0,0,0,24-.75v-12A2.321,2.321,0,0,0,21.619-15Z'
          transform='translate(-11024 18820)'
        ></path>
        <g transform='translate(-11017.25 18810) scale(0.3)'>
          <path
            fill='#fff'
            d='M17.8956 12.0018L32.0458 4.52327L29.6668 0L16.7098 5.18441C16.3761 5.31809 16.0062 5.31809 15.6726 5.18441L2.71192 0L0.333008 4.52327L14.4832 12.0018L0.333008 19.4767L2.71192 24L15.669 18.8156C16.0027 18.6819 16.3725 18.6819 16.7061 18.8156L29.6632 24L32.0421 19.4767L17.8919 11.9982L17.8956 12.0018Z'
          ></path>
        </g>
        <circle
          fill='#fff'
          cx='1.314'
          cy='1.314'
          r='1.314'
          transform='translate(-11004.771 18812.314)'
        ></circle>
      </g>
    </svg>
  )
});
export const MaiarAppIcon = createIcon({
  displayName: 'MaiarAppIcon',
  viewBox: '0 0 14 21',
  path: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='17.5'
      height='20'
      viewBox='0 0 17.5 28'
    >
      <defs>
        <style></style>
      </defs>
      <g transform='translate(11007 -18884.001)'>
        <path
          fill='#23f7dd'
          d='M14.875-21H2.625A2.626,2.626,0,0,0,0-18.375V4.375A2.626,2.626,0,0,0,2.625,7h12.25A2.626,2.626,0,0,0,17.5,4.375v-22.75A2.626,2.626,0,0,0,14.875-21Z'
          transform='translate(-11007 18905)'
        ></path>
        <g transform='translate(-11003 18892.168) scale(0.285)' fill='#fff'>
          <path d='M17.8956 12.0018L32.0458 4.52327L29.6668 0L16.7098 5.18441C16.3761 5.31809 16.0062 5.31809 15.6726 5.18441L2.71192 0L0.333008 4.52327L14.4832 12.0018L0.333008 19.4767L2.71192 24L15.669 18.8156C16.0027 18.6819 16.3725 18.6819 16.7061 18.8156L29.6632 24L32.0421 19.4767L17.8919 11.9982L17.8956 12.0018Z'></path>
        </g>
        <circle
          fill='#fff'
          cx='1.5'
          cy='1.5'
          r='1.5'
          transform='translate(-10999.75 18906.498)'
        ></circle>
      </g>
    </svg>
  )
});
export const WebWalletIcon = createIcon({
  displayName: 'WebWalletIcon',
  viewBox: '0 0 27 24',
  path: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='27'
      height='24'
      viewBox='0 0 27 24'
    >
      <defs>
        <style></style>
      </defs>
      <g transform='translate(11028 -19030)'>
        <path
          fill='#23f7dd'
          d='M24.75-21H2.25A2.251,2.251,0,0,0,0-18.75v13.5A2.251,2.251,0,0,0,2.25-3h22.5A2.251,2.251,0,0,0,27-5.25v-13.5A2.251,2.251,0,0,0,24.75-21ZM22.5,1.875A1.122,1.122,0,0,0,21.375.75H16.753l-.872-2.616a.56.56,0,0,0-.534-.384H11.658a.56.56,0,0,0-.534.384L10.252.75H5.625a1.125,1.125,0,0,0,0,2.25h15.75A1.122,1.122,0,0,0,22.5,1.875Z'
          transform='translate(-11028 19051)'
        ></path>
        <g transform='translate(-11021 19034) scale(0.4)' fill='#fff'>
          <path d='M17.8956 12.0018L32.0458 4.52327L29.6668 0L16.7098 5.18441C16.3761 5.31809 16.0062 5.31809 15.6726 5.18441L2.71192 0L0.333008 4.52327L14.4832 12.0018L0.333008 19.4767L2.71192 24L15.669 18.8156C16.0027 18.6819 16.3725 18.6819 16.7061 18.8156L29.6632 24L32.0421 19.4767L17.8919 11.9982L17.8956 12.0018Z'></path>
        </g>
      </g>
    </svg>
  )
});
export const LegerWalletIcon = createIcon({
  displayName: 'LegerWalletIcon',
  viewBox: '0 0 19 19',
  path: (
    <svg
      width='19'
      height='19'
      viewBox='0 0 19 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M7 0H16C17.6569 0 19 1.34315 19 3V12H7V0Z' fill='#23f7dd' />
      <path d='M4 0H2C0.895431 0 0 0.895431 0 2V4H4V0Z' fill='#23f7dd' />
      <path
        d='M0 15L2.78142e-07 17C4.31755e-07 18.1046 0.895431 19 2 19L4 19L4 15L0 15Z'
        fill='#23f7dd'
      />
      <path
        d='M19 15L19 17C19 18.1046 18.1046 19 17 19L15 19L15 15L19 15Z'
        fill='#23f7dd'
      />
      <path d='M4 8H0V12H4V8Z' fill='#23f7dd' />
      <path d='M12 15H8V19H12V15Z' fill='#23f7dd' />
    </svg>
  )
});

export function WalletIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M21 12V7H5a2 2 0 0 1 0-4h14v4' />
      <path d='M3 5v14a2 2 0 0 0 2 2h16v-5' />
      <path d='M18 12a2 2 0 0 0 0 4h4v-4Z' />
    </svg>
  );
}
