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
import { useHistory, useParams } from "react-router";
import { URLSearchParams } from "node:url";

type ChallengeProps = {
  tracks: Track[];
  increaseCount: (current: number) => void;
};

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

type QuizOptions = {
  answer: Track;
  options: Track[];
};

type Scores = {
  total: number;
  newScore: number;
};

type QuizStatus = "correct" | "wrong" | "none";

type PlayState = "initial" | "playing" | "paused";

type RouteParams = {
  id?: string;
};

const Challenge: FC<ChallengeProps> = ({
  tracks,
  increaseCount,
}: ChallengeProps) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [count, increaseQuesCount] = React.useState<number>(1);
  const [streaks, setStreaks] = React.useState<number>(0);
  const [playState, setPlayState] = React.useState<boolean>(false);
  const [playingState, setPlayingState] = React.useState<PlayState>("initial");

  const [audioSelectedTime, setAudiSelectTime] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState<Scores>({
    total: 0,
    newScore: 0,
  });
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

  const history = useHistory();

  const params: RouteParams = useParams();

  const audioRef = React.useRef<HTMLAudioElement>(null!);
  const { width } = useWindowDimensions();

  React.useEffect(() => {
    setStatus("none");
    setPlayingState("initial");

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

    if (count === 11) {
      history.push(`/scores/${params?.id}`, {
        scores: totalScore.total,
      });
    }
    // const timer = setTimeout(() => {
    //   if (status === "none") {
    //     setStatus("wrong");
    //     setOpenModal(true);
    //   }
    // }, 15000);
    // return () => clearTimeout(timer);
  }, [tracks, currentIndex, count]);

  if (audioRef.current !== null) {
    audioRef.current?.addEventListener("timeupdate", () => {
      if (Math.floor(audioRef.current?.currentTime) === 7) {
        audioRef.current?.pause();
        audioRef.current.currentTime = 0;
        lottie.stop("player");
        setPlayState(false);
        return;
      }
    });
  }

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

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current?.paused && !playState) {
        audioRef.current?.play();
        setPlayState(true);
      } else {
        setPlayState(false);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleOnSelectSong = (id: string) => {
    if (playingState === "playing" || playingState === "paused") {
      if (audioRef.current) audioRef.current.pause();

      setSelected(id);
      id === options.answer.track.id
        ? handleCorrectChoice(Math.floor(audioRef.current?.currentTime))
        : handleWrongChoice(Math.floor(audioRef.current?.currentTime));
    }
  };

  const handleCorrectChoice = (time: number): void => {
    setStatus("correct");
    setStreaks(streaks + 1);
    setOpenModal(true);

    if (time >= 0 && time <= 3) {
      setTotalScore(
        (score): Scores => {
          return {
            total:
              streaks >= 2
                ? score.total + CORRECT_STREAK_SCORE
                : score.total + CORRECT_SHORTEST_TIME_SCORE,
            newScore:
              streaks >= 2 ? CORRECT_STREAK_SCORE : CORRECT_SHORTEST_TIME_SCORE,
          };
        }
      );
    }

    if (time >= 3 && time <= 7) {
      setTotalScore(
        (score): Scores => {
          return {
            total:
              streaks >= 2
                ? score.total + CORRECT_STREAK_SCORE
                : score.total + CORRECT_LONGEST_TIME_SCORE,
            newScore:
              streaks >= 2 ? CORRECT_STREAK_SCORE : CORRECT_LONGEST_TIME_SCORE,
          };
        }
      );
    }
  };

  const handleWrongChoice = (time: number): void => {
    setStatus("wrong");
    setStreaks(0);
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

  const handleNextSong = () => {
    increaseQuesCount(count + 1);
    increaseCount(count);
    setCurrentIndex(Math.floor(Math.random() * tracks.length - 1) + 1);
    setOpenModal(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    lottie.stop("player");
    setPlayState(false);
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
            {streaks > 2 && (
              <>
                <Stack isInline={width <= 700 ? false : true} center>
                  <Text bold fontSize='24px' style={{ margin: ".5rem 0" }}>
                    Streaks {streaks}
                  </Text>
                  <img
                    src='https://img.icons8.com/emoji/48/000000/fire.png'
                    width='24px'
                  />
                </Stack>
              </>
            )}
            <Text bold fontSize='24px' style={{ margin: "2rem 0" }}>
              Score: {totalScore.total} (+ {totalScore.newScore})
            </Text>
            <Stack isInline={width <= 700 ? false : true} center>
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
      <audio ref={audioRef} src={tracks[currentIndex].track?.preview_url} />
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
