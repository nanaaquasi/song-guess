import React, { FC } from "react";
import { TrackCard } from "../styled/Card";
import { Stack, Text } from "../styled/Shared";

type OptionProps = {
  cover?: string;
  title?: string;
  artist?: string;
  id?: string;
  selected?: string;
};

const CardOption: FC<OptionProps> = (props: OptionProps) => {
  return (
    <TrackCard selected={props.selected === props.id}>
      <Stack isInline>
        <img src={props.cover}></img>
        <Stack start>
          <Text color='greenyellow' fontSize='18px'>
            {props.artist}
          </Text>
          <Text
            bold
            fontSize='18px'
            style={{ marginTop: "5px", textAlign: "start" }}
          >
            {props.title}
          </Text>
        </Stack>
      </Stack>
    </TrackCard>
  );
};

export default CardOption;
