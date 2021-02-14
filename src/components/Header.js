import React, { memo } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import allStyles from "../styles";

export const Header = memo(({ columns, onRemoveColumn, onAddColumn }) => {
  const classes = allStyles();
  return (
    <Grid container className={classes.container}>
      {columns.map((column, index) => {
        return (
          <Box component="div" className={classes.header} key={column.id}>
            <Box
              component="span"
              color={column.headerColorBull}
              className={classes.bullet}
            >
              •
            </Box>
            <Typography
              subtitle1="h2"
              component="h2"
              className={classes.headerTitle}
            >
              {column.title}
            </Typography>

            <Box className={classes.headerActions}>
              {columns.length > 1 && (
                <RemoveIcon
                  className={classes.headerButton}
                  onClick={() => onRemoveColumn(column.id)}
                />
              )}
              {index === columns.length - 1 && (
                <AddIcon
                  className={classes.headerButton}
                  onClick={onAddColumn}
                />
              )}
            </Box>
          </Box>
        );
      })}
    </Grid>
  );
});
