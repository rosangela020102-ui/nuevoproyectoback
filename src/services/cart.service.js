let activeCart = {
  items: [],
  status: "ACTIVE" 
};

const getCart = async () => {
  return activeCart;
};

const addItemToCart = async (itemData) => {
  const { productId, name, price, quantity = 1 } = itemData;

  if (activeCart.status === "CHECKED_OUT") {
    activeCart = { items: [], status: "ACTIVE" };
  }

  const existingItem = activeCart.items.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    activeCart.items.push({
      itemId: activeCart.items.length + 1,
      productId,
      name,
      price,
      quantity
    });
  }

  return activeCart;
};

const removeItemFromCart = async (itemId) => {
  activeCart.items = activeCart.items.filter(item => item.itemId !== parseInt(itemId));
  return activeCart;
};

const checkoutCart = async () => {
  if (activeCart.items.length === 0) {
    throw new Error("No puedes procesar un carrito vacío");
  }

  activeCart.status = "CHECKED_OUT";
  
  const order = {
    orderId: Math.floor(Math.random() * 90000) + 10000,
    items: [...activeCart.items],
    total: activeCart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    date: new Date()
  };

  return order;
};

export default { getCart, addItemToCart, removeItemFromCart, checkoutCart };