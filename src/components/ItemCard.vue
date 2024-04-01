<template>
  <div class="item" :class="{ purchased: isPurchased }" @click="handleClick">
    <div class="item-info">
      <h3>{{ item.name }}</h3>
      <button v-if="isPurchased" @click.stop="handleRemove" class="remove-btn">
        Remove
      </button>
      <button v-else @click.stop="handleBuy" class="buy-btn">
        {{ item.points }} points
      </button>
    </div>
    <img :src="imageSrc" @error="handleImageError" alt="" class="item-image" />
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    isPurchased: Boolean,
  },
  data() {
    return {
      imageSrc: this.item.img
        ? require(`@/assets/${this.item.img}`)
        : "https://via.placeholder.com/50",
    };
  },
  methods: {
    handleClick() {
      // Only for styling, to avoid action when clicking on the card but not on a button
    },
    handleBuy() {
      this.$emit("buyItem", this.item);
    },
    handleRemove() {
      this.$emit("removeItem", this.item.id);
    },
    handleImageError() {
      this.imageSrc = "https://via.placeholder.com/50";
    },
  },
};
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between; /* Adjusted for consistent spacing */
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
  margin: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}
.item-info {
  text-align: center;
  margin-top: 10px;
}
.item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}
.buy-btn,
.remove-btn {
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
}
.buy-btn {
  background-color: #4caf50; /* Green */
  color: white;
}
.remove-btn {
  background-color: #f44336; /* Red */
  color: white;
}
</style>
