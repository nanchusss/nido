import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  FiMail,
  FiBell,
  FiSearch,
  FiHeart,
  FiMenu
} from 'react-icons/fi';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 64px;
  background: white;
  border-bottom: 1px solid #eee;
`;

const Inner = styled.div`
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
  padding: 0 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: none;
  color: black;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const IconBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
`;

function Header() {
  return (
    <HeaderWrapper>
      <Inner>
        <Logo to="/">NIDO</Logo>

        <Right>
          <IconBtn><FiMail /></IconBtn>
          <IconBtn><FiBell /></IconBtn>
          <IconBtn><FiSearch /></IconBtn>
          <IconBtn><FiHeart /></IconBtn>
          <IconBtn><FiMenu /></IconBtn>
        </Right>
      </Inner>
    </HeaderWrapper>
  );
}

export default Header;


