import React from "react";
import { useParams } from "react-router";

import {
  getSeveralTracks,
  getTracksFromPlaylist,
} from "../api/spotify.service";
import lottie from "lottie-web";

import { Button, Container, Heading, Stack } from "../styled/Shared";
import { Image, Track, TrackItem } from "../utils/dts";
import { shuffleItems } from "../utils/services";
import Loader from "../components/Loader";
import CardOption from "../components/CardOption";
import styled from "styled-components";
import Challenge from "../components/Challenge";
import CustomModal from "../components/CustomModal";
import { useWindowDimensions } from "../utils/hooks";

type Params = {
  id: string;
};

const Quiz = () => {
  const params: Params = useParams();
  const [isFetchLoading, setIsFetchLoading] = React.useState<boolean>(false);
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
  const [options, setOptions] = React.useState<Track[]>([
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
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(1);
  const [currentTrack, setCurrentTrack] = React.useState<Track>({
    added_at: "",
    track: {
      artists: [],
      album: {
        href: "",
      },
    },
  });

  const showCurrent = (current: number) => {
    setCurrentQuestion(current + 1);
  };

  const { width } = useWindowDimensions();

  React.useEffect(() => {
    console.log(params);

    lottie.loadAnimation({
      container: document.getElementById("player") as Element,
      autoplay: false,
      path:
        "https://srv-store3.gofile.io/download/vBWKZi/46f70f435376e76c9fe97dd89fdf6ef3/lf30_editor_1zulbsra.json",
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

        const shuffledTracks = shuffleItems(items);

        shuffledTracks && setTracks(shuffledTracks);

        setIsFetchLoading(false);
      } catch (error) {
        setIsFetchLoading(false);
      }
    };

    fetchTracksFromPlaylist();
  }, [params?.id]);
  return (
    <Container>
      <Stack>
        <Stack
          spaceBetween
          margin={`${
            width <= 700 ? "2rem auto 0 auto !important" : "0rem auto 0 auto"
          }`}
        >
          <Heading size={72}>{currentQuestion}.</Heading>
        </Stack>
        <div
          className='player'
          id='player'
          style={{
            transform: "scale(1.1)",
            marginTop: "-14rem",
          }}
        ></div>
        {isFetchLoading ? (
          <Loader />
        ) : (
          <Challenge tracks={tracks} increaseCount={showCurrent} />
        )}
      </Stack>
    </Container>
  );
};

export default Quiz;
