import * as React from 'react'

import { Loading, useDocument } from '@data-modelling-tool/core'
import { IDmtUIPlugin } from '@data-modelling-tool/core'

import { LSSceForm } from './sce.js'

const LSSceForm_Component = (props: IDmtUIPlugin) => {
  const { dataSourceId, documentId } = props

  const [document, loading, updateDocument, hasError] = useDocument(
    dataSourceId,
    documentId,
    999
  )

  if (loading) {
    return <Loading />
  }

  if (hasError) {
    return <div>Error getting the document</div>
  }

  // console.log("*** testing form");
  // console.log(dataSourceId)
  // console.log(documentId)
  // console.log(attribute)
  // console.log(document)
  // console.log("*** testing form");

  return <LSSceForm document={document} updateEntity={updateDocument} />
}

export { LSSceForm_Component as LSSceForm }
