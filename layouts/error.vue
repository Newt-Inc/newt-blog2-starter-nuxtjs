<template>
  <div class="Error">
    <span class="Error_Emoji">😵</span>
    <h1 v-if="error.statusCode === 404" class="Error_Message">
      Page not found
    </h1>
    <h1 v-else class="Error_Message">
      An error occurred
    </h1>
    <NuxtLink to="/" class="Error_Link">Back to the home page</NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
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
  font-family: 'Segoe UI Emoji', 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
  -webkit-text-size-adjust: 100%;
  height: 100%;
  overflow-wrap: break-word;
}
#__nuxt,
#__layout {
  height: 100%;
}
a {
  color: #006CDC;
  text-decoration: underline;
}
a:hover {
  text-decoration: none;
}
</style>

<style scoped>
.Error {
  flex: 1 auto;
  height: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.Error_Emoji {
  font-size: 4rem;
  line-height: 1;
  margin: 0 0 16px 0;
}
.Error_Message {
  font-size: 1.8rem;
  margin: 0 0 4px 0;
  padding: 0;
}
.Error_Link {
  font-size: 1.4rem;
}
</style>