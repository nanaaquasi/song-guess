import React from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { getSinglePlaylist } from "../api/spotify.service";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { Button, Container, Stack, Text } from "../styled/Shared";
import { PlaylistItem } from "../utils/dts";
import { useWindowDimensions } from "../utils/hooks";

type Score = {
  scores?: number;
};

type RouteState = {
  state: Score;
};

type RouteParams = {
  id?: string;
};

const ScoresPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [playlist, setPlaylist] = React.useState<PlaylistItem>();
  const {
    state: { scores },
  }: RouteState = useLocation();

  const params: RouteParams = useParams();
  const history = useHistory();

  const { width } = useWindowDimensions();

  React.useEffect(() => {
    const fetchPlaylist = async () => {
      setIsLoading(true);
      try {
        const { data } = await getSinglePlaylist(params.id || "");
        setIsLoading(false);
        setPlaylist(data);
        console.log(data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchPlaylist();
  }, []);

  return (
    <Container>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <Stack isInline={width <= 700 ? false : true} spaceBetween>
          <Stack
            start
            margin={`${width <= 700 ? "5rem 0 5rem 0" : "50px auto 0 60px"}`}
          >
            <Text
              color='#fff'
              bold
              fontSize='24px'
              style={{ margin: "0rem 0 0rem 0" }}
            >
              {playlist?.name} - {playlist?.owner?.display_name}
            </Text>
            <div
              style={{
                padding: "1rem",
                border: "2px solid #00550b",
                margin: `${width <= 700 ? "2rem auto" : "2rem 0 1rem 0"}`,
                // width: `${width <= 700 ? "100%" : "360px"}`,
              }}
            >
              <img
                style={{
                  width: `${width <= 700 ? "300px" : "360px"}`,
                  height: `${width <= 700 ? "300px" : "360px"}`,
                  margin: "0 auto",
                }}
                src={playlist?.images?.[0].url || ""}
              ></img>
            </div>

            <Text
              color='#1bf538'
              bold
              fontSize='24px'
              style={{
                margin: `${width <= 700 ? ".4rem 0 0 0" : ".4rem 0 0 0"}`,
              }}
            >
              {playlist?.tracks?.total} tracks
            </Text>
          </Stack>
          <Stack
            start={width <= 700 ? false : true}
            style={{ marginTop: "10px" }}
          >
            <Text
              color='#fff'
              bold
              fontSize={width <= 700 ? "24px !important" : "56px"}
            >
              Your score
            </Text>
            <Text
              color='#1bf538'
              bold
              fontSize={width <= 700 ? "60px !important" : "120px"}
            >
              {scores}
            </Text>
            <Button
              type='secondary'
              onClick={() => history.push("/welcome")}
              style={{
                alignSelf: "start",
                width: `${width <= 700 ? "100%" : "40%"}`,
                textAlign: "center",
                marginTop: "20px",
                fontSize: `${width <= 700 ? "18px !important" : "18px"}`,
              }}
            >
              Play again.
            </Button>
          </Stack>
        </Stack>
      )}
    </Container>
  );
};

export default ScoresPage;
