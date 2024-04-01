import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      username: 'TelegramUser',
      points: 100,
      purchasedItems: [], // Array to store purchased items
    },
    items: [
      { id: 1, name: 'Coffee', category: 'Beverages', points: 10, img: '' },
      { id: 2, name: 'Tea', category: 'Beverages', points: 8, img: '' },
      { id: 3, name: 'Soda', category: 'Beverages', points: 5, img: '' },
      { id: 4, name: 'Cake', category: 'Desserts', points: 15, img: '' },
      { id: 5, name: 'Cupcake', category: 'Desserts', points: 12, img: '' },
      { id: 6, name: 'Cake', category: 'Desserts', points: 15, img: '' },
      { id: 7, name: 'Cupcake', category: 'Desserts', points: 12, img: '' },
      { id: 8, name: 'Cake', category: 'Desserts', points: 15, img: '' },
      { id: 9, name: 'Cupcake', category: 'Desserts', points: 12, img: '' },

    ],
  },
  mutations: {
    purchaseItem(state, item) {
      if (state.user.points >= item.points && !state.user.purchasedItems.includes(item)) {
        state.user.points -= item.points;
        state.user.purchasedItems.push(item);
      }
    },
    revertPurchase(state, itemId) {
      const index = state.user.purchasedItems.findIndex(item => item.id === itemId);
      if (index !== -1) {
        state.user.points += state.user.purchasedItems[index].points;
        state.user.purchasedItems.splice(index, 1);
      }
    },
  },
  actions: {
    buyItem({ commit }, item) {
      commit('purchaseItem', item);
    },
    undoPurchase({ commit }, itemId) {
      commit('revertPurchase', itemId);
    },
  },
});
