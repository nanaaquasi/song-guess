import React from "react";
import { Container, Stack, Text } from "../styled/Shared";
import { GameCard } from "../styled/Card";
import iconHelp from "../assets/icons/help.png";
import iconSong from "../assets/icons/song.png";
import iconPlaylist from "../assets/icons/playlist.png";

const Welcome = () => {
  return (
    <Container>
      <Stack>
        <h1>guesss.</h1>
        <Stack
          isInline
          justify='space-between'
          style={{ width: "85%", margin: "15rem auto 0 auto" }}
        >
          <GameCard>
            <img
              src={iconHelp}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                alignSelf: "center",
              }}
            />
            <Text fontSize='26px' bold style={{ margin: "20px 0" }}>
              How To Play
            </Text>
            <Text fontSize='20px'>
              A brief intro to how the game is played!
            </Text>
          </GameCard>
          <GameCard>
            <img
              src={iconSong}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                alignSelf: "center",
              }}
            />
            <Text fontSize='26px' bold style={{ margin: "20px 0" }}>
              Song Guess
            </Text>
            <Text fontSize='20px'>
              Songs on a playlist you choose are shuffled for you to guess!
            </Text>
          </GameCard>
          <GameCard>
            <img
              src={iconPlaylist}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                alignSelf: "center",
              }}
            />
            <Text fontSize='26px' bold style={{ margin: "20px 0" }}>
              Playlist Queue
            </Text>
            <Text fontSize='20px'>Guess the next song on your playlist!</Text>
          </GameCard>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Welcome;
