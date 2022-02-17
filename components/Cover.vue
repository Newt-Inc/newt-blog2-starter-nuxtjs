<template>
  <div class="Cover" :style="'background-image: url(' + img + ');'">
    &nbsp;
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: '',
    }
  }
}
</script>

<style scoped>
.Cover {
  width: 100%;
  height: 180px;
  background-size: cover;
  background-position: center center;
}
@media (min-width: 600px) {
  .Cover {
    height: 280px;
  }
}
</style>