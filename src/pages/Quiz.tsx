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
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [currentTrack, setCurrentTrack] = React.useState<Track>({
    added_at: "",
    track: {
      artists: [],
      album: {
        href: "",
      },
    },
  });

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

        const shuffledTracks = shuffleItems(items).slice(0, 20);

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
        <Stack spaceBetween>
          <Heading size={72}>1.</Heading>
        </Stack>
        <div
          id='player'
          style={{
            transform: "scale(1.5)",
            marginTop: "-10rem",
          }}
        ></div>
        <Challenge tracks={tracks} />
      </Stack>
    </Container>
  );
};

export default Quiz;
