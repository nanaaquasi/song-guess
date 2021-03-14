import React from "react";
import { useParams } from "react-router";
import {
  getSeveralTracks,
  getTracksFromPlaylist,
} from "../api/spotify.service";
import { Image, Track, TrackItem } from "../utils/dts";
import { shuffleItems } from "../utils/services";

type Params = {
  id: string;
};

const Quiz = () => {
  const params: Params = useParams();
  const [isFetchLoading, setIsFetchLoading] = React.useState<boolean>(false);
  const [tracks, setTracks] = React.useState<Track[]>([]);

  React.useEffect(() => {
    console.log(params);

    const fetchTracksFromPlaylist = async (): Promise<void> => {
      try {
        setIsFetchLoading(true);
        const { data } = await getTracksFromPlaylist(params.id);
        console.log("tracks", data);
        const { items } = data;

        const shuffledTracks = shuffleItems(items).slice(0, 10);

        setTracks(shuffledTracks);
      } catch (error) {
        setIsFetchLoading(false);
      }
    };

    fetchTracksFromPlaylist();
  }, [params?.id]);
  return <div>Quiz page.</div>;
};

export default Quiz;
