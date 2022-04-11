import { useContext, useMemo } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Image, Header, Box, ResponsiveContext } from 'grommet';
import { useAppState } from '../store';
// import { usePageTitle } from '../hooks/usePageTitle';
import { Account } from '../components/Account';
import { SignInButton, SignOutButton } from '../components/buttons/web3Modal';
import { GlobalMenu } from './Routes';
import { useWindowsDimension } from '../hooks/useWindowsDimension';

export const ResponsiveSmallLogo = (winWidth: number) => {
  if (winWidth >= 1300) {
    return '48vw';
  } else if (winWidth >= 1000) {
    return '47vw';
  } else if (winWidth <= 1000) {
    return '46vw';
  } else if (winWidth <= 768) {
    return '44vw';
  } else if (winWidth <= 600) {
    return '41vw';
  } else if (winWidth <= 500) {
    return '40vw';
  }
};

export const ResponsiveLogo = (winWidth: number) => {
  if (winWidth >= 1300) {
    return '35vw';
  } else if (winWidth <= 1100) {
    return '29vw';
  } else if (winWidth >= 1000) {
    return '32vw';
  } else if (winWidth <= 1000) {
    return '30vw';
  }
};

export const AppHeader = () => {
  const size = useContext(ResponsiveContext);
  const { winWidth } = useWindowsDimension();
  const { state, pathname } = useLocation();

  const navigate = useNavigate();
  const { account } = useAppState();
  console.log('WINDOW', winWidth)
  const returnLocation = useMemo(
    () => (state as any)?.location as Location,
    [state]
  );

  return (
    <Header
      pad='medium'
      style={{
        position: 'relative',
        background: '#611FF2',
        width: '100vw',
      }}
      responsive={true}
    >
      {(returnLocation && account) &&
        <Navigate to={returnLocation} state={null} />
      }
      <Box direction='row' gap={size}>
        <GlobalMenu />
      </Box>

      {pathname === '/' || pathname === '/search' || winWidth < 900 ?
        <Image
          style={{
            position: 'absolute',
            left: ResponsiveSmallLogo(winWidth),
          }}
          src='logo-small.png'
          height='32px'
          onClick={() => navigate('/')}
        />
        : <Image
          style={{
            position: 'absolute',
            left: ResponsiveLogo(winWidth),
          }}
          src='/logo.png'
          height='32px'
          onClick={() => navigate('/')}
        />
      }
      <Image
        fit="cover"
        src='/bg-img.svg'
        color='#611FF2'
        style={{
          width: '100vw',
          // height: '100vh',
          position: 'absolute',
          left: '0',
          bottom: '-1.5rem',
          zIndex: '-100'
        }}
      />

      <Box direction='row' align='center' gap={size}>
        <Account account={account} />
        <Box>
          {account
            ? <SignOutButton />
            : <SignInButton />
          }
        </Box>
        {/* <SwitchThemeMode /> */}
      </Box>
    </Header>
  );
};
