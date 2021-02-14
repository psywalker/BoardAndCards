import React, { useState, memo } from "react";
import { Grid } from "@material-ui/core";
import { Column } from "./Column";
import { Header } from "./Header";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  createColumns,
  onDragEnd,
  onRemoveColumn,
  onAddColumn,
  onAddCard,
  onRemoveCard
} from "../utils";
import allStyles from "../styles";

const COLUMN_COUNTS = 3;

export const Board = memo(() => {
  const [columns, setColumns] = useState(createColumns(COLUMN_COUNTS));
  const [fromTo, setFromTo] = useState({});
  const [lastCardId, setLastCardId] = useState({});
  const classes = allStyles();
  const handleOnDragEnd = (result) => {
    setColumns(onDragEnd(result, columns));
    const newFromTo = {
      from: result.source.droppableId,
      to: result.destination.droppableId,
      cardId: result.draggableId
    };
    setFromTo(newFromTo);
  };
  const handleOnRemoveColumn = (id) => setColumns(onRemoveColumn(id, columns));
  const handleOnAddColumn = () => setColumns(onAddColumn(columns));
  const handleOnAddCard = (id) => {
    setColumns(onAddCard(id, columns));
    setLastCardId(id);
  };
  const handleOnRemoveCard = (id) => setColumns(onRemoveCard(id, columns));

  const header = (
    <Header
      columns={columns}
      onRemoveColumn={handleOnRemoveColumn}
      onAddColumn={handleOnAddColumn}
    />
  );
  const cols = (
    <Grid
      container
      className={classes.container}
      direction="row"
      justify="space-evenly"
      alignItems="stretch"
    >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {columns.map((column) => (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided) => (
              <Column
                key={column.id}
                innerRef={provided.innerRef}
                column={column}
                provided={provided}
                onAddCard={handleOnAddCard}
                onRemoveCard={handleOnRemoveCard}
                fromTo={fromTo}
                lastCardId={lastCardId}
              />
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </Grid>
  );

  return (
    <>
      {header}
      {cols}
    </>
  );
});
