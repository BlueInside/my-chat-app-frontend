import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FeaturesContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 10px;
  font-size: 18px;
`;

function FeaturesPage() {
  return (
    <>
      <Navbar />
      <FeaturesContainer>
        <Title>Features of Our Chat App</Title>
        <FeatureList>
          <FeatureItem>Simple user registration and login process.</FeatureItem>
          <FeatureItem>
            Direct messaging with other users to keep conversations private.
          </FeatureItem>
          <FeatureItem>
            Ability to send and receive images within chats.
          </FeatureItem>
          <FeatureItem>
            User profiles where you can set a bio and display a profile picture.
          </FeatureItem>
          <FeatureItem>
            Search functionality to find users by username.
          </FeatureItem>
          <FeatureItem>
            User-friendly interface designed for ease of use on any device.
          </FeatureItem>
        </FeatureList>
      </FeaturesContainer>
      <Footer />
    </>
  );
}

export default FeaturesPage;
