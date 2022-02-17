<template>
  <div ref="Dropdown" class="Dropdown">
    <button type="button" class="Dropdown_Button" @click="toggle">
      <span>{{ selectedCategory ? selectedCategory.name : 'All articles'}}</span>
      <svg width="12" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M5.95477076 6.81206945c-.23590466-.01386477-.46783341-.11091814-.6480754-.29116012L.69289267 1.90710664l-.07770636-.08722082C.30436085 1.42736817.33026297.85552277.69289267.49289307c.39052429-.39052429 1.02368927-.39052429 1.41421356 0l3.90889322 3.91017638L9.92669536.49289307c.3905243-.39052429 1.02368928-.39052429 1.41421357 0 .3626297.3626297.38853182.9344751.07770636 1.32699275l-.07770636.08722082-4.6138027 4.61380269c-.18024198.18024198-.41217073.27729535-.64807539.29116012z" fill="#333" fill-rule="nonzero"/></svg>
    </button>
    <div v-if="isOpen" class="Dropdown_List">
      <NuxtLink v-for="category in categoriesWithAll" :key="category._id" :to="category.slug ? `/category/${category.slug}` : `/`" class="Dropdown_Item">
      {{ category.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    selected: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    categoriesWithAll() {
      return [
        {
          name: 'All articles',
          slug: ''
        },
        ...this.categories
      ]
    },
    selectedCategory() {
      return this.categories.find((category) => category.slug === this.selected)
    }
  },
  mounted() {
    window.addEventListener('touchstart', this.closeDropDown)
    window.addEventListener('click', this.closeDropDown)
  },
  beforeDestroy() {
    window.removeEventListener('touchstart', this.closeDropDown)
    window.removeEventListener('click', this.closeDropDown)
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    closeDropDown(e) {
      if (!this.$refs.Dropdown.contains(e.target)) {
        this.isOpen = false
      }
    }
  },
}
</script>

<style scoped>
.Dropdown {
  position: relative;
  display: inline-block;
  margin: 0 0 24px 0;
}
.Dropdown_Button {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  padding: 0 12px;
  transition: background .2s;
  font-size: 1.4rem;
  color: #333;
  border: 1px solid #CCC;
  height: 36px;
}
.Dropdown_Button:hover {
  background: #f8f8f8;
}
.Dropdown_Button:active {
  background: none;
  transition: none;
}
.Dropdown_Button > span {
  font-weight: bold;
  margin: 0 8px 0 0;
}
.Dropdown_List {
  position: absolute;
  left: 0;
  top: 35px;
  background: #fff;
  z-index: 1;
  box-shadow: 0 0 0 1px rgba(0,0,0,.07), 0 8px 16px -4px rgba(0,0,0,.3);
  border-radius: 4px;
  min-width: 180px;
  max-width: 300px;
  padding: 6px 0;
  max-height: 180px;
  overflow: auto;
}
.Dropdown_Item {
  display: block;
  color: #333;
  text-decoration: none;
  transition: background .2s;
  padding: 8px 16px;
  font-weight: bold;
  line-height: 1.5;
}
.Dropdown_Item:hover {
  background: #f8f8f8;
}
.Dropdown_Item:active {
  background: none;
  transition: none;
}
</style>