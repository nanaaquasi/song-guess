import React from "react";
import { Avatar, AvatarImage, Container, Stack, Text } from "../styled/Shared";
import { GameCard } from "../styled/Card";
import iconHelp from "../assets/icons/help.png";
import iconSong from "../assets/icons/song.png";
import iconPlaylist from "../assets/icons/playlist.png";
import { getCurrentUserProfile } from "../api/spotify.service";

type Image = {
  height?: string;
  width?: string;
  url: string;
};

type User = {
  name: string;
  profileImage: Image;
};

const Welcome = () => {
  const [user, setCurrentUser] = React.useState<User>();
  React.useEffect(() => {
    const getUserProfile = async (): Promise<void> => {
      try {
        const { data } = await getCurrentUserProfile();
        console.log({ data });

        const { display_name, images } = data;

        setCurrentUser({
          name: display_name,
          profileImage: images[0],
        });
      } catch (error) {
        console.log(error);
      }
    };

    getUserProfile();
  }, []);

  return (
    <Container>
      <Stack>
        <Stack isInline spaceBetween>
          <Stack isInline>
            <h1>guesss.</h1>
          </Stack>
          <Stack isInline flexEnd>
            <Avatar>
              <AvatarImage src={user?.profileImage.url} />
            </Avatar>
            <h3>{user?.name}</h3>
          </Stack>
        </Stack>

        <Stack
          isInline
          spaceBetween
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
