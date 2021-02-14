import React, { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, CardContent } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import allStyles from "../styles";

export const CardOne = memo(({ card: { id, text }, index, onRemoveCard }) => {
  const classes = allStyles();
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Card
          className={classes.card}
          key={id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <RemoveIcon
            className={classes.cardRemoveButton}
            onClick={() => onRemoveCard(id)}
          />
          <CardContent>{text}</CardContent>
        </Card>
      )}
    </Draggable>
  );
});
