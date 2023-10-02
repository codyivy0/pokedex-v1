export  function DeleteBtn({index, onDelete}) {
  return <div onClick={()=>onDelete(index)} className="delete-btn">-</div>;
}
