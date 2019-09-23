import React from 'react'
import { RenderProps } from '../../common/tree-view/DocumentTree'
import WithContextMenu from '../../common/context-menu-actions/WithContextMenu'
import { MenuItem } from '../../../components/context-menu/ContextMenu'
import { ContextMenuActions } from '../../common/context-menu-actions/ContextMenuActionsFactory'
import { FaFile, FaFolder } from 'react-icons/fa'

export const SubPackageNode = (props: RenderProps) => {
  const { treeNodeData } = props

  const menuItems: MenuItem[] = [
    {
      label: 'New',
      menuItems: [
        {
          label: 'Blueprint',
          action: ContextMenuActions.createBlueprint,
          icon: FaFile,
        },
        {
          label: 'Subpackage',
          action: ContextMenuActions.createSubPackage,
          icon: FaFolder,
        },
      ],
    },
    {
      label: 'Rename',
      action: ContextMenuActions.renameSubPackage,
    },
    {
      label: 'Remove',
      action: ContextMenuActions.removeSubPackage,
    },
  ]

  return (
    <WithContextMenu
      {...props}
      treeNodeData={treeNodeData}
      menuItems={menuItems}
    />
  )
}
