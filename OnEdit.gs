function onEdit(e) {
  if(e.range.getA1Notation() !== "E10") return
  if(e.source.getSheetName() !== "Interface") return
  search()
}
