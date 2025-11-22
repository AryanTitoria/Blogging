import { AppBar, Toolbar, styled, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Component = styled(AppBar)`
  background: linear-gradient(180deg, #ffffff 0%, #fbfbfb 100%);
  color: #111;
  box-shadow: 0 4px 18px rgba(0,0,0,0.08);
`;

const Container = styled(Toolbar)`
  justify-content: center;
  min-height: 64px;
  padding-left: 24px;
  padding-right: 24px;
`;

const NavWrapper = styled(Box)`
  display: flex;
  gap: 18px;
  align-items: center;
  flex-wrap: wrap;
`;

const NavButton = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 24px;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.6px;
  color: #222;
  transition: all 160ms ease-in-out;
  border: 1px solid transparent;
  background: transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(35, 99, 255, 0.08);
    background: rgba(40, 116, 240, 0.06);
    color: #0b63ff;
  }

  &.active {
    background: linear-gradient(90deg, #2874f0 0%, #3b8bff 100%);
    color: #fff;
    box-shadow: 0 8px 26px rgba(51, 110, 255, 0.2);
    transform: none;
    border: 1px solid rgba(255,255,255,0.08);
  }

  @media (max-width:600px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const Header = () => {
  return (
    <Component position="fixed" elevation={2}>
      <Container>
        <NavWrapper>
          <NavButton to="/" end>HOME</NavButton>
          <NavButton to="/about">ABOUT</NavButton>
          <NavButton to="/contact">CONTACT</NavButton>
          <NavButton to="/login">LOGOUT</NavButton>
        </NavWrapper>
      </Container>
    </Component>
  );
};

export default Header;
