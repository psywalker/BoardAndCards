import React, { memo } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Grid } from "@material-ui/core";
import { CardOne } from "./CardOne";
import allStyles from "../styles";

export const Column = memo(
  ({
    onRemoveCard,
    onAddCard,
    provided,
    innerRef,
    column: { id, cards, isCanAddCard }
  }) => {
    const classes = allStyles();
    return (
      <Grid item className={classes.column} ref={innerRef}>
        {cards.map((card, index) => (
          <CardOne
            onRemoveCard={onRemoveCard}
            card={card}
            index={index}
            key={`${id}-${index}`}
          />
        ))}
        {provided.placeholder}
        {isCanAddCard && (
          <AddIcon
            className={classes.addCardButton}
            onClick={() => onAddCard(id)}
          />
        )}
      </Grid>
    );
  }
);
