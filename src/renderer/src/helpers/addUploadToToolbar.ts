import createElement, { configElement } from './createElement'
import addButtonToToolbar from './addButtonToToolbar'

interface configUpload extends configElement {
  id?: string
  title: string
  container?: HTMLElement
  onChange: (files: FileList) => void
  input?: configElement
}

export default function addUploadToToolbar(config: configUpload): void {
  // @ts-ignore ignore
  config.container = config.container ?? document.getElementById('demo-toolbar')

  //
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fnClick = () => {
    //
    const elInput = <HTMLInputElement>createElement({
      merge: config.input,
      tag: 'input',
      attr: {
        type: 'file',
        multiple: true,
        hidden: true
      },
      event: {
        change: (evt: Event) => {
          const files = (evt.target as HTMLInputElement).files

          // @ts-ignore ignore
          config.onChange(files)

          elInput.remove()
        },
        cancel: () => {
          elInput.remove()
        }
      }
    })

    document.body.appendChild(elInput)

    elInput.click()
  }

  //
  addButtonToToolbar({
    merge: config,
    title: config.title,
    onClick: fnClick
  })
}
