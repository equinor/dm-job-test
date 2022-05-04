import React, { useState } from 'react'
import { CustomScrim, TreeNode, TreeView, TReference } from '../../index'
import { Button } from '@equinor/eds-core-react'
// @ts-ignore
import { NotificationManager } from 'react-notifications'

export const EntityPickerButton = (props: {
  onChange: (ref: TReference) => void
  typeFilter?: string
}) => {
  const { onChange, typeFilter } = props
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'row', margin: '0 10px' }}>
      <Button onClick={() => setShowModal(true)}>Select</Button>
      <CustomScrim
        isOpen={showModal}
        closeScrim={() => setShowModal(false)}
        header={'Select an Entity'}
        width={'30vw'}
      >
        <TreeView
          onSelect={(node: TreeNode) => {
            if (node.type !== typeFilter) {
              NotificationManager.warning('Wrong type')
              return
            }
            setShowModal(false)
            node
              .fetch()
              .then((doc: any) => {
                setShowModal(false)
                onChange(doc)
              })
              .catch((error: any) => {
                console.error(error)
                NotificationManager.error('Failed to fetch')
              })
          }}
        />
      </CustomScrim>
    </div>
  )
}
