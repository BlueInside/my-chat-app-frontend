import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const AboutContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  margin-bottom: 10px;
  font-size: 18px;
  line-height: 1.6;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutContainer>
        <Title>About This Project</Title>
        <Paragraph>
          This chat application is developed as part of my journey through The
          Odin Project, an open-source curriculum for learning web development.
          This project is intended to demonstrate the integration of a
          full-stack environment by separating the backend and frontend
          functionalities.
        </Paragraph>
        <Paragraph>
          As my second full-stack project, it emphasizes learning through
          implementation and aims to solidify my understanding of technologies
          such as React for the frontend and Express for the backend. It also
          introduces concepts like user authentication and handling media in web
          applications.
        </Paragraph>
        <Paragraph>
          The primary goal of this project is educational, designed to challenge
          and enhance my software development skills.
        </Paragraph>
        <Paragraph>
          You can find more about my work and other projects on my GitHub
          profile:
          <br />
          <Link
            href="https://github.com/BlueInside"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
          .
        </Paragraph>
      </AboutContainer>
      <Footer />
    </>
  );
}

export default AboutPage;
