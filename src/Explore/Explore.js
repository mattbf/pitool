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
  Box,
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
    height: '100vh',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: appBarHeight,
  },
  toolbar: {
    padding: '0px',
    height: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
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
    marginTop: appBarHeight,
    border: 'solid',
    borderColor: '#ff4578',
    height: '100%' - appBarHeight,
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
    border: 'solid',
    borderColor: '#00C888',
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',

  },
  barControls: {
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    padding: theme.spacing(0),
  },
  fullgrid: {
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
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleToggleTree}
            edge="start"
            className={clsx(classes.menuButton, open && classes.closeTree)}
          >
            {open ? <Close /> : <SubdirectoryArrowRight /> }
          </IconButton>
          <div className={classes.searchWrapper}>
            <Typography variant="h6" noWrap>
              Explore
            </Typography>
          </div>
          <div className={classes.barControls}>
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
          </div>
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

        <div>
          <Grid container spacing={0} className={classes.fullgrid}>
            {view.output ?
              <Grid item xs={12} sm={outputNum} md={outputNum} className={classes.fullgrid}>
                <Box className={classes.fullpaper}> Output </Box>
              </Grid>
              :
              null
            }
            {view.trend ?
              <Grid item xs={12} sm={trendNum} md={trendNum} className={classes.fullgrid}>
                <Box className={classes.fullpaper}> Trend </Box>
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
