import React from "react";
import { useHistory } from "react-router";
import { getUserPlaylists } from "../api/spotify.service";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { PlaylistCard, PlaylistWrapper } from "../styled/Card";
import { Heading, Container, Stack, Text } from "../styled/Shared";
import { Playlist } from "../utils/dts";

const PlaylistSelect = () => {
  const [playlists, setPlaylists] = React.useState<Playlist>();
  const [isFetchLoading, setIsFetchLoading] = React.useState<boolean>(false);
  const history = useHistory();

  React.useEffect(() => {
    const fetchUserPlaylists = async (): Promise<void> => {
      try {
        setIsFetchLoading(true);
        const { data } = await getUserPlaylists();
        const playlistData: Playlist = {
          total: data.total,
          items: data.items,
        };
        setPlaylists(playlistData);
        setIsFetchLoading(false);
        console.log({ playlistData });
      } catch (error) {
        setIsFetchLoading(false);
        console.log(error);
      }
    };

    fetchUserPlaylists();
  }, []);

  return (
    <Container>
      {isFetchLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Stack
            start
            style={{
              marginTop: "60px",
              height: "80vh",
              overflowY: "scroll",
            }}
            className='playlist_scroll'
          >
            <Heading size={52} style={{ alignSelf: "flex-start" }}>
              Choose a <span style={{ color: "#00d41c" }}> playlist.</span>
            </Heading>
            <Text fontSize='24px' bold>
              Total:{" "}
              <span style={{ color: "#00d41c" }}>{playlists?.total}</span>
            </Text>
            <Stack isInline wrap>
              {playlists?.items.map((item, idx) => (
                <PlaylistWrapper
                  key={idx}
                  onClick={() => history.push(`/quiz/playlist/${item.id}`)}
                >
                  <PlaylistCard>
                    <img src={item.images?.[0]?.url}></img>
                    <Stack start style={{ marginLeft: "10px" }}>
                      <Text fontSize='20px' bold>
                        {item.name}
                      </Text>
                      <Text fontSize='18px' style={{ marginTop: "10px" }}>
                        {item.owner?.display_name} |
                        <span style={{ color: "#00d41c" }}>
                          {" "}
                          {item.tracks?.total} tracks
                        </span>
                      </Text>
                    </Stack>
                  </PlaylistCard>
                </PlaylistWrapper>
              ))}
            </Stack>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default PlaylistSelect;
