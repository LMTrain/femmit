const CART_KEY = 'cart';
const TOKEN_KEY = 'jwt';

export const calculatePrice = iitems => {
    return `$${iitems
      .reduce((acc, iitem) => acc + iitem.quantity * iitem.price, 0)
      .toFixed(2)}`;
};

export const calculateAmount = iitems => {
  return Number(iitems
      .reduce((acc, iitem) => acc + iitem.quantity * iitem.price, 0)
      .toFixed(2));
  
};

export const calculateTotalItems = iitems => {  
  return Number(iitems
    .reduce((acc, iitem) => acc + iitem.quantity, 0));
};


/* Cart */
export const setCart = (value, cartKey = CART_KEY) => {
    if (localStorage) {
        localStorage.setItem(cartKey, JSON.stringify(value));
    }
};

export const getCart = (cartKey = CART_KEY) => {
    if (localStorage && localStorage.getItem(cartKey)) {
        return JSON.parse(localStorage.getItem(cartKey));
    }
    return [];
};

export const clearCart = (cartKey = CART_KEY) => {
    if (localStorage) {
      localStorage.removeItem(cartKey);
    }
  };

/* Auth */
export const getToken = (tokenKey = TOKEN_KEY) => {
    if (localStorage && localStorage.getItem(tokenKey)) {
      return JSON.parse(localStorage.getItem(tokenKey));
    }
    return null;
  };

export const setToken = (value, tokenKey = TOKEN_KEY) => {
    if (localStorage) {
        localStorage.setItem(tokenKey, JSON.stringify(value));
    }
};

export const clearToken = (tokenKey = TOKEN_KEY) => {
    if (localStorage) {
      localStorage.removeItem(tokenKey);
    }
  };
