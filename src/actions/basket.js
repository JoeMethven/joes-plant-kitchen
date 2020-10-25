export const addToBasket = ({ id, quantity, basketId }) => ({
    type: 'BASKET_ITEM_ADD',
    payload: {
        id,
        quantity,
        basketId,
    },
});

export const removeFromBasket = ({ id, quantity }) => ({
    type: 'BASKET_ITEM_REMOVE',
    payload: { id, quantity },
});

export const emptyBasket = () => ({
    type: 'BASKET_EMPTY',
});
