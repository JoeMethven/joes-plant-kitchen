import store from '../store';

export const getBasket = (products, basket) => {
    basket = basket || store.getState().basket;

    return !!basket && !!basket.items
        ? products.reduce((acc, current) => {
              const item = basket && basket.items.find(({ id }) => id === current._id);
              if (item) {
                  return acc.concat([
                      {
                          ...current,
                          id: current?._id,
                          quantity: item.quantity,
                          total: (current?.price ?? 0) * item.quantity,
                          category: current?.category,
                      },
                  ]);
              }

              return acc;
          }, [])
        : [];
};

// products here is returned from basket products above, always pass the above function to get the basket products
export const getBasketSubtotal = basketProducts => {
    return !!basketProducts && Array.isArray(basketProducts) && !!basketProducts.length
        ? parseFloat(
              basketProducts.reduce((accumulator, { total }) => accumulator + total, 0) / 100
          )
        : null;
};
