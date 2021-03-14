import React from "react";
import Navbar from "../components/Navbar";

import { CardImage } from "../styled/Card";
import { Button, Container, Heading, Stack, Text } from "../styled/Shared";

const Home = () => {
  const authUrl = `${process.env.REACT_APP_AUTH_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&show_dialog=true&scope=user-read-private%20user-read-email%20playlist-read-private%20playlist-read-collaborative`;

  const handleGrantPermission = () => {
    window.location.href = authUrl;
  };

  return (
    <Container>
      <Stack center>
        <Navbar />
        <Stack
          spaceBetween
          style={{ margin: "10rem auto 0 auto", width: "100%" }}
          isInline
          center
        >
          <Stack
            center
            style={{ margin: "0 auto", width: "100%" }}
            // style={{ marginBottom: "rem" }}
          >
            <Heading size={60} w='80%'>
              How well do you know your
              <span style={{ color: "#00d41c" }}> playlists?</span>
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