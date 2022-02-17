<template>
  <main class="Container">
    <div v-if="articles.length > 0" class="Search">
      <p class="Search_Text">Found {{ total }} results for your search</p>
      <div class="Search_Results">
        <article v-for="article in articles" :key="article._id" class="Article">
          <NuxtLink :to="`/article/${article.slug}`" class="Article_Link">
            <h1 class="Article_Title">{{ article.title }}</h1>
            <p class="Article_Description">{{ toPlainText(article.body) }}</p>
          </NuxtLink>
        </article>
        <Pagination />
      </div>
    </div>
    <div v-else-if="isLoading === false" class="Empty">
      <div class="Empty_Emoji">😵</div>
      <h1 class="Empty_Title">Nothing found</h1>
      <p class="Empty_Description">
        Sorry, but nothing matched search terms…<br />Please try again with
        different keywords!
      </p>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { toPlainText } from 'utils/markdown'
import { getSiteName } from 'utils/head'

export default {
  async asyncData({ $config, store }) {
    await store.dispatch('fetchApp', $config)
    return {}
  },
  data() {
    return {
      isLoading: true,
    }
  },
  head() {
    return {
      title: getSiteName(this.app),
    }
  },
  computed: {
    ...mapGetters(['app', 'articles', 'total']),
  },
  async created() {
    await this.$store.dispatch('fetchArticles', {
      ...this.$config,
      search: this.$route.query.q || '',
      query: {
        body: {
          fmt: 'text',
        },
        limit: 100,
      },
    })
    this.isLoading = false
  },
  methods: {
    toPlainText,
  },
}
</script>

<style scoped>
.Container {
  flex: 1;
  display: flex;
}
.Search {
  margin: 0 auto;
  padding: 24px;
  width: 100%;
}
.Search_Text {
  padding: 0;
  margin: 0;
}
.Search_Results {
  padding: 24px 0 0 0;
}
.Article {
  border: 1px solid #e5e5e5;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin: 0 0 16px 0;
}
.Article_Link {
  display: block;
  padding: 16px;
  line-height: 1.5;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;
  background: #fff;
}
.Article_Link:hover {
  background: #f8f8f8;
}
.Article_Link:active {
  background: none;
  transition: none;
}
.Article_Title {
  font-size: 1.4rem;
  margin: 0 0 4px 0;
  padding: 0;
}
.Article_Description {
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
@media (min-width: 600px) {
  .Search {
    max-width: 700px;
    padding: 60px;
  }
  .Search_Text {
    padding: 0;
  }
  .Search_Results {
    padding: 24px 0 0 0;
  }
}
.Empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.Empty_Emoji {
  font-size: 4rem;
  line-height: 1;
  margin: 0 0 16px 0;
}
.Empty_Title {
  font-size: 1.8rem;
  margin: 0 0 4px 0;
  padding: 0;
}
.Empty_Description {
  font-size: 1.4rem;
  margin: 0;
  padding: 0;
  text-align: center;
}
</style>
