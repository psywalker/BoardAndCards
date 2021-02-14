import { nanoid } from "nanoid";
import { fakeTitle, fakeText } from "./data";

const bullColors = [
  "#1AAB04",
  "#A3AA0E",
  "#A5640B",
  "#A43A13",
  "#A4000D",
  "#A40078",
  "#5E00A6",
  "#1F00A6",
  "#143BA6",
  "#8EA88D"
];
export const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const createColumns = (countColumns) => {
  let columns = [];
  for (let i = 0; i < countColumns; i++) {
    let cards = [];
    const countCards = randomInteger(2, 5);
    const columnTitle = fakeTitle[randomInteger(0, fakeTitle.length - 1)];
    const columnId = nanoid(5);
    for (let k = 0; k < countCards; k++) {
      const cardText = fakeText[randomInteger(0, fakeText.length - 1)];
      const cardId = nanoid(5);
      cards = [
        ...cards,
        {
          id: cardId,
          text: cardText
        }
      ];
    }
    columns = [
      ...columns,
      {
        id: columnId,
        title: columnTitle,
        headerColorBull: bullColors[randomInteger(0, bullColors.length - 1)],
        cards,
        isCanAddCard: !!randomInteger(0, 1)
      }
    ];
  }
  return columns;
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const handleMoveValidation = (from, to, columns) => {
  let columnFromIndex;
  let columnToIndex;

  columns.forEach((column, index) => {
    if (column.id === from) columnFromIndex = index;
    if (column.id === to) columnToIndex = index;
  });

  const isMoveFlag =
    columnFromIndex < columnToIndex
      ? columnToIndex - columnFromIndex
      : columnFromIndex - columnToIndex;

  if (isMoveFlag > 1) return false;
  return true;
};

const getList = (id, columns) =>
  columns.filter((column) => column.id === id)[0].cards;

export const onDragEnd = (result, columns) => {
  const { source, destination } = result;
  const columnFrom = source.droppableId;
  const columnTo = destination.droppableId;
  const isMove = handleMoveValidation(columnFrom, columnTo, columns);
  if (!isMove) return columns;

  if (source.droppableId === destination.droppableId) {
    const cards = reorder(
      getList(source.droppableId, columns),
      source.index,
      destination.index
    );

    const newColumns = columns.map((column) => {
      if (column.id === source.droppableId) return { ...column, cards };
      return column;
    });
    return newColumns;
  } else {
    const moveResult = move(
      getList(source.droppableId, columns),
      getList(destination.droppableId, columns),
      source,
      destination
    );

    const newColumns = columns.map((column) => {
      if (column.id === source.droppableId) {
        return { ...column, cards: moveResult[source.droppableId] };
      } else if (column.id === destination.droppableId) {
        return {
          ...column,
          cards: moveResult[destination.droppableId]
        };
      }
      return column;
    });
    return newColumns;
  }
};
export const onRemoveColumn = (id, columns) => [
  ...columns.filter((column) => column.id !== id)
];

export const onAddColumn = (columns) => [...columns, ...createColumns(1)];
export const onAddCard = (id, columns) => {
  const cardText = fakeText[randomInteger(0, fakeText.length - 1)];
  const cardId = nanoid(5);

  return columns.map((column) => {
    if (column.id === id)
      return {
        ...column,
        cards: [
          ...column.cards,
          {
            id: cardId,
            text: cardText
          }
        ]
      };
    return column;
  });
};
export const onRemoveCard = (id, columns) =>
  columns.map((column) => {
    const cards = column.cards.filter((card) => card.id !== id);
    return { ...column, cards };
  });
