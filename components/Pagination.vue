<template>
  <nav class="Pagination">
    <ul class="Pagination_Items">
      <li v-for="page in pages" :key="page.number" class="Pagination_Item">
        <NuxtLink type="button" :to="`${basePath}/page/${page.number}`" :class="`Pagination_Button ${page.isCurrent ? '_current' : ''}`">{{page.number}}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    current: {
      type: Number,
      default: 1,
    },
    basePath: {
      type: String,
      default: '',
    }
  },
  computed: {
    pages() {
      return Array(Math.ceil(this.total / (this.$config.pageLimit || 10)))
        .fill({ number: 0, isCurrent: false })
        .map((value, index) => {
          const pageNumber = index + 1
          return {
            ...value,
            number: pageNumber,
            isCurrent: this.current === pageNumber
          }
        })
    }
  }
}
</script>

<style scoped>
.Pagination {
  padding: 16px 0;
}
.Pagination_Items {
  display: flex;
  margin: 0;
  padding: 0;
  align-item: center;
  justify-content: center;
}
.Pagination_Item {
  margin: 0 4px;
  padding: 0;
  list-style: none;
}
.Pagination_Button {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  color: #333;
  text-decoration: none;
  transition: background .2s;
  font-weight: bold;
  font-size: 1.2rem;
  background: none;
  cursor: pointer;
}
.Pagination_Button._current {
  border: 1px solid #333;
  background: #333;
  color: #fff;
}
.Pagination_Button._current:hover {
  background: #333;
}
.Pagination_Button:hover {
  background: #f8f8f8;
}
.Pagination_Button:active {
  background: none;
  transition: none;
}
</style>