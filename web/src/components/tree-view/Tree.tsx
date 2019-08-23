import values from 'lodash/values'
import React, { useEffect, useReducer } from 'react'
import TreeNode from './TreeNode'
import TreeReducer, {
  Actions,
  NodeActions,
  NodeType,
} from '../../components/tree-view/TreeReducer'
import SearchTree from './SearchTree'

export type TreeNodeData = {
  nodeId: string
  type: NodeType
  isOpen: boolean
  title: string
  isRoot: boolean
  isHidden?: boolean
  children?: string[]
}

type TreeProps = {
  children: Function
  tree: object
  onNodeSelect?: (node: TreeNodeData) => TreeNodeData
}

export default (props: TreeProps) => {
  const [state, dispatch] = useReducer(TreeReducer, props.tree)

  useEffect(() => {
    dispatch(Actions.setNodes(props.tree))
  }, [props.tree])

  const handleSearch = (term: string) => dispatch(Actions.filterTree(term))

  const rootNodes = values(state).filter((node: TreeNodeData) => node.isRoot)

  return (
    <>
      <SearchTree onChange={handleSearch} />
      {rootNodes
        .filter((node: TreeNodeData) => !node.isHidden)
        .map((node: TreeNodeData) => {
          return (
            <TreeNode
              key={node.nodeId}
              level={0}
              nodeId={node.nodeId}
              nodes={state}
              NodeRenderer={props.children}
              onNodeSelect={props.onNodeSelect}
            />
          )
        })}
    </>
  )
}
