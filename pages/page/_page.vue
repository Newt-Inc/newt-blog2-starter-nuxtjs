<template>
  <main class="Container">
    <Cover v-if="app && app.cover && app.cover.value" :img="app.cover.value" />
    <div class="Articles">
      <Dropdown :categories="categories" />
      <div class="Inner">
        <ArticleCard
          v-for="article in articles"
          :key="article._id"
          :article="article"
        />
      </div>
      <Pagination :total="total" :current="pageNumber" />
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSiteName } from 'utils/head'

export default {
  async asyncData({ $config, store, redirect, params }) {
    await store.dispatch('fetchApp', $config)
    await store.dispatch('fetchCategories', $config)

    const pageNumber = Number(params.page)
    if (Number.isNaN(pageNumber)) return redirect(302, '/')
    await store.dispatch('fetchArticles', {
      ...$config,
      page: pageNumber,
    })

    return {
      pageNumber,
    }
  },
  head() {
    return {
      title: getSiteName(this.app),
    }
  },
  computed: {
    ...mapGetters(['app', 'articles', 'total', 'categories']),
  },
}
</script>

<style scoped>
.Articles {
  padding: 24px 24px 40px 24px;
  margin: 0 auto;
}
.Inner {
  display: flex;
  flex-wrap: wrap;
}
@media (min-width: 600px) {
  .Articles {
    padding: 60px;
  }
}
@media (min-width: 960px) {
  .Articles {
    max-width: 1024px;
  }
}
</style>
