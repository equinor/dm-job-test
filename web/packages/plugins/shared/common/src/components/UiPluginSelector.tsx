import React, {
  useContext,
  useEffect,
  useState,
  FunctionComponent,
} from 'react'
import { DmtUIPlugin, UiPluginContext, useBlueprint } from '@dmt/common'
import styled from 'styled-components'
import { DotProgress } from '@equinor/eds-core-react'

const lightGray = '#d3d3d3'

const PluginTabsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const Wrapper = styled.div`
  border-bottom: 1px ${lightGray} solid;
  border-top: 1px ${lightGray} solid;
  align-items: center;
  justify-content: space-evenly;
`

const PathWrapper = styled.div`
  display: flex;
  opacity: 60%;
  justify-content: center;
  font-size: 14px;
  height: 20px;
  overflow: hidden;
`

const PathPart = styled.div`
  margin-top: 0;
  margin-right: 15px;
`

export function DocumentPath(props: { absoluteDottedId: string }): JSX.Element {
  const { absoluteDottedId } = props
  const parts = absoluteDottedId.split('.')
  return (
    <PathWrapper>
      {parts.map((part: string) => {
        return (
          <div style={{ display: 'flex', flexWrap: 'nowrap' }} key={part}>
            <PathPart>/</PathPart>
            <PathPart>{part}</PathPart>
          </div>
        )
      })}
    </PathWrapper>
  )
}

interface ISPButton {
  active: boolean
}

const SelectPluginButton = styled.div<ISPButton>`
  padding: 5px 10px;
  text-align: center;
  width: 100%;
  border-bottom: ${(props: any) =>
    (props.active == true && '2px #017078FF solid') ||
    `2px ${lightGray} solid`};
  &:hover {
    background: ${lightGray};
    cursor: pointer;
  }
`

export function UIPluginSelector(props: {
  absoluteDottedId: string
  entity: any
  onSubmit?: Function
}): JSX.Element {
  const { absoluteDottedId, entity, onSubmit } = props
  const [dataSourceId, documentId] = absoluteDottedId.split('/', 2)
  const [blueprint, loadingBlueprint, error] = useBlueprint(entity.type)
  // @ts-ignore
  const { loading, getUiPlugin } = useContext(UiPluginContext)
  const [selectedPlugin, setSelectedPlugin] = useState<number>(0)
  const [selectablePluginsComponent, setSelectablePluginsComponent] = useState<
    [string, Function][]
  >([])

  useEffect(() => {
    if (!blueprint) return
    if (!blueprint.uiRecipes?.length) {
      setSelectablePluginsComponent(['yaml', getUiPlugin('yaml')])
    } else {
      setSelectablePluginsComponent(
        blueprint.uiRecipes.map((uiRecipe: any) => [
          uiRecipe?.name || uiRecipe?.plugin || 'no name',
          getUiPlugin(uiRecipe?.plugin),
        ])
      )
    }
  }, [blueprint, loadingBlueprint])

  if (loadingBlueprint || loading) return <DotProgress color="primary" />

  if (error)
    return (
      <div style={{ color: 'red' }}>
        Failed to fetch Blueprint {entity.type}
      </div>
    )

  const UiPlugin: FunctionComponent<DmtUIPlugin> = selectablePluginsComponent[
    selectedPlugin
  ][1] as FunctionComponent

  return (
    <Wrapper>
      <DocumentPath absoluteDottedId={`${dataSourceId}/${documentId}`} />
      <PluginTabsWrapper>
        {selectablePluginsComponent.map(
          (component: [string, Function], index: number) => (
            <SelectPluginButton
              key={index}
              onClick={() => setSelectedPlugin(index)}
              active={index === selectedPlugin}
            >
              {component[0]}
            </SelectPluginButton>
          )
        )}
      </PluginTabsWrapper>
      <UiPlugin
        dataSourceId={dataSourceId}
        documentId={documentId}
        document={entity}
        onSubmit={onSubmit}
      />
    </Wrapper>
  )
}
