import { useEffect, useState } from 'react'
import { Tree, TreeNodeData } from '../components/Tree'
import { IIndexAPI, IndexNode, IndexNodes } from '../services'
import { ITree, useTree } from '../components/Tree'
// @ts-ignore
import values from 'lodash/values'
import { DataSource } from '../services'
import IndexAPI from '../services/api/IndexAPI'
import { toObject, toTreeNodes } from './utils/useIndexUtils'

export interface IModels {
  tree: ITree
}

export interface IOperations {
  add(documentId: string, nodeUrl: string, visible?: boolean): Promise<void>

  remove(nodeId: string, parent: string): Promise<void>

  toggle(nodeId: string): Promise<void>
}

export interface IIndex {
  models: IModels
  operations: IOperations
}

export interface IndexProps {
  dataSources: DataSource[]
  application: string
  indexApi?: IIndexAPI
}

export const useIndex = (props: IndexProps): IIndex => {
  const { dataSources, application, indexApi = new IndexAPI() } = props
  const [index, setIndex] = useState<Tree>({})

  const populateIndex = async (): Promise<void> => {
    const indexes: IndexNodes[] = await Promise.all(
      dataSources.map((dataSource: DataSource) =>
        indexApi.getIndexByDataSource(dataSource.id, application)
      )
    )
    const combinedIndex = indexes
      .map((indexNode: IndexNodes) => toTreeNodes(indexNode))
      .map((treeNode) => treeNode.reduce(toObject, {}))
      .reduce((obj, item) => {
        return {
          ...obj,
          ...item,
        }
      }, {})
    setIndex(combinedIndex)
  }

  useEffect(() => {
    populateIndex()
  }, [dataSources])

  const tree: ITree = useTree(index)

  const add = async (
    documentId: string,
    nodeUrl: string,
    visible: boolean = false
  ) => {
    try {
      tree.operations.setIsLoading(documentId, true)
      const result = await indexApi.getIndexByDocument(
        nodeUrl,
        documentId,
        application
      )

      const treeNodes: TreeNodeData[] = toTreeNodes(result)
        .map((node) => {
          // Open the specified node by default (or by demand).
          if (node.nodeId === documentId || visible) {
            node.isOpen = true
          }
          return node
        })
        .reduce(toObject, {})

      const indexNodes: IndexNode[] = values(result)
      const parentId = indexNodes[0]['parentId']
      const nodeId = indexNodes[0]['id']

      tree.operations.replaceNodes(nodeId, parentId, treeNodes)
      tree.operations.setIsLoading(documentId, false)
    } catch (error) {
      console.error(error)
    }
  }

  const remove = async (nodeId: string, parent: string) => {
    return tree.operations.removeNode(nodeId, parent)
  }

  const toggle = async (nodeId: string) => {
    const node: TreeNodeData = tree.operations.getNode(nodeId)
    if (!node) {
      throw `Node not found: ${nodeId}`
    }
    tree.operations.toggle(nodeId)
    if (node.meta.indexUrl && node.isExpandable && !node.isOpen) {
      return add(nodeId, node.meta.indexUrl)
    }
  }

  return {
    models: {
      tree,
    },
    operations: {
      add,
      remove,
      toggle,
    },
  }
}
