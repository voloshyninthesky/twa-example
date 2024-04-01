<template>
  <div class="home">
    <h1>Welcome, {{ username }}!</h1>
    <!-- <vue-qr :value="'Your QR Code: ' + username" class="qr-code" /> -->
    <p>You have {{ $store.state.user.points }} points remaining.</p>

    <div
      v-for="(items, category) in itemsByCategory"
      :key="category"
      class="category-row"
    >
      <h2>{{ category }}</h2>
      <div class="scroll-container">
        <ItemCard
          v-for="item in items"
          :key="item.id"
          :item="item"
          :isPurchased="isItemPurchased(item.id)"
          @buyItem="buyItem"
          @removeItem="undoPurchase"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ItemCard from "../components/ItemCard.vue";

export default {
  components: {
    ItemCard,
  },
  computed: {
    username() {
      return this.$store.state.user.username;
    },
    itemsByCategory() {
      return this.$store.state.items.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {});
    },
  },
  methods: {
    buyItem(item) {
      this.$store.dispatch("buyItem", item);
    },
    undoPurchase(itemId) {
      this.$store.dispatch("undoPurchase", itemId);
    },
    isItemPurchased(itemId) {
      return this.$store.state.user.purchasedItems.some((item) => item.id === itemId);
    },
  },
};
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.qr-code {
  margin: 20px 0;
}
.category-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px; /* Space between categories */
}

.scroll-container {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
}
</style>
