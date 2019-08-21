import React from 'react'
//@ts-ignore
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Modal from '../../../components/modal/Modal'
import Form from '../../../components/Form'
import axios from 'axios'
import {
  BlueprintAction,
  BlueprintActions,
  BlueprintState,
} from '../BlueprintReducer'

type FormModalProps = {
  state: BlueprintState
  dispatch: (action: BlueprintAction) => void
}

export default (props: FormModalProps) => {
  const { state, dispatch } = props
  const formConfig = getConfigByAction(props)
  return (
    <>
      <NotificationContainer timeout={5000} />
      <Modal
        toggle={() => dispatch(BlueprintActions.closeModal())}
        open={state.openModal}
      >
        <Form {...formConfig}></Form>
      </Modal>
    </>
  )
}

function getConfigByAction(props: ActionConfigType) {
  const treeviewAction = props.state.treeviewAction
  switch (treeviewAction) {
    case 'add-package':
      return addPackageConfig(props)
    case 'add-subpackage':
      return addSubPackageConfig(props)
    case 'edit-package':
      return editPackageConfig(props)
    case 'edit-subpackage':
      return editSubPackageConfig(props)
    case 'add-datasource':
      return addDatasourceConfig(props)
    case 'clear':
      //avoid logging.
      break
    default:
      console.warn(treeviewAction + ' is not supported.')
  }
  return {
    onSubmit: (action: {}) => {},
    schemaUrl: '',
    dataUrl: '',
  }
}

interface ActionConfigType {
  dispatch: (action: BlueprintAction) => void
  state: BlueprintState
}

function addDatasourceConfig(props: ActionConfigType) {
  return {
    schemaUrl: '/api/templates/add-datasource.json',
    dataUrl: '',
    onSubmit: () => {
      console.log('click')
    },
  }
}

function addPackageConfig(props: ActionConfigType) {
  const { dispatch } = props
  return {
    schemaUrl: '/api/templates/package.json',
    dataUrl: '',
    onSubmit: (formData: any) => {
      axios
        .put(
          `/api/blueprints/${formData.title}/${formData.version}/package.json`,
          formData
        )
        .then(res => {
          dispatch(BlueprintActions.addPackage(res.data))
          NotificationManager.success('Create package', res.data)
        })
        .catch(err => {
          NotificationManager.error(
            `${formData.title}.json`,
            'Failed to create new package'
          )
          console.log(err)
        })
    },
  }
}

function editPackageConfig(props: ActionConfigType) {
  const { state, dispatch } = props
  const dataUrl = '/api/blueprints/' + state.selectedBlueprintId
  return {
    schemaUrl: '/api/templates/package.json',
    dataUrl,
    onSubmit: (formData: any) => {
      axios
        .put(dataUrl, formData)
        .then(res => {
          // dispatch(BlueprintActions.setOpen(false))
        })
        .catch(err => {
          NotificationManager.error(
            `${formData.title}.json`,
            'Failed to edit new package'
          )
          console.error(err)
        })
    },
  }
}

function addSubPackageConfig(props: ActionConfigType) {
  const { dispatch, state } = props
  return {
    schemaUrl: '/api/templates/subpackage.json',
    dataUrl: '',
    onSubmit: (formData: any) => {
      const url = `/api/blueprints/${state.selectedBlueprintId.replace(
        'package.json',
        formData.title + '/package.json'
      )}`
      axios
        .put(url, formData)
        .then(res => {
          console.log(res)
          dispatch(BlueprintActions.addSubPackage())
          // dispatch(BlueprintActions.setOpen(false))
          // dispatchTreeview(BlueprintActions.openModal(res.data))
        })
        .catch(err => {
          NotificationManager.error(
            `${formData.title}.json`,
            'Failed to create new subpackage'
          )
          console.log(err)
        })
    },
  }
}

function editSubPackageConfig(props: ActionConfigType) {
  const { state, dispatch } = props
  const dataUrl = '/api/blueprints/' + state.selectedBlueprintId
  return {
    schemaUrl: '/api/templates/subpackage.json',
    dataUrl,
    onSubmit: (formData: any) => {
      axios
        .put(dataUrl, formData)
        .then(res => {
          // dispatch(BlueprintActions.setOpen(false))
        })
        .catch(err => {
          NotificationManager.error(
            `${formData.title}.json`,
            'Failed to edit subpackage'
          )
          console.error(err)
        })
    },
  }
}
