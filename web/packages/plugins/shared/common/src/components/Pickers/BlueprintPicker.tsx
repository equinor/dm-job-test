import React, { useState } from 'react'
// @ts-ignore
import { NotificationManager } from 'react-notifications'
import {
  BlueprintEnum,
  TREE_DIALOG_HEIGHT,
  TREE_DIALOG_WIDTH,
} from '../../utils/variables'
import { Dialog, TreeNode, TreeView } from '../../index'
import { Input, Tooltip } from '@equinor/eds-core-react'
import { PATH_INPUT_FIELD_WIDTH, truncatePathString } from '@dmt/common'
import { Variants } from '@equinor/eds-core-react/dist/types/components/TextField/types'

export const BlueprintPicker = (props: {
  onChange: (type: string) => void
  formData: string | undefined
  variant?: Variants
}) => {
  const { onChange, formData, variant } = props
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <div>
      <Tooltip title={truncatePathString(formData)}>
        <Input
          variant={variant || 'default'}
          style={{
            width: PATH_INPUT_FIELD_WIDTH,
            cursor: 'pointer',
          }}
          type="string"
          value={truncatePathString(formData)}
          onChange={() => {}}
          placeholder="Select"
          onClick={() => setShowModal(true)}
        />
      </Tooltip>
      <Dialog
        isOpen={showModal}
        closeScrim={() => setShowModal(false)}
        header={`Select a blueprint as type`}
        width={TREE_DIALOG_WIDTH}
        height={TREE_DIALOG_HEIGHT}
      >
        <TreeView
          onSelect={(node: TreeNode) => {
            if (node.type !== BlueprintEnum.BLUEPRINT) {
              NotificationManager.warning('You can only select a blueprint')
              return
            } // Only allowed to select blueprints
            setShowModal(false)
            onChange(node.getPath())
          }}
        />
      </Dialog>
    </div>
  )
}
