export const dateColumnDef = {
  filter: 'agDateColumnFilter',
  cellRenderer: (cell: any) => {
    let d = new Date(cell.value);
    return (
      (d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
      '/' +
      (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
      '/' +
      d.getFullYear()
    );
  },
  filterParams: {
    comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
      var dateParts = cellValue.split('-');
      var year = Number(dateParts[0]);
      var month = Number(dateParts[1]) - 1;
      var day = Number(dateParts[2].slice(0, 2));
      var cellDate = new Date(year, month, day);
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
