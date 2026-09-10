import type { Table } from '@tanstack/react-table'

import { dayjs } from '@farmers/shared/common/dayjs/index'

export const downloadCSV = <T,>(params: { table: Table<T>; name: string }) => {
  const filename = `${params.name}-${dayjs().format('YYYY-MM-DD')}.csv`
  const csvHeaders = params.table
    .getHeaderGroups()
    .map((headerGroup) =>
      headerGroup.headers
        .filter(
          (header) =>
            !header.isPlaceholder &&
            !header.column.columnDef.meta?.excludeFromCsv,
        )
        .map((header) => header.column.columnDef.meta?.name ?? header.id)
        .join(','),
    )
    .join(',')
  // console.log({ csvHeaders })
  const csvRows = params.table
    .getPrePaginationRowModel()
    .rows.map((row) =>
      row
        .getVisibleCells()
        .filter((cell) => !cell.column.columnDef.meta?.excludeFromCsv)
        // https://stackoverflow.com/a/165052 -- fix excel weirdness
        .map((cell) => `"="${JSON.stringify(cell.getValue()?.toString())}""`)
        .join(','),
    )
    .join('\n')

  const csvString = csvHeaders + '\n' + csvRows
  const csvBlob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const blobUrl = URL.createObjectURL(csvBlob)

  const hiddenElement = document.createElement('a')
  hiddenElement.href = blobUrl
  hiddenElement.target = '_blank'
  hiddenElement.download = filename
  hiddenElement.click()
}
