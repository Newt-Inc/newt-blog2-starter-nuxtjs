<template>
  <main class="Container">
    <article v-if="currentArticle" class="Article">
      <div class="Article_Header">
        <h1 class="Article_Title">{{ currentArticle.title }}</h1>
        <div class="Article_Data">
          <div class="Article_Avatar">
            <template
              v-if="currentArticle.author && currentArticle.author.profileImage"
            >
              <img
                :src="currentArticle.author.profileImage.src"
                alt=""
                width="32"
                height="32"
              />
            </template>
            <template v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="#CCCCCC"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
            </template>
          </div>
          <div class="Article_AuthorName">{{ authorName }}</div>
          <time :datetime="publishDateForAttr" class="Article_Date">{{
            publishDate
          }}</time>
        </div>
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="Article_Body" v-html="currentArticle.body"></div>
      <aside class="Author">
        <div class="Author_Avatar">
          <template
            v-if="currentArticle.author && currentArticle.author.profileImage"
          >
            <img
              :src="currentArticle.author.profileImage.src"
              alt=""
              width="48"
              height="48"
            />
          </template>
          <template v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28px"
              height="28px"
              viewBox="0 0 24 24"
              fill="#CCCCCC"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </template>
        </div>
        <div class="Author_Text">
          <div class="Author_Name">{{ authorName }}</div>
          <!-- eslint-disable vue/no-v-html -->
          <div class="Author_Description" v-html="authorSelfIntroduction"></div>
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </aside>
    </article>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate } from 'utils/date'
import { toPlainText } from '../../utils/markdown'

export default {
  async asyncData({ $config, store, params }) {
    await store.dispatch('fetchApp', $config)
    await store.dispatch('fetchCurrentArticle', {
      ...$config,
      slug: params.slug,
    })
    return {}
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.ogImage,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['app', 'currentArticle']),
    meta() {
      if (this.currentArticle && this.currentArticle.meta) {
        return this.currentArticle.meta
      }
      return null
    },
    title() {
      if (this.meta && this.meta.title) {
        return this.meta.title
      }
      if (this.currentArticle && this.currentArticle.title) {
        return this.currentArticle.title
      }
      return this.app && (this.app.name || this.app.uid || 'Docs')
    },
    description() {
      if (this.meta && this.meta.description) {
        return this.meta.description
      }
      if (this.currentArticle && this.currentArticle.body) {
        return toPlainText(this.currentArticle.body).slice(0, 200)
      }
      return ''
    },
    ogImage() {
      if (this.meta && this.meta.ogImage) {
        return this.meta.ogImage.src
      }
      return ''
    },
    publishDate() {
      return this.currentArticle && this.currentArticle._sys.createdAt
        ? formatDate(this.currentArticle._sys.createdAt)
        : ''
    },
    publishDateForAttr() {
      return this.publishDate.replace(/\//g, '-')
    },
    authorName() {
      return (
        (this.currentArticle &&
          this.currentArticle.author &&
          this.currentArticle.author.fullName) ||
        'NO NAME'
      )
    },
    authorSelfIntroduction() {
      return (
        (this.currentArticle &&
          this.currentArticle.author &&
          this.currentArticle.author.introduction) ||
        ''
      )
    },
  },
}
</script>

<style scoped>
.Article {
  padding: 24px;
  margin: 0 auto;
}
.Article_Header {
  margin: 0 0 24px 0;
}
.Article_Title {
  font-size: 2.4rem;
  line-height: 1.5;
  font-weight: bold;
  margin: 0 0 16px 0;
  padding: 0;
}
.Article_Data {
  display: flex;
  align-items: center;
}
.Article_Avatar {
  width: 32px;
  height: 32px;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 12px 0 0;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}
.Article_Avatar img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  font-family: 'object-fit: cover'; /* IE11 */
}
.Article_AuthorName {
  font-weight: bold;
  margin: 0 8px 0 0;
}
.Article_Date {
  color: #888;
}
.Article_Body {
  padding: 0 0 28px 0;
}
.Article_Body >>> h1,
.Article_Body >>> h2,
.Article_Body >>> h3,
.Article_Body >>> h4,
.Article_Body >>> h5,
.Article_Body >>> h6 {
  padding: 0;
  margin: 40px 0 24px 0;
  line-height: 1.4;
}
.Article_Body >>> h1 {
  font-size: 2.4rem;
}
.Article_Body >>> h2 {
  font-size: 2.2rem;
}
.Article_Body >>> h3 {
  font-size: 2rem;
}
.Article_Body >>> h4 {
  font-size: 1.8rem;
}
.Article_Body >>> h5 {
  font-size: 1.6rem;
}
.Article_Body >>> h6 {
  font-size: 1.4rem;
}
.Article_Body >>> p {
  margin: 0 0 24px 0;
}
.Article_Body >>> img {
  max-width: 100%;
  height: auto;
  margin: 32px auto;
  display: block;
}
.Article_Body >>> ul,
.Article_Body >>> ol {
  margin: 0;
  padding: 0 0 16px 40px;
}
.Article_Body >>> ul li,
.Article_Body >>> ol li {
  margin: 0 0 4px 0;
  padding: 0;
}
.Article_Body >>> ul li ul,
.Article_Body >>> ul li ol,
.Article_Body >>> ol li ol,
.Article_Body >>> ol li ul {
  padding: 0 0 0 20px;
}
.Article_Body >>> blockquote {
  border-left: 4px solid #ccc;
  padding: 0 0 0 40px;
  margin: 0 0 20px 0;
}
.Article_Body >>> pre {
  background: #333;
  color: #fff;
  border-radius: 4px;
  padding: 16px 20px;
  margin: 0 0 20px 0;
  font-size: 1.4rem;
  line-height: 1.6;
  overflow: auto;
  font-family: 'Segoe UI Emoji', 'Helvetica Neue', Arial,
    'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
}
.Article_Body >>> code {
  border: 1px solid #ddd;
  background: #f8f8f8;
  border-radius: 4px;
  padding: 2px 4px;
  margin: 0 4px;
  color: #e01d5a;
  font-size: 1.4rem;
  font-family: 'Segoe UI Emoji', 'Helvetica Neue', Arial,
    'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
}
.Article_Body >>> pre code {
  border: none;
  background: none;
  border-radius: 0;
  padding: 0;
  margin: 0;
  color: #fff;
}
.Fav {
  display: flex;
  align-items: center;
}
.Fav_Button {
  border: none;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06), 0 3px 10px -8px rgba(0, 0, 0, 1);
  position: relative;
  cursor: pointer;
}
.Fav_Button:focus {
  outline: none;
}
.Fav_Button:focus::after {
  content: '';
  border: 2px solid #005fcc;
  position: absolute;
  left: 0;
  top: 0;
  width: 36px;
  height: 36px;
  border-radius: 20px;
  z-index: 0;
}
.Fav._on .Fav_Button:focus::after {
  border: 2px solid #e0245e;
}
.Fav_Button:hover > svg {
  fill: #888;
}
.Fav_Button:active {
  transform: scale(0.96);
}
.Fav_Button > svg {
  position: absolute;
  left: 12px;
  top: 12px;
  height: 18px;
  width: 16px;
  display: block;
  fill: #ccc;
  transition: fill 0.2s;
}
.Fav > em {
  font-style: normal;
  font-weight: bold;
  color: #888;
  margin: 0 0 0 12px;
}
.Fav._on .Fav_Button > svg {
  fill: #e0245e;
  transition: none;
}
.Fav._on > em {
  color: #e0245e;
}
.Author {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 24px;
  display: flex;
  margin: 0 0 40px 0;
}
.Author_Avatar {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  overflow: hidden;
  margin: 0 16px 0 0;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}
.Author_Avatar img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  font-family: 'object-fit: cover'; /* IE11 */
}
.Author_Name {
  margin: 0 0 4px 0;
  padding: 0;
  font-weight: bold;
  line-height: 1.5;
}
.Author_Description {
  margin: 0;
  padding: 0;
  line-height: 1.5;
  font-size: 1.2rem;
}
.Author_Description >>> p {
  margin: 0;
  padding: 0;
}
@media (min-width: 600px) {
  .Article {
    max-width: 700px;
    padding: 60px;
  }
  .Article_Header {
    margin: 0 0 48px 0;
  }
}
</style>
