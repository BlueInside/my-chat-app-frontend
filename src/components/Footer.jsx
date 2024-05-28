import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #f8f9fa;
  text-align: center;
  padding: 20px;
  font-size: 0.875rem;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

function Footer() {
  return (
    <>
      <div style={{ height: '60px' }}></div>
      <StyledFooter>
        © 2023 Karol Pulawski |{' '}
        <a href="https://github.com/BlueInside">
          <FaGithub size="2em" />
        </a>
      </StyledFooter>
    </>
  );
}

export default Footer;
