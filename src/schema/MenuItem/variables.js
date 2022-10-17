const TYPES = ["FOOD", "SIDE", "SAUCE", "DRINK", "DESSERT"];

const variables = {
  menuItemId: "6341c9939dc19a4d55d037aa",

  // randomType: () => TYPES[Math.floor(Math.random() * TYPES.length)],
  randomType: TYPES[Math.floor(Math.random() * TYPES.length)],

  createMenuItemInput: {
    type: "DESSERT",
    image: "",
    name: "Banana 1x",
    description: "Whole banana",
    price: 1.00
  },

  updateMenuItemInput: {
    image: "image",
    name: "Guineo 1x",
    description: "Guineo entero",
    price: 0.99
  }
};

export default variables;
