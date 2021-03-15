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

type ChallengeProps = {
  tracks: Track[];
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
    margin: 6rem auto 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
  }
`;

type QuizOptions = {
  answer: Track;
  options: Track[];
};

type QuizStatus = "correct" | "wrong";

const Challenge: FC<ChallengeProps> = ({ tracks }: ChallengeProps) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [currentTrack, setCurrentTrack] = React.useState<Track>(
    tracks[currentIndex]
  );
  const currentAudio = new Audio(tracks[currentIndex].track?.preview_url);
  const [playState, setPlayState] = React.useState<PlayState>("initial");
  const [selected, setSelected] = React.useState<string>("");
  const [status, setStatus] = React.useState<QuizStatus>("wrong");
  const [isOpen, setOpenModal] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<QuizOptions>({
    options: [],
    answer: {
      added_at: "",
      track: {},
    },
  });

  const handleOnSelectSong = (id: string) => {
    if (playState === "playing" || playState === "paused") {
      setSelected(id);
      id === options.answer.track.id
        ? setStatus("correct")
        : setStatus("wrong");
      setOpenModal(true);
      console.log("Selected", id, options.answer.track.id);
    }
  };

  React.useEffect(() => {
    console.log(tracks);

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
  }, [tracks, currentIndex]);

  currentAudio.addEventListener("timeupdate", () => {
    if (Math.floor(currentAudio.currentTime) === 7) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      lottie.stop("player");
    }
  });

  const playSound = () => {
    console.log(playState);
    if (playState === "paused" || playState === "initial") {
      currentAudio.play();
      lottie.play("player");
      setPlayState("paused");
    } else {
      currentAudio.pause();
      setPlayState("playing");
    }
  };

  const stopPlay = () => {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    lottie.stop("player");
    setPlayState("paused");
  };

  const handleNextSong = () => {
    setOpenModal(false);
    currentAudio.pause();
    currentAudio.currentTime = 0;
    lottie.stop("player");
    setPlayState("paused");
    setCurrentIndex(Math.floor(Math.random() * tracks.length) + 1);
  };

  return (
    <Stack center>
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
