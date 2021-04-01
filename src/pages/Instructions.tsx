import React from "react";
import lottie from "lottie-web";
import { Button, Container, Heading, Stack, Text } from "../styled/Shared";

import { useWindowDimensions } from "../utils/hooks";
import Challenge from "../components/Challenge";
import {
  generateCorrectMessages,
  generateRandColor,
  generateWrongMessages,
  getRandom,
  TEST_TRACKS,
  Track,
  TrackItem,
} from "../utils/dts";
import styled from "styled-components";
import { shuffleItems } from "../utils/services";
import CardOption from "../components/CardOption";
import CustomModal from "../components/CustomModal";
import { AnswerCard } from "../styled/Card";
import { useHistory } from "react-router";
import { motion } from "framer-motion";

const OptionsContainer = styled.div`
  width: 80%;
  margin: 5rem auto 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-gap: 1rem;

  @media (max-width: 700px) {
    width: 100%;
    margin: 6rem auto 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
`;

const CORRECT_SHORTEST_TIME_SCORE = 100;
const CORRECT_LONGEST_TIME_SCORE = 70;
const CORRECT_STREAK_SCORE = 120;

type Scores = {
  total: number;
  newScore: number;
};

type QuizStatus = "correct" | "wrong" | "none";

type QuizOptions = {
  answer: Track;
  options: Track[];
};

type PlayState = "initial" | "playing" | "paused";

const Instructions = () => {
  const { width } = useWindowDimensions();
  const [playState, setPlayState] = React.useState<boolean>(false);
  const [playingState, setPlayingState] = React.useState<PlayState>("initial");

  const [show, setShow] = React.useState<boolean>(true);
  const [totalScore, setTotalScore] = React.useState<Scores>({
    total: 0,
    newScore: 0,
  });

  const [step, setStep] = React.useState<number>(1);
  const [status, setStatus] = React.useState<QuizStatus>("none");
  const [isOpen, setOpenModal] = React.useState<boolean>(false);
  const [OPTIONS, setOptions] = React.useState<QuizOptions>({
    options: [],
    answer: {
      added_at: "",
      track: {},
    },
  });

  const history = useHistory();

  React.useEffect(() => {
    setPlayingState("initial");

    lottie.loadAnimation({
      container: document.getElementById("player-2") as Element,
      autoplay: false,
      path: "https://assets5.lottiefiles.com/packages/lf20_biqx8wpr.json",
      name: "player",
      renderer: "svg",
      loop: true,
    });

    setOptions({
      answer: TEST_TRACKS[0],
      options: shuffleItems([
        TEST_TRACKS[0],
        ...getRandom(
          TEST_TRACKS.filter(
            (track) => track.track.id !== TEST_TRACKS[0].track.id
          ),
          3
        ),
      ]),
    });
  }, []);

  const audioRef = React.useRef<HTMLAudioElement>(null!);

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current?.paused && !playState) {
        audioRef.current?.play();
        setShow(false);
        setStep(1);
        setPlayState(true);
      } else {
        setPlayState(false);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  if (audioRef.current !== null) {
    audioRef.current.onplaying = function () {
      lottie.play("player");
      setPlayingState("playing");
    };
    audioRef.current.onpause = function () {
      lottie.stop("player");
      setPlayingState("paused");
    };
  }

  const handleOnSelectSong = (id: string) => {
    if (playingState === "playing" || playingState === "paused") {
      if (audioRef.current) audioRef.current.pause();
      id === OPTIONS.answer.track.id
        ? handleCorrectChoice(Math.floor(audioRef.current?.currentTime))
        : handleWrongChoice(Math.floor(audioRef.current?.currentTime));
    }
  };

  const handleCorrectChoice = (time: number): void => {
    setStatus("correct");
    setOpenModal(true);

    if (time >= 0 && time <= 3) {
      setTotalScore(
        (score): Scores => {
          return {
            total: score.total + CORRECT_SHORTEST_TIME_SCORE,
            newScore: CORRECT_SHORTEST_TIME_SCORE,
          };
        }
      );
    }

    if (time >= 3 && time <= 7) {
      setTotalScore(
        (score): Scores => {
          return {
            total: score.total + CORRECT_LONGEST_TIME_SCORE,
            newScore: CORRECT_LONGEST_TIME_SCORE,
          };
        }
      );
    }
  };

  const handleWrongChoice = (time: number): void => {
    setStatus("wrong");
    setOpenModal(true);
    setTotalScore(
      (score): Scores => {
        return {
          total: score.total + 0,
          newScore: 0,
        };
      }
    );
  };

  const firstStep = (
    <Stack start>
      <Text bold fontSize='18px' color='#80ff60'>
        Welcome to Guessify
      </Text>
      <Text style={{ textAlign: "start", margin: "1rem 0" }}>
        Start game by clicking on play to listen to song
      </Text>
    </Stack>
  );

  const secondStep = (
    <Stack start>
      <Text bold fontSize='18px' color='#80ff60'>
        Got it?
      </Text>
      <Text style={{ textAlign: "start", margin: "1rem 0" }}>
        Select correct song from options or click play to listen again!
      </Text>
      <Text>
        <i>Hint: All of me</i>
      </Text>
    </Stack>
  );

  const nextStep = () => {
    setShow(true);
    setStep(2);
  };

  if (audioRef.current !== null) {
    audioRef.current?.addEventListener("timeupdate", () => {
      if (Math.floor(audioRef.current?.currentTime) === 7) {
        audioRef.current?.pause();
        audioRef.current.currentTime = 0;
        lottie.stop("player");
        setPlayState(false);
        nextStep();

        return;
      }
    });
  }

  return (
    <Container>
      <CustomModal isOpen={isOpen}>
        <AnswerCard bg={generateRandColor()}>
          <Stack start>
            <Text color='#fff' bold fontSize='36px'>
              {status === "correct"
                ? generateCorrectMessages() + "!"
                : generateWrongMessages() + "!"}
            </Text>
            <Text
              medium
              fontSize='18px'
              style={{ margin: "2rem 0", textAlign: "start" }}
            >
              Information about the song is displayed here
            </Text>

            <Text bold fontSize='24px' style={{ margin: "1rem 0 0 0" }}>
              Score: {totalScore.total} (+ {totalScore.newScore})
            </Text>
            <Stack isInline={width <= 700 ? false : true} start>
              <Text fontSize='18px' style={{ margin: ".5rem 0 2rem 0" }}>
                NB: Score depends on how fast you select song.
              </Text>
            </Stack>
            <Stack isInline={width <= 700 ? false : true} center>
              <img
                src={OPTIONS?.answer?.track?.album?.images?.[0]?.url}
                style={{ width: "150px" }}
              ></img>
              <Stack
                margin='1rem 1rem'
                start
                style={{ justifySelf: "start", alignSelf: "start" }}
              >
                <Text medium fontSize='20px'>
                  <span style={{ color: "#fff" }}>Song:</span>{" "}
                  {OPTIONS?.answer?.track?.name}
                </Text>
                <Text medium fontSize='20px' style={{ margin: "2rem 0" }}>
                  Artist: {OPTIONS?.answer?.track?.artists?.[0]?.name}
                </Text>

                <Text medium fontSize='20px'>
                  Album: {OPTIONS?.answer?.track?.album?.name}
                </Text>
              </Stack>
            </Stack>
            <Button
              type='tertiary'
              onClick={() => history.push("/welcome")}
              style={{ margin: "2rem 0", alignSelf: "center" }}
            >
              Complete Tutorial
            </Button>
            <Text medium fontSize='16px' style={{ alignSelf: "center" }}>
              Click on complete to quiz yourself!
            </Text>
          </Stack>
        </AnswerCard>
      </CustomModal>
      <Stack>
        <Stack
          isInline={width >= 700}
          spaceBetween
          margin={`${
            width <= 700 ? "2rem auto 0 auto !important" : "0rem auto 0 auto"
          }`}
        >
          <Heading size={36}>Example.</Heading>
          {show && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, ease: "backInOut" }}
              style={{
                background: "#00201d",
                display: "inline-block",
                padding: "2rem",
                marginTop: "2rem",
                width: `${width <= 700 ? "100%" : "500px"}`,
                borderRadius: "2rem",
              }}
            >
              {step == 1 ? firstStep : secondStep}
            </motion.div>
          )}
        </Stack>
        <div
          className='player'
          id='player-2'
          style={{
            transform: "scale(1.1)",
            marginTop: "-14rem",
          }}
        ></div>
      </Stack>
      <audio ref={audioRef} src={TEST_TRACKS[0]?.track.preview_url} />
      <Text
        style={{ margin: `${width <= 700 ? "-8rem 0" : "-10rem 0"}` }}
        color='#ccc'
        fontSize={width <= 700 ? "14px !important" : "16px"}
      >
        Note: Slow internet might delay song play!
      </Text>
      <Stack
        isInline
        center
        margin={width <= 700 ? "12rem 0 0 0" : "14rem 0 0 0"}
      >
        <Button onClick={() => togglePlay()}>
          {!playState ? "Play" : "Stop"}
        </Button>
      </Stack>

      <OptionsContainer>
        {OPTIONS?.options?.map((option) => (
          <div
            key={option.track?.id}
            onClick={() => handleOnSelectSong(option?.track?.id || "")}
          >
            <CardOption
              artist={option?.track?.artists?.[0]?.name}
              title={option?.track?.name}
              cover={option.track?.album?.images?.[0].url}
              id={option?.track?.id}
              selected={OPTIONS.answer?.track?.id}
            ></CardOption>
          </div>
        ))}
      </OptionsContainer>

      {/* <Challenge tracks={TEST_TRACKS} increaseCount={showCurrent} /> */}
    </Container>
  );
};

export default Instructions;
