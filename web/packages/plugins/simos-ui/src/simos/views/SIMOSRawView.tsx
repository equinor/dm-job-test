import * as React from 'react'

import { Loading, useDocument } from '@data-modelling-tool/core'
import { IDmtUIPlugin } from '@data-modelling-tool/core'

import { SIMOSRawView } from './raw.js'

const SIMOSRawView_Component = (props: IDmtUIPlugin) => {
  const { dataSourceId, documentId } = props
  const [document, loading, updateDocument, hasError] = useDocument(
    dataSourceId,
    documentId,
    999
  )
  if (loading) {
    return <Loading />
  }
  return <SIMOSRawView document={document} />
}

export { SIMOSRawView_Component as SIMOSRawView }
