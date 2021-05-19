/* 
before:

editingItem._id = item._id;
editingItem.name = item.name;
editingItem.price = item.price;
editingItem.summary = item.summary;
editingItem.uid = item.uid;
editingItem.picture = item.picture;

after:

setObj(editingItem, item)

*/

export function setObj<T>(oldObj: T, newObj: T) {
  const newObj_ = (newObj as unknown) as Record<string, any>;
  const oldObj_ = (oldObj as unknown) as Record<string, any>;

  const keys = Object.keys(newObj_);

  keys.forEach((k) => {
    oldObj_[k] = newObj_[k];
  });
}
