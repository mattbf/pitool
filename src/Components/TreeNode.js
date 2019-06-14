import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import {
  IconButton,
  Button,
  Typography,
} from '@material-ui/core';

import {
  Add,
  Remove,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  treeItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start'
  },
  actionbutton: {
    margin: theme.spacing(1),
    alignSelf: 'flex-end',
  }
}));

function TreeNode(item) {
  const classes = useStyles();
  const actions = true
  console.log(item)

  return(
    <div className={classes.treeItem}>
      <IconButton
        aria-label="expand"
        className={classes.margin}
        size="small"
      >
        <Add fontSize="inherit" /> {item.icon}
      </IconButton>
      <Typography variant="body2">{item.title}</Typography>
      {actions ?
        <Button size="small" className={classes.actionbutton}>
          Action
        </Button>
        :
        null
      }
    </div>
  )
}

export default TreeNode
