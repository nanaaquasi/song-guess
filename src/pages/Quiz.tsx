import React from "react";
import { useParams } from "react-router";
import lottie from "lottie-web";
import {
  getSeveralTracks,
  getTracksFromPlaylist,
} from "../api/spotify.service";
import { Button, Container, Heading, Stack } from "../styled/Shared";
import { Image, Track, TrackItem } from "../utils/dts";
import { shuffleItems } from "../utils/services";
import Loader from "../components/Loader";

type Params = {
  id: string;
};

type PlayState = "initial" | "playing" | "paused";

const Quiz = () => {
  const params: Params = useParams();
  const [isFetchLoading, setIsFetchLoading] = React.useState<boolean>(false);
  const [playState, setPlayState] = React.useState<PlayState>("initial");
  const [tracks, setTracks] = React.useState<Track[]>([
    {
      added_at: "",
      track: {
        artists: [],
        album: {
          href: "",
        },
      },
    },
  ]);
  const [options, setOptions] = React.useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  // const [currentAudio, setCurrentAudio] = React.useState<HTMLAudioElement>();

  const currentAudio = new Audio(tracks[currentIndex].track?.preview_url);

  const playerRef = React.useRef<HTMLDivElement>(null);

  const checkCurrentPlayingTime = () => {
    if (playState == "playing" && currentAudio?.currentTime === 7) {
      currentAudio?.pause();
    }
  };

  const playSound = () => {
    if (playState !== "playing") {
      setPlayState("playing");
      lottie.play("player");
      currentAudio.play();
    }
  };

  const stopPlay = () => {
    console.log("state", playState);

    if (playState === "playing") {
      currentAudio.pause();
      currentAudio.currentTime = 0;

      lottie.stop("player");
      currentAudio.src = "";
    }
    setPlayState("paused");
  };

  React.useEffect(() => {
    console.log(params);

    lottie.loadAnimation({
      container: document.getElementById("player") as Element,
      autoplay: false,
      path: "https://assets6.lottiefiles.com/packages/lf20_pzrstZ.json",
      name: "player",
      renderer: "svg",
      loop: true,
    });

    const fetchTracksFromPlaylist = async (): Promise<void> => {
      try {
        setIsFetchLoading(true);
        const { data } = await getTracksFromPlaylist(params.id);
        console.log("tracks", data);
        const { items } = data;

        const shuffledTracks = shuffleItems(items).slice(0, 10);

        setTracks(shuffledTracks);

        setIsFetchLoading(false);
      } catch (error) {
        setIsFetchLoading(false);
      }
    };

    fetchTracksFromPlaylist();

    // console.log(tracks[0])

    // setCurrentAudio(new Audio(currentTrack.track?.preview_url));
    // currentAudio?.load();

    // console.log(currentTrack);
  }, [params?.id]);
  return (
    <Container>
      <Stack>
        <Stack spaceBetween>
          <Heading size={72}>1.</Heading>
        </Stack>
        <Stack center>
          <div
            id='player'
            ref={playerRef}
            style={{
              transform: "scale(1.5)",
              marginTop: "-10rem",
            }}
          ></div>
          <Stack isInline center margin='-6rem 0'>
            <Button onClick={playSound}>Play</Button>
            <Button
              onClick={stopPlay}
              type='secondary'
              style={{ marginLeft: "1rem" }}
            >
              Stop
            </Button>
          </Stack>
          <Stack center margin='8rem 0'>
            {currentAudio?.currentTime}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Quiz;
