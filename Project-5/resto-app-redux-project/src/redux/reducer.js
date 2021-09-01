const initialState = {
  items: [{
    "name": "Burger",
    "price": 50,
    "category": "Food",
    "description": "",
    "image": "https://image.flaticon.com/icons/svg/1046/1046784.svg",
    "quantity" : 0,
    "id" : "1"
  },
  {
    "name": "Pizza",
    "price": 100,
    "category": "Food",
    "description": "",
    "image": "https://image.flaticon.com/icons/svg/1046/1046771.svg",
    "quantity" : 0,
    "id" : "2"
  },
  {
    "name": "Fries",
    "price": 25,
    "category": "Food",
    "description": "",
    "image": "https://image.flaticon.com/icons/svg/1046/1046786.svg",
    "quantity" : 0,
    "id" : "3"
  },
  {
    "name": "Coffee",
    "price": 35,
    "category": "Drink",
    "description": "",
    "image": "https://image.flaticon.com/icons/svg/1046/1046785.svg",
    "quantity" : 0,
    "id" : "4"
  },
  {
    "name": "Iced Tea",
    "price": 45,
    "category": "Drink",
    "description": "",
    "image": "https://image.flaticon.com/icons/svg/1046/1046782.svg",
    "quantity" : 0,
    "id" : "5"
  },
  {
    "name": "Hot Tea",
    "price": 45,
    "category": "Drink",
    "description": "",
    "image": "https://image.flaticon.com/icons/svg/1046/1046792.svg",
    "quantity" : 0,
    "id" : "6"
  }
  ],
  filteredItems: [],
  cartItems: [],
  selectedItem: [],
  count: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_ITEMS':
      let filter = action.payload === 'All' ? state.items : state.items.filter(item => item.category === action.payload);
      return { ...state, filteredItems: filter }
    case 'REMOVE_ITEM':
      let newList = state.items.filter(item => item.id !== action.payload);
      let newCart = state.cartItems.filter(item => item.id !== action.payload);
      let deletedItem = state.cartItems.find(item => item.id === action.payload);
      let anyCount ;
      deletedItem ? anyCount = deletedItem.quantity : anyCount = 0;
      return { ...state, 
        items: newList, 
        filteredItems: newList, 
        cartItems: newCart, 
        count: state.count - anyCount
      }
    case 'ADD_TO_CART':
      let itemToCart = state.items.find(item => item.id === action.payload);
      let newItem = {...itemToCart, quantity: 1}
      return { ...state, cartItems: [...state.cartItems, newItem] }
    case 'ADD_ITEM_QTY':
      let cart = state.cartItems.map(item => {
        if(item.id === action.payload) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });
      return {...state, cartItems: cart};
    case 'DECREASE_ITEM_QTY': 
      let newQty = state.cartItems.map(item => {
        if(item.id === action.payload){
          item.quantity = item.quantity -1;
        }
        return item;
      });
      return {...state, cartItems: newQty};
    case 'EDIT_ITEM':
      let selected = state.items.find(item => item.id === action.payload);
      return{...state, selectedItem: selected};

    case 'HANDLE_INPUT': 
    console.log(action.payload);
      return {...state, selectedItem: action.payload};

    case 'SAVE_CHANGES':
      let editedItem = state.items.map(item => {
        if(item.id === action.payload.id){
          item.name = action.payload.name;
          item.price = action.payload.price;
          item.category = action.payload.category;
          item.description = action.payload.description;
          item.image = action.payload.image;
        }
        return item;
      });
      let editedCartItem = state.cartItems.map(item => {
        if(item.id === action.payload.id){
          item.name = action.payload.name;
          item.price = action.payload.price;
          item.category = action.payload.category;
          item.description = action.payload.description;
          item.image = action.payload.image;
        }
        return item;
      })
      return {...state, items: editedItem, cartItems: editedCartItem} 
    case 'REMOVE_FROM_CART':
      let updatedCart = state.cartItems.filter(item => item.id !== action.payload);
      let removedItem = state.cartItems.find(item => item.id === action.payload);
      return{...state, cartItems: updatedCart, count: state.count - removedItem.quantity};
    case 'ADD_COUNT':
      return{...state, count: state.count + 1};
    case 'MINUS_COUNT':
      return{...state, count: state.count - 1};
    default:
      state.filteredItems = state.items;
      return (state);
  }
}

export default reducer;