// @ts-ignore
import values from 'lodash/values'
import * as React from 'react'
import TreeNode from './TreeNode'
import SearchTree from './SearchTree'
import { NodeType } from '../../utils/variables'

export enum NodeIconType {
  'file' = 'file',
  'blueprint' = 'blueprint',
  'folder' = 'folder',
  'database' = 'database',
  'laptop' = 'laptop',
  'ref' = 'ref',
  'default' = '',
}

export type NodeMetaData = {
  [key: string]: any
  isRootPackage?: boolean
  empty?: boolean
  isList?: boolean
  error?: boolean
  dataSource?: string
  hasCustomAction?: boolean
}

export type TreeNodeData = {
  nodeId: string
  nodeType: NodeType
  isOpen: boolean
  title: string
  isExpandable: boolean
  isRoot: boolean
  icon?: NodeIconType
  isHidden?: boolean
  isFolder: boolean
  templateRef?: string
  children?: string[]
  meta: NodeMetaData
  isLoading: boolean
}

export interface Tree {
  [key: string]: TreeNodeData
}

type TreeProps = {
  tree?: Tree
  render?: Function
  operations?: any
  state?: any
  children: Function
  dataSources?: string[]
}

type RootNode = { currentItem: TreeNodeData; level: number; track: never[] }[]

/**
 *
 * @param nodeId the current nodeId.
 * @param tree object with key,value:  [abs_node_path]: treeNodeData
 * @param path, number[]  list of levels down in the three.
 */
export const treeNodes = (
  nodeId: string,
  tree: any,
  path: any = [],
  track: any = []
): [] => {
  const node: any = tree[nodeId]

  const hasChildren = 'children' in node

  if (!hasChildren || !node.isOpen) {
    return []
  }

  return node.children.reduce((flat: [], childId: string, index: number) => {
    const currentPath: number[] = [...path, index]
    const currentItem: TreeNodeData = tree[childId]
    const currentTrack: string[] = [...track, node.title]

    if (!currentItem || !node.isOpen) {
      return []
    }

    if (currentItem.isOpen && 'children' in currentItem) {
      // iterating through all the children on the given level
      const children: [] = treeNodes(
        currentItem.nodeId,
        tree,
        currentPath,
        currentTrack
      )
      // append to the accumulator
      return [
        ...flat,
        {
          currentItem,
          path: currentPath,
          track: currentTrack,
          level: currentPath.length,
          parent: nodeId,
        },
        ...children,
      ]
    } else {
      // append to the accumulator, but skip children
      return [
        ...flat,
        {
          currentItem,
          path: currentPath,
          track: currentTrack,
          level: currentPath.length,
          parent: nodeId,
        },
      ]
    }
  }, [])
}

const getRootNodes = (rootNode: TreeNodeData, state: Tree) => [
  { currentItem: rootNode, level: 0, track: [] },
  ...treeNodes(rootNode.nodeId, state, []),
]

const sortRootNodes = (
  rootNodes: RootNode[],
  dataSources: string[] | undefined
) => {
  /*
    Sort root nodes (data sources) in the order defined in the application's settings.json.
    If this order cannot be used, sort alphabetically
   */

  if (dataSources && dataSources.length) {
    //sort in order defined in dataSources list

    rootNodes.sort((rootNodeA, rootNodeB) => {
      let dataSourceIndexA: number = rootNodeA.findIndex((element) => {
        return element['level'] === 0
      })
      let dataSourceIndexB: number = rootNodeB.findIndex((element) => {
        return element['level'] === 0
      })
      return (
        dataSources.indexOf(
          rootNodeA[dataSourceIndexA]['currentItem']['title']
        ) -
        dataSources.indexOf(rootNodeB[dataSourceIndexB]['currentItem']['title'])
      )
    })
    return rootNodes
  } else {
    //sort alphabetically

    if (!rootNodes.length) return rootNodes
    rootNodes.sort((rootNodeA, rootNodeB) => {
      let dataSourceIndexA: number = rootNodeA.findIndex((element) => {
        return element['level'] === 0
      })
      let dataSourceIndexB: number = rootNodeB.findIndex((element) => {
        return element['level'] === 0
      })
      if (
        rootNodeA[dataSourceIndexA]['currentItem']['title'] <
        rootNodeB[dataSourceIndexB]['currentItem']['title']
      )
        return -1
      else if (
        rootNodeA[dataSourceIndexA]['currentItem']['title'] >
        rootNodeB[dataSourceIndexB]['currentItem']['title']
      )
        return 1
      else return 0
    })
    return rootNodes
  }
}

export const Tree = (props: TreeProps) => {
  const { state, children, operations, dataSources } = props

  if (!state) {
    return null
  }

  const {
    addNode,
    addNodes,
    addChild,
    updateNode,
    removeNode,
    replaceNode,
    hasChild,
    toggle,
    search,
  } = operations
  const rootNodes = values(state)
    .filter((node: TreeNodeData) => node.isRoot)
    .filter((node: TreeNodeData) => !node.isHidden)
    .map((rootNode: any) => {
      return getRootNodes(rootNode, state)
    })

  return (
    <>
      <SearchTree onChange={search} />
      {sortRootNodes(rootNodes, dataSources).map((rootNode, index) => {
        return (
          <div key={'root_' + index} style={{ background: 'white' }}>
            {rootNode.map((item: any, index: number) => {
              const node: TreeNodeData = item.currentItem
              return (
                <div key={node.nodeId + '_' + index}>
                  <TreeNode
                    level={item.level}
                    node={node}
                    path={item.track.join('/')}
                    parent={item.parent}
                    NodeRenderer={children}
                    handleToggle={toggle}
                    actions={{
                      addNode,
                      addNodes,
                      addChild,
                      updateNode,
                      removeNode,
                      replaceNode,
                      hasChild,
                    }}
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}
