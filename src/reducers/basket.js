import { bakeLocalStorage, deleteLocalStorage, readLocalStorage } from '@helpers/storage';

export default (state = readLocalStorage('basket'), action) => {
    let newState;

    // Check to see what type of action is being fired
    switch (action.type) {
        case 'BASKET_ITEM_ADD':
            newState = {
                id: action.payload.basketId || (state && state.id),
                items: [...((state && state.items) || [])],
            };

            const exists = newState.items.some(item => item.id === action.payload.id);

            // if item already exists in basket, add quantity to item
            if (exists) {
                newState.items = newState.items.map(item =>
                    item.id === action.payload.id
                        ? {
                              ...item,
                              quantity: (parseInt(item.quantity) || 0) + action.payload.quantity,
                          }
                        : item
                );
            } else {
                newState.items = [
                    ...newState.items,
                    { id: action.payload.id, quantity: action.payload.quantity },
                ];
            }

            bakeLocalStorage('basket', newState);
            return newState;
        case 'BASKET_ITEM_REMOVE':
            const item = state && state.items.find(({ id }) => id === action.payload.id);

            if (!item) return state;

            // removing quantity off basket item removes item completely
            if (
                !action.payload.quantity ||
                (parseInt(item.quantity) || 0) - action.payload.quantity <= 0
            ) {
                newState = {
                    ...state,
                    items: (state.items || []).filter(({ id }) => id !== action.payload.id),
                };

                // if no items left in basket remove basket from local storage
                if (!newState.items.length) {
                    newState = null;
                    deleteLocalStorage('basket');
                } else {
                    bakeLocalStorage('basket', newState);
                }
            } else {
                // otherwise remove quantity off of basket item (not complete removal)
                newState = {
                    ...(state || {}),
                    items: ((state || {}).items || []).map(item =>
                        item.id === action.payload.id
                            ? {
                                  ...item,
                                  quantity:
                                      (parseInt(item.quantity) || 0) - action.payload.quantity,
                              }
                            : item
                    ),
                };
                bakeLocalStorage('basket', newState);
            }

            return newState;
        case 'BASKET_EMPTY': {
            deleteLocalStorage('basket');
            return null;
        }
        default:
            return state;
    }
};
