import React from "react";
import { useHistory } from "react-router";

import { CardImage } from "../styled/Card";
import { Button, Container, Heading, Stack, Text } from "../styled/Shared";
import bgImage from "../assets/images/shot.png";
const Home = () => {
  const authParams = {
    client_id: "b238b4dd0cd941b2a4945d31cdbdec17",
    redirect_url: "http://localhost:3000/redirect",
  };

  console.log(
    process.env.REACT_APP_AUTH_URL,
    process.env.REACT_APP_CLIENT_ID,
    process.env.REACT_APP_REDIRECT_URL
  );

  const authUrl = `${process.env.REACT_APP_AUTH_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&show_dialog=true`;

  const handleGrantPermission = () => {
    window.location.href = authUrl;
  };

  return (
    <Container>
      <Stack>
        <h1>guesss.</h1>
        <Stack
          justify='space-between'
          spacing='4rem'
          style={{ marginTop: "10rem" }}
          isInline
        >
          <Stack
            flexBasis='100%'
            justify='center'
            align='center'
            // style={{ marginBottom: "rem" }}
          >
            <Heading size={60} w='80%'>
              How well do you know your{" "}
              <span style={{ color: "#00d41c" }}>playlists?</span>
            </Heading>
            <Text fontSize='24px' style={{ marginTop: "2rem", width: "45%" }}>
              Generate Spotify music quizzes to guess songs on your playlist!
            </Text>
            <Button
              onClick={() => handleGrantPermission()}
              style={{ marginTop: "2rem" }}
            >
              <Text color='rgb(0, 14, 6)' bold>
                Login with Spotify
              </Text>
            </Button>
            <Stack isInline style={{ marginTop: "10rem" }}>
              <CardImage width='200px' height='400px'>
                <img
                  src='https://i.scdn.co/image/ab67706f000000035ec18f4cc2ba9e3c5e287cd9'
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    borderRadius: "20px",
                    transform: "translateX(10rem)",
                  }}
                ></img>
              </CardImage>
              <CardImage
                width='200px'
                height='400px'
                style={{ marginTop: "-5rem" }}
              >
                <img
                  src='https://i.scdn.co/image/ab67706f000000033c6c5a76712dd683af373183'
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    boxShadow: "5px 14px 17px -5px rgba(91,91,91,0.15)",
                  }}
                ></img>
              </CardImage>
              <CardImage width='200px' height='400px'>
                <img
                  src='https://mosaic.scdn.co/640/ab67616d0000b27311817420f8121fb18f9b26e5ab67616d0000b27356080feb452fa7ad4ca61d8bab67616d0000b27385c7af5b879dc405b14856f3ab67616d0000b273f8616bfdf94abe5da53cdc82'
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    borderRadius: "20px",
                    transform: "translateX(-12rem)",
                  }}
                ></img>
              </CardImage>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Home;
