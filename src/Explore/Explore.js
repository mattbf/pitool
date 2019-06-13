import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import {
  Menu,
  Inbox,
  Mail,
  UnfoldMore,
  UnfoldLess,
  ChevronLeft,
  ChevronRight,
  SubdirectoryArrowRight,
  Close,
} from '@material-ui/icons';

const drawerWidth = 240;
const appBarHeight = 100;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: appBarHeight,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  closeTree: {

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: appBarHeight + theme.spacing(2),
    padding: theme.spacing(2),
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  fullpaper: {
    width: '100%',
    height: '100%',
  }
}));

const WhiteCheckbox = withStyles({
  root: {
    color: '#FFF',
    '&$checked': {
      color: 'secondary',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);


export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [collapse, setCollapse] = React.useState(false);
  const [outputView, setOutputView] = React.useState(true);
  const [trendView, setTrendView] = React.useState(true);

  const [view, setView] = React.useState({
    trend: true,
    output: true,
  });

  const trendNum = view.trend && view.output ? 9 : view.trend && !view.output ? 12 : 6
  const outputNum = view.trend && view.output ? 3 : !view.trend && view.output ? 12 : 6

  const selectView = name => event => {
    setView({ ...view, [name]: event.target.checked });
  };

  function handleToggleTree() {
    setOpen(!open);
  }
  function handleCollapse() {
    setCollapse(!collapse);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleToggleTree}
            edge="start"
            className={clsx(classes.menuButton, open && classes.closeTree)}
          >
            {open ? <Close /> : <SubdirectoryArrowRight /> }
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <FormGroup row>
             <FormControlLabel
               control={
                 <WhiteCheckbox
                   checked={view.output}
                   onChange={selectView('output')}
                   value="output"
                   color="secondary"
                 />
               }
               label="Output"
             />
             <FormControlLabel
               control={
                 <WhiteCheckbox
                    checked={view.trend}
                    onChange={selectView('trend')}
                    value="trend"
                    color="secondary"
                  />
               }
               label="Trend"
             />
          </FormGroup>
          // {view.trend.toString()}
          // {view.output.toString()}
          // {trendNum.toString()}
          // {outputNum.toString()}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton size="small" onClick={handleCollapse}>
            {collapse ? <UnfoldLess /> : <UnfoldMore />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div className={classes.root}>
          <Grid container spacing={3}>
            {view.output ?
              <Grid item xs={12} sm={outputNum} md={outputNum}>
                <Paper className={classes.fullpaper}> Output </Paper>
              </Grid>
              :
              null
            }
            {view.trend ?
              <Grid item xs={12} sm={trendNum} md={trendNum}>
                <Paper className={classes.fullpaper}> Trend </Paper>
              </Grid>
              :
              null
            }
          </Grid>
        </div>
      </main>
    </div>
  );
}
