import {
  AttributeOnChange,
  AttributeWrapper,
  DataType,
  NumberInput,
  TextAreaWidget,
  TextInput,
  TypeWidget,
} from './AttributeInputs'
import React, { useState } from 'react'
import styled from 'styled-components'
import { BlueprintAttributeType } from '../types'
import { DimensionWidget } from './DimensionWidget'
import { BooleanWidget } from './BooleanWidget'
import { isPrimitive } from '../pluginUtils'
import { RequiredAttributesGroup } from '../form_rjsf_edit/RequiredAttributes'
import { BlueprintAttribute } from '../../domain/BlueprintAttribute'

const REQUIRED_ATTRIBUTES = ['name', 'description', 'type']

const AttributeGroup = styled.div`
  border: 1px solid;
  margin: 2px;
  padding: 5px;
  border-radius: 5px;
`

type Props = {
  formData: any
  onChange: (value: any) => void
  uiSchema: any
}

export const AttributeWidget = (props: Props) => {
  let { attributes } = props.uiSchema

  const initialState = { type: DataType.STRING, ...props.formData }
  const [formData, setFormData] = useState<BlueprintAttributeType>(initialState)

  if (!attributes) {
    console.error('this widget depends on a attributes list.')
    return <div>Missing blueprint attributes.</div>
  }
  //@todo add order in uiRecipe to change order of elements in the widget.

  const onChange: AttributeOnChange = (
    attribute: BlueprintAttributeType,
    value: string | boolean | number
  ): void => {
    const name = attribute.name
    let newFormData = { ...formData, [name]: value }
    setFormData(newFormData)
    props.onChange(newFormData)
  }

  const selectedType = formData['type']
  const selectedDimensions = formData['dimensions']
  if (REQUIRED_ATTRIBUTES.includes(formData.name)) {
    return <RequiredAttributesGroup name={formData.name} type={formData.type} />
  }
  return (
    <AttributeGroup>
      {attributes.map((blueprintAttribute: BlueprintAttributeType) => {
        const { name } = blueprintAttribute
        const value = (formData as any)[name]
        let Widget: Function | null = getWidgetByName(
          blueprintAttribute,
          selectedType,
          selectedDimensions || ''
        )
        if (Widget === null) {
          return null
        }
        if (Widget === undefined) {
          Widget = getWidgetByType(blueprintAttribute)
        }
        if (Widget === undefined) {
          console.warn('widget is not supported: ', blueprintAttribute)
          return null
        }
        return (
          <AttributeWrapper key={name}>
            <label style={{ verticalAlign: 'top', marginRight: 10 }}>
              {name}:{' '}
            </label>
            <Widget
              onChange={onChange}
              value={value}
              attribute={blueprintAttribute}
            />
          </AttributeWrapper>
        )
      })}
    </AttributeGroup>
  )
}

function getWidgetByName(
  attribute: BlueprintAttributeType,
  selectedType: string,
  selectedDimensions: string
): Function | null {
  let widget: Function = (widgetNames as any)[attribute.name]
  if (attribute.name === 'default') {
    if (!isPrimitive(selectedType)) {
      // type is a blueprint type string.
      return null
    }
    if (BlueprintAttribute.isArray(selectedDimensions)) {
      // use string default
      widget = (widgetTypes as any)['string']
    } else {
      //use real defaults.
      widget = (widgetTypes as any)[selectedType]
    }
  }
  return widget
}

function getWidgetByType(attribute: BlueprintAttributeType): Function {
  let widget: Function = (widgetTypes as any)[attribute.type]
  if (widget === undefined) {
    widget = TextInput
  }
  return widget
}

const widgetNames = {
  type: TypeWidget,
  dimensions: DimensionWidget,
  description: TextAreaWidget,
  enumType: TextInput,
}

const widgetTypes = {
  string: TextInput,
  boolean: BooleanWidget,
  integer: NumberInput,
  number: NumberInput,
}
