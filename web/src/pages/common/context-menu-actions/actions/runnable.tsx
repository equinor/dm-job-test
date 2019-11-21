import { TreeNodeRenderProps } from '../../../../components/tree-view/TreeNode'
import Runnable from '../../../../runnable'
//@ts-ignore
import { NotificationManager } from 'react-notifications'
import Api2, { BASE_CRUD } from '../../../../api/Api2'
import axios from 'axios'

type Input = {
  blueprint: string
  entity: any
  path: string
  id: string
}

type Output = {
  blueprint: string
  entity: any
  path: string
  dataSource: string
  id: string
}

type RunnableInputProps = {
  input: Input
  output: Output
  updateDocument: Function
}

type RunnableMethod = (props: RunnableInputProps) => any

// TODO: We must pass this entire function, not just a callBack
function updateDocument(output: Output) {
  Api2.put({
    url: `/api/v2/documents/${output.dataSource}/${output.id}`,
    data: output.entity,
    onSuccess: (response: any) => {
      NotificationManager.success(
        'updated document: ' + `${output.path}/${output.entity.name}`
      )
    },
    onError: (error: any) => {
      NotificationManager.error(
        'failed to update document: ' + `${output.path}/${output.entity.name}`
      )
    },
  })
}

export const runnableAction = (
  action: any,
  node: TreeNodeRenderProps,
  setShowModal: Function,
  createNodes: Function
) => {
  let entity: any = {}
  const methodToRun: string = action.data.runnable.method
  const dataSource = node.path.substr(0, node.path.indexOf('/'))

  // @ts-ignore
  if (!Runnable[methodToRun]) {
    NotificationManager.error(`Runnable Method "${methodToRun}"`, 'Not Found')
  }

  // Getting the entity to include as input to external function
  Api2.get({
    // @ts-ignore
    url: node.nodeData.meta.onSelect.data.dataUrl,
    onSuccess: result => {
      entity = result.document
    },
    onError: error => {
      console.log(error)
      NotificationManager.error('failed to fetch document: ' + error.statusText)
    },
  })

  return {
    // When clicking "submit" on an runnable item, these things happen:
    // 1. Creates a new file used by the external function to write status/result
    // 2. Constructs the Input and Output objects used by the called function
    // Mainly, the Input is the clicked entity, Output is the dataSource and document ID to write the result.
    onSubmit: (formData: any) => {
      async function executeRunnable() {
        // TODO: Validate formData. Should not be empty
        // TODO: Catch request errors
        let response = await axios.post('/api/v2/explorer/entities/add-file', {
          attribute: 'content',
          description: formData.description,
          name: formData.name,
          parentId: node.parent,
          type: action.data.runnable.output,
        })

        // TODO: This shit ain't working...
        // Possible to fetch destination node from api?
        // Currently creates a temp child node
        createNodes({
          documentId: `${response.data.uid}`,
          nodeUrl: `/api/v3/index/${dataSource}`,
          node,
        })

        setShowModal(false)

        const input: Input = {
          blueprint: entity.type,
          entity: entity,
          path: node.path,
          id: node.nodeData.nodeId,
        }
        const output: Output = {
          blueprint: formData.type,
          entity: response.data.data,
          // TODO: Add "saveAs" picker widget to get result path
          path: `${node.path}/${formData.name}`,
          dataSource: dataSource,
          id: response.data.uid,
        }
        // @ts-ignore
        const method: RunnableMethod = Runnable[methodToRun]
        method({ input, output, updateDocument })
      }

      executeRunnable()
    },
    // Function to fetch the document used to create the rjsc-form
    fetchDocument: ({ onSuccess, onError = () => {} }: BASE_CRUD): void => {
      Api2.get({
        // TODO: Use a standard CREATE_ENTITY schema
        url:
          '/api/v2/json-schema/system/DMT/actions/NewActionResult?ui_recipe=DEFAULT_CREATE',
        onSuccess: result => onSuccess({ template: result, document: {} }),
        onError,
      })
    },
  }
}
