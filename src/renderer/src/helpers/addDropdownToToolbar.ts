/* eslint-disable @typescript-eslint/no-explicit-any */
import { Enums as csToolsEnums, ToolGroupManager } from '@cornerstonejs/tools'
const { MouseBindings } = csToolsEnums

import createElement, { configElement } from './createElement'
import addLabelToToolbar from './addLabelToToolbar'

export type optionTypeDefaultValue = { defaultValue: number | string } | { defaultIndex?: number }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type optionTypeValues = { values: number[] | string[] } | { map: Map<string | number, any> }

interface configDropdown extends configElement {
  id?: string
  placeholder?: string
  options: optionTypeDefaultValue & optionTypeValues
  onSelectedValueChange: (key: number | string, value?: any) => void
  toolGroupId?: string | string[]
  label?: configElement
  labelText?: string
  container?: HTMLElement
}

export default function addDropDownToToolbar(config: configDropdown): void {
  // @ts-ignore ignore
  config.container = config.container ?? document.getElementById('demo-toolbar')

  const {
    map,
    values = [...map.keys()],
    defaultValue,
    defaultIndex = defaultValue === undefined && 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = config.options as any

  // Create label element if labelText is provided
  if (config.label || config.labelText) {
    const elLabel = addLabelToToolbar({
      merge: config.label,
      // @ts-ignore ignore
      title: config.labelText,
      container: config.container
    })

    if (config.id) {
      elLabel.htmlFor = config.id
    }
  }

  //
  if (!config.onSelectedValueChange && config.toolGroupId) {
    // @ts-ignore ignore
    config.onSelectedValueChange = changeActiveTool.bind(
      null,
      Array.isArray(config.toolGroupId) ? config.toolGroupId : [config.toolGroupId]
    )
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fnChange = (evt: Event) => {
    const elSelect = <HTMLSelectElement>evt.target
    const { value: key } = elSelect
    if (elSelect) {
      config.onSelectedValueChange(key, map?.get(key))
    }
  }

  //
  const elSelect = <HTMLSelectElement>createElement({
    merge: config,
    tag: 'select',
    event: {
      change: fnChange
    }
  })

  if (config.id) {
    elSelect.id = config.id
  }

  if (config.placeholder) {
    const elOption = <HTMLOptionElement>createElement({
      tag: 'option',
      attr: {
        disabled: '',
        hidden: '',
        selected: ''
      },
      html: config.placeholder
    })
    elSelect.append(elOption)
  }

  values.forEach((value: any, index: any) => {
    const elOption = document.createElement('option')
    const stringValue = String(value)
    elOption.value = stringValue
    elOption.innerText = stringValue

    if (value === defaultValue || index === defaultIndex) {
      elOption.selected = true

      if (map) {
        map.get(value).selected = true
      }
    }

    elSelect.append(elOption)
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function changeActiveTool(toolGroupIds: string[], newSelectedToolName: string) {
  for (const toolGroupId of toolGroupIds) {
    const toolGroup = ToolGroupManager.getToolGroup(toolGroupId)

    // Set the old tool passive
    // @ts-ignore ignore
    const selectedToolName = toolGroup.getActivePrimaryMouseButtonTool()
    if (selectedToolName) {
      // @ts-ignore ignore
      toolGroup.setToolPassive(selectedToolName)
    }

    // Set the new tool active
    // @ts-ignore ignore
    toolGroup.setToolActive(newSelectedToolName, {
      bindings: [
        {
          mouseButton: MouseBindings.Primary // Left Click
        }
      ]
    })
  }
}
