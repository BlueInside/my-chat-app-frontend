import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #f8f9fa;
  text-align: center;
  padding: 20px;
  font-size: 0.875rem;
`;

function Footer() {
  return (
    <StyledFooter>
      © 2023 Karol Pulawski |{' '}
      <a href="https://github.com/BlueInside">
        <FaGithub size="2em" />
      </a>
    </StyledFooter>
  );
}

export default Footer;
