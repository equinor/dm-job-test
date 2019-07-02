import React from 'react';
import { FaFile, FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import last from 'lodash/last';
import PropTypes from 'prop-types';
import ContextMenu from "../components/context-menu/ContextMenu";

const getPaddingLeft = (level, type) => {
  let paddingLeft = level * 20;
  if (type === 'file') paddingLeft += 20;
  return paddingLeft;
};

//@todo fix hover when contextMenu is open. https://codepen.io/Iulius90/pen/oLaNoJ
const StyledTreeNode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  padding-left: ${props => getPaddingLeft(props.level, props.type)}px;

  &:hover {
    background: lightgray;
  }
`;

const NodeIcon = styled.div`
  font-size: 12px;
  margin-right: ${props => props.marginRight ? props.marginRight : 5}px;
`;

const NodeButton = styled.button`
  background-color: whitesmoke;
`;

const getNodeLabel = (node) => last(node.path.split('/'));

const TreeNode = (props) => {
  const {
    node,
    getChildNodes,
    level,
    onToggle,
    onNodeSelect,
    addPackage,
    addFile,
  } = props;

  const path = `${node.path}`;

  return (
    <React.Fragment>
      <StyledTreeNode level={level} type={node.type} onClick={() => onToggle(node)}>
        <NodeIcon>
          {node.type === 'folder' && (node.isOpen ? <FaChevronDown /> : <FaChevronRight />)}
        </NodeIcon>

        <NodeIcon marginRight={10}>
          {node.type === 'file' && <FaFile />}
          {node.type === 'folder' && node.isOpen === true && <FaFolderOpen />}
          {node.type === 'folder' && !node.isOpen && <FaFolder />}
        </NodeIcon>

        <span role="button" onClick={() => onNodeSelect(node)}>
          {node.type === 'folder' && <ContextMenu id={path} menuItems={[
            { action: 'add-package', onClick: () => addPackage(node), label: 'Add Package' },
            { action: 'add-file', onClick: () => addFile(node), label: 'Add File' },
          ]}>{getNodeLabel(node)}</ContextMenu>}
          {node.type === 'file' && getNodeLabel(node)}
          {/*{ node.type === 'folder' &&  <NodeButton onClick={() => addPackage(node) }>P</NodeButton> }*/}
          {/*{ node.type === 'folder' &&  <NodeButton onClick={() => addFile(node) }>F</NodeButton> }*/}
        </span>
      </StyledTreeNode>

      {node.isOpen && getChildNodes(node).map(childNode => {
        return (
          <TreeNode
            {...props}
            node={childNode}
            level={level + 1}
          />
        )
      })}
    </React.Fragment>
  );
}

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  getChildNodes: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
  onNodeSelect: PropTypes.func.isRequired,
};

TreeNode.defaultProps = {
  level: 0,
};

export default TreeNode;