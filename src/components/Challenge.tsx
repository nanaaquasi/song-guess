import React, { FC } from "react";
import {
  generateWrongMessages,
  generateCorrectMessages,
  generateRandColor,
  Image,
  Track,
  TrackItem,
  formatDate,
  getRandom,
} from "../utils/dts";
import Loader from "../components/Loader";
import CardOption from "../components/CardOption";
import { Button, Container, Heading, Stack, Text } from "../styled/Shared";
import lottie from "lottie-web";
import { shuffleItems } from "../utils/services";
import styled from "styled-components";
import CustomModal from "./CustomModal";
import { AnswerCard } from "../styled/Card";
import { useWindowDimensions } from "../utils/hooks";

type ChallengeProps = {
  tracks: Track[];
  increaseCount: (current: number) => void;
};
type PlayState = "initial" | "playing" | "paused";

const OptionsContainer = styled.div`
  width: 80%;
  margin: 10rem auto 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-gap: 1rem;

  @media (max-width: 700px) {
    width: 100%;
    margin: 12rem auto 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
`;

type QuizOptions = {
  answer: Track;
  options: Track[];
};

type QuizStatus = "correct" | "wrong" | "none";

const Challenge: FC<ChallengeProps> = ({
  tracks,
  increaseCount,
}: ChallengeProps) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [count, increaseQuesCount] = React.useState<number>(1);
  const [currentTrack, setCurrentTrack] = React.useState<Track>(
    tracks[currentIndex]
  );
  const currentAudio = new Audio(tracks[currentIndex].track?.preview_url);
  const [playState, setPlayState] = React.useState<PlayState>("initial");
  const [selected, setSelected] = React.useState<string>("");
  const [status, setStatus] = React.useState<QuizStatus>("none");
  const [isOpen, setOpenModal] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<QuizOptions>({
    options: [],
    answer: {
      added_at: "",
      track: {},
    },
  });

  const { width } = useWindowDimensions();

  React.useEffect(() => {
    console.log(tracks);
    setPlayState("initial");
    setStatus("none");

    setCurrentTrack(tracks[currentIndex]);

    tracks.length > 1 &&
      setOptions({
        answer: tracks[currentIndex],
        options: shuffleItems([
          tracks[currentIndex],
          ...getRandom(
            tracks.filter(
              (track) => track.track.id !== tracks[currentIndex].track.id
            ),
            3
          ),
        ]),
      });

    // console.log("count", count);
    // const timer = setTimeout(() => {
    //   if (status === "none") {
    //     setStatus("wrong");
    //     setOpenModal(true);
    //   }
    // }, 15000);
    // return () => clearTimeout(timer);
  }, [tracks, currentIndex, count]);

  currentAudio.addEventListener("timeupdate", () => {
    console.log(currentAudio.currentTime);
    if (Math.floor(currentAudio.currentTime) === 7) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      lottie.stop("player");
    }
  });

  const playSound = () => {
    console.log(playState);
    if (playState === "paused" || playState === "initial") {
      setPlayState("paused");
      currentAudio.play();
      lottie.play("player");
    } else {
      setPlayState("playing");
      currentAudio.pause();
    }
  };

  const stopPlay = () => {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    lottie.stop("player");
    setPlayState("paused");
  };

  const handleOnSelectSong = (id: string) => {
    if (playState === "playing" || playState === "paused") {
      console.log("timeee", currentAudio.currentTime, "id", id);
      setSelected(id);
      id === options.answer.track.id
        ? setStatus("correct")
        : setStatus("wrong");
      currentAudio.pause();
      currentAudio.currentTime = 0;

      setOpenModal(true);

      lottie.stop("player");
      console.log("Selected", id, options.answer.track.id);
    }
  };

  const handleNextSong = () => {
    setOpenModal(false);
    currentAudio.pause();
    currentAudio.currentTime = 0;
    lottie.stop("player");
    setPlayState("paused");
    increaseQuesCount(count + 1);
    increaseCount(count);
    setCurrentIndex(Math.floor(Math.random() * tracks.length - 1) + 1);
  };

  return (
    <Stack
      center
      margin={`${
        width <= 700 ? "6rem auto 0 auto !important" : "0rem auto 0 auto"
      }`}
    >
      <CustomModal isOpen={isOpen}>
        <AnswerCard bg={generateRandColor()}>
          <Stack start>
            <Text color='#fff' bold fontSize='42px'>
              {status === "correct"
                ? generateCorrectMessages() + "!"
                : generateWrongMessages() + "!"}
            </Text>
            <Text
              medium
              fontSize='24px'
              style={{ margin: "2rem 0", textAlign: "start" }}
            >
              This song was added to your playlist on{" "}
              {formatDate(options.answer.added_at)}{" "}
              {status === "wrong" && ", you should listen to it more!"}
            </Text>
            <Text bold fontSize='24px' style={{ margin: "2rem 0" }}>
              Score: 100
            </Text>
            <Stack isInline center>
              <img
                src={options?.answer?.track?.album?.images?.[0]?.url}
                style={{ width: "150px" }}
              ></img>
              <Stack
                margin='1rem 1rem'
                start
                style={{ justifySelf: "start", alignSelf: "start" }}
              >
                <Text medium fontSize='20px'>
                  <span style={{ color: "#fff" }}>Song:</span>{" "}
                  {options?.answer?.track?.name}
                </Text>
                <Text medium fontSize='20px' style={{ margin: "2rem 0" }}>
                  Artist: {options?.answer?.track?.artists?.[0]?.name}
                </Text>

                <Text medium fontSize='20px'>
                  Album: {options?.answer?.track?.album?.name}
                </Text>
              </Stack>
            </Stack>
            <Button
              type='tertiary'
              onClick={() => handleNextSong()}
              style={{ margin: "2rem 0", alignSelf: "center" }}
            >
              Next Song
            </Button>
          </Stack>
        </AnswerCard>
      </CustomModal>
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
      <OptionsContainer>
        {options?.options?.map((option) => (
          <div
            key={option.track?.id}
            onClick={() => handleOnSelectSong(option?.track?.id || "")}
          >
            <CardOption
              artist={option?.track?.artists?.[0]?.name}
              title={option?.track?.name}
              cover={option.track?.album?.images?.[0].url}
              id={option?.track?.id}
              selected={selected}
            ></CardOption>
          </div>
        ))}
      </OptionsContainer>
    </Stack>
  );
};

export default Challenge;
