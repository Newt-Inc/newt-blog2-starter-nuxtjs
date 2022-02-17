<template>
  <div class="Wrapper">
    <Header :title="title" :icon="icon" />
    <Nuxt />
    <Footer :title="title" :icon="icon" />
    <Badge />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['app']),
    title() {
      return (this.app && this.app.name) || 'Blog'
    },
    icon() {
      return (this.app && this.app.icon && this.app.icon.value) || '✏️'
    },
  },
}
</script>

<style>
html {
  font-size: 62.5%;
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  font-size: 1.4rem;
  line-height: 1.8;
  color: #333;
  font-family: 'Segoe UI Emoji', 'Helvetica Neue', Arial,
    'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
  -webkit-text-size-adjust: 100%;
  height: 100%;
  overflow-wrap: break-word;
}
#__nuxt,
#__layout {
  height: 100%;
}
a {
  color: #006cdc;
  text-decoration: underline;
}
a:hover {
  text-decoration: none;
}
</style>

<style>
.Wrapper {
  min-height: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
@media all and (-ms-high-contrast: none) {
  *::-ms-backdrop,
  .Wrapper {
    height: 100%;
  } /* IE11 */
}
</style>
