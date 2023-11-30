export const dateColumnDef = {
  filter: 'agDateColumnFilter',
  cellRenderer: (cell: any) =>
    new Date(cell.value).toLocaleDateString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
  filterParams: {
    comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
      var d = new Date(cellValue);
      var cellDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      } else if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      } else {
        return 0;
      }
    },
  },
};