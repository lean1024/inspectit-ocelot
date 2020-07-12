
// the {  } is missing the required command key
// we dont use it here, since the functionality requires the item into which the attribute is added. The item cant be accessed from here
// solution. The component will take the values from here and set the .command key within the components context, thus knowing the item

// example ( within the components context)
// command = (e) => {
//   let updatedItem = deepCopy(item);
//   updatedItem = splittItem.createAttribute(updatedItem); // passing the required item to createAttribute
//   onUpdate(updatedItem)
// }

export const type = [
  {
    actionId: 'adding name',
    label: 'specify the class name by its name.',
    icon: 'pi pi-refresh',
    createAttribute: (item) => {
      if (!item.name) {
        item.name = '',
        item['matcher-mode'] = 'EQUALS_FULLY'
      }
      return item;
    },
  },
  {
    actionId: 'adding annotation',
    label: 'specify the class by the annotations, which are attached to it.',
    icon: 'pi pi-times',
    createAttribute: (item) => {
      item.annotations = item.annotations || [];
      item.annotations.push({ name:'', 'matcher-mode': 'EQUALS_FULLY'})
      return item;
    },
  },
]

export const interfaces = [
  {
    actionId: 'adding name',
    label: 'specify this interface by its name',
    icon: 'pi pi-refresh',
    createAttribute: (item) => {
      if (!item.name) {
        item.name = '',
        item['matcher-mode'] = 'EQUALS_FULLY'
      }
      return item;
    },
   },
   { 
    actionId: 'adding annotation',
    label: 'specify this interface by the anotations, that is attached to it',
    icon: 'pi pi-refresh',
    createAttribute: (item) => {
      item.annotations = item.annotations || [];
      item.annotations.push({ name:'', 'matcher-mode': 'EQUALS_FULLY'})
      return item;
    },
   }
]


export const superclass = [
  {
    actionId: 'adding name',
    label: 'specify the superclass by its name.',
    icon: 'pi pi-refresh',
    createAttribute: (item) => {
      if (!item.name) {
        item.name = '',
        item['matcher-mode'] = 'EQUALS_FULLY'
      }
      return item;
    },
  },
  {
    actionId: 'adding annotation',
    label: 'specify the superclass by the annotations, which are attached to it.',
    icon: 'pi pi-times',
    createAttribute: (item) => {
      item.annotations = item.annotations || [];
      item.annotations.push({ name:'', 'matcher-mode': 'EQUALS_FULLY'})
      return item;
    },
  },
]

export const method = [
  {
    actionId: 'adding name',
    label: 'specify the method by its name',
    icon: 'pi pi-refresh',
    createAttribute: (item) => {
      if (!item.name) {
        item.name = '',
        item['matcher-mode'] = 'EQUALS_FULLY'
      }
      return item;
    },
  },
  {
    actionId: 'adding annotation',
    label: 'specify the method by the annotations, which are attached to it',
    icon: 'pi pi-times',
    createAttribute: (item) => {
      item.annotations = item.annotations || [];
      item.annotations.push({ name:'', 'matcher-mode': 'EQUALS_FULLY'})
      return item;
    },
  },
  // {
  //   label: 'specify the method by its visibilites',
  //   icon: 'pi pi-external-link',
  //   createAttribute: (item) => {
  //     item.annotations = item.annotations || [];
  //     item.annotations.push({ name:'', 'matcher-mode': 'EQUALS_FULLY'})
  //     return item;
  //   },
  // },
  // {   
  //   label: 'specify the methods by its arguments',
  //   icon: 'pi pi-upload',
  //   createAttribute: (item) => {
  //     item.annotations = item.annotations || [];
  //     item.annotations.push({ name:'', 'matcher-mode': 'EQUALS_FULLY'})
  //     return item;
  //   },
  // },
  // {   
  //   label: 'specify the methods, wether it is synchronized',
  //   icon: 'pi pi-upload',
  //   createAttribute: (item) => {
  //     item.annotations = item.annotations || [];
  //     item.annotations.push({ name:'', 'matcher-mode': 'EQUALS_FULLY'})
  //     return item;
  //   },
  // },
  // {   
  //   label: 'specify the methods, wether it is a constructor',
  //   icon: 'pi pi-upload',
  //   createAttribute: (item) => {
  //     item.annotations = item.annotations || [];
  //     item.annotations.push({ name:'', 'matcher-mode': 'EQUALS_FULLY'})
  //     return item;
    // },
  // }
]