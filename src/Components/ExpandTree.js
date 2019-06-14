import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeNode from './TreeNode.js';

import {
  IconButton,
  Button,
  Typography
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
}));


const treeData = [
  {
    title: 'Parent Folder',
    key: '0',
    children: [
      {
        title: 'Secondary Folder',
        key: '0-0',
        children: [
          { title: 'title 1', key: '0-0-0' },
          { title: 'title 2', key: '0-0-1' },
          { title: 'title 3', key: '0-0-2' },
        ],
      },
      {
        title: 'Second Folder 2',
        key: '0-1',
        children: [
          { title: 'Tertiary Folder', key: '0-1-0' },
        ],
      },
    ],
  },
  {
    title: 'Parent Folder 2',
    key: '1',
    children: [
      {
        title: 'Secondary Folder',
        key: '1-0',
        children: [
          { title: 'title 1', key: '1-0-0' },
          { title: 'title 2', key: '1-0-1' },
          { title: 'title 3', key: '1-0-2' },
        ],
      },
      {
        title: 'Second Folder 2',
        key: '1-1',
        children: [
          { title: 'Tertiary Folder', key: '1-1-0' },
        ],
      },
    ],
  },
];

function ExpandTree() {
  const classes = useStyles();
  const [state, setState] = useState({
    expandedKeys: ['0', '0-0'],
    selectedKey: [],
  });

  function onExpand(expandedKeys) {
    setState({
      expandedKeys,
    });
  };

  function onSelect(selectedKey, info) {
    setState({ selectedKey });
  };

  const renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={item.title}
            key={item.key}
            dataRef={item}
            icon={({ selected }) =>
              selected ? <Add fontSize="inherit"/> : <Remove fontSize="inherit"/>
            }
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

    return (
      <div>
        {renderTreeNodes(treeData)}
      </div>
    );
}

export default ExpandTree
