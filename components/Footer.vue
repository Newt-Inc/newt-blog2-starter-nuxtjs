<template>
  <footer class="Footer">
    <div class="Footer_Inner">
      <NuxtLink to="/" class="SiteName">
        <span
          v-if="icon && icon.type === 'emoji' && icon.value"
          class="SiteName_Icon"
          >{{ icon.value }}
        </span>
        <span
          v-else-if="icon && icon.type === 'image' && icon.value"
          class="SiteName_Icon"
        >
          <img :src="icon.value" />
        </span>
        <div class="SiteName_Text">{{ title }}</div>
      </NuxtLink>
      <div class="Link">
        <a
          href="https://github.com/Newt-Inc/newt-blog-starter-nuxtjs"
          rel="noreferrer noopener"
          target="_blank"
          >GitHub</a
        >
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    app: {
      type: Object,
      default: null,
    },
  },
  computed: {
    title() {
      return (this.app && (this.app.name || this.app.uid)) || 'Blog2'
    },
    icon() {
      return (this.app && this.app.icon) || { type: 'emoji', value: '✌️' }
    },
  },
}
</script>

<style scoped>
.Footer {
  background: #f8f8f8;
  margin: auto 0 0 0;
  padding: 0 24px;
}
.Footer_Inner {
  min-width: 0;
  display: flex;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
  padding: 16px 0;
}
@media (min-width: 600px) {
  .Footer {
    padding: 0 40px;
  }
}
.SiteName {
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
}
.SiteName:hover .SiteName_Text {
  text-decoration: underline;
}
.SiteName_Icon {
  font-size: 1.6rem;
  margin: 0 8px -2px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.SiteName_Icon img {
  width: 23px;
  height: 23px;
  object-fit: cover;
  font-family: 'object-fit: cover'; /* IE11 */
  border-radius: 4px;
}
.SiteName_Text {
  font-size: 1.4rem;
}
.Link {
  border-left: 1px solid #e5e5e5;
  padding: 0 0 0 16px;
  margin: 0 0 0 16px;
  line-height: 1.5;
}
.Link > a {
  color: #333;
  text-decoration: none;
}
.Link > a:hover {
  color: #333;
  text-decoration: underline;
}
</style>
