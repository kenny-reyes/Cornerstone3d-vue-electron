import { segmentation } from '@cornerstonejs/tools'

import addDropDownToToolbar from './addDropdownToToolbar'

// eslint-disable-next-line @typescript-eslint/ban-types
type SegmentDropdownType = Function & {
  /** The segmentationId to apply to */
  segmentationId?: string
  /** The segment index currently being used */
  segmentIndex?: number
  /** A function to update the active segment index */
  updateActiveSegmentIndex?: (segmentIndex: number) => void
}
/**
 * Ceate a segment index selector dropdown
 *
 */
const addSegmentIndexDropdown: SegmentDropdownType = (
  segmentationId: string | undefined,
  segmentIndices = [1, 2, 3, 4, 5]
) => {
  addSegmentIndexDropdown.segmentationId = segmentationId
  addSegmentIndexDropdown.segmentIndex = segmentIndices[0]
  addDropDownToToolbar({
    labelText: 'Segment Index',
    options: { values: segmentIndices, defaultValue: segmentIndices[0] },
    onSelectedValueChange: (nameAsStringOrNumber) => {
      // @ts-ignore ignore
      addSegmentIndexDropdown.updateActiveSegmentIndex(Number(nameAsStringOrNumber))
    }
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
addSegmentIndexDropdown.updateActiveSegmentIndex = (segmentIndex: number) => {
  addSegmentIndexDropdown.segmentIndex = segmentIndex
  const { segmentationId } = addSegmentIndexDropdown
  // @ts-ignore ignore
  segmentation.segmentIndex.setActiveSegmentIndex(segmentationId, segmentIndex)
}

export default addSegmentIndexDropdown
