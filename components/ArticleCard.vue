<template>
  <article v-if="article" class="Article">
    <NuxtLink :to="`/article/${article.slug}`" class="Article_Link">
      <div class="Article_Eyecatch">
        <template v-if="article.coverImage">
          <img :src="article.coverImage.src" alt="" />
        </template>
        <template v-else>
          <div class="Article_EyecatchEmpty">
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" fill="#CCCCCC"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/></svg>
          </div>
        </template>
      </div>
      <div class="Article_Inner">
        <h2 class="Article_Title">{{article.title}}</h2>
        <div class="Article_Content">
          <div class="Article_Data">
            <div class="Article_Avatar">
              <template v-if="article.author && article.author.profileImage">
                <img :src="article.author.profileImage.src" alt="" width="32" height="32" />
              </template>
              <template v-else>
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="#CCCCCC"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </template>
            </div>
            <div class="Article_DataText">
              <div class="Article_AuthorName">{{authorName}}</div>
              <time :datetime="formatDate(article._sys.createdAt).replace(/\//gm, '-')" class="Article_Date">{{formatDate(article._sys.createdAt)}}</time>
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script>
import { formatDate } from 'utils/date'

export default {
  props: {
    article: {
      type: Object,
      default: null
    }
  },
  computed: {
    authorName() {
      return (this.article.author && this.article.author.fullName) || 'NO NAME'
    }
  },
  methods: {
    formatDate(dateStr) {
      return dateStr ? formatDate(dateStr) : ''
    }
  }
}
</script>

<style scoped>
.Article {
  border: 1px solid #e5e5e5;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.05);
  border-radius: 4px;
  margin: 0 0 16px 0;
  width: 100%;
}
.Article_Link {
  display: flex;
  padding: 0;
  line-height: 1.5;
  color: #333;
  text-decoration: none;
  border-radius: 3px;
  transition: background .2s;
  background: #fff;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.Article_Link:hover {
  background: #f8f8f8;
}
.Article_Link:active {
  background: none;
  transition: none;
}
.Article_Eyecatch {
  width: 100%;
  position: relative;
}
.Article_Eyecatch::before {
  content: "";
  padding-top: 54%;
  display: block;
}
.Article_EyecatchInner {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.Article_Eyecatch > img {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  object-fit: cover;
  font-family: 'object-fit: cover'; /* IE11 */
  width: 100%;
  height: 100%;
}
.Article_EyecatchEmpty {
  background: rgba(0,0,0,.05);
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Article_Inner {
  padding: 16px;
  flex: 1 auto;
  display: flex;
  flex-direction: column;
}
.Article_Title {
  font-size: 1.4rem;
  margin: 0 0 12px 0;
  padding: 0;
}
.Article_Content {
  margin: auto 0 0 0;
  display: flex;
  align-items: center;
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
  background: rgba(0,0,0,0.05);
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
  font-size: 1.2rem;
  font-weight: bold;
}
.Article_Date {
  font-size: 1.2rem;
  color: #888;
}
.Article_Fav {
  margin: 0 8px 0 auto;
  display: flex;
  align-items: center;
}
.Article_Fav > em {
  font-size: 1.2rem;
  font-style: normal;
  margin: 0 0 0 4px;
  color: #888;
}
@media (min-width: 600px) {
  .Article {
    margin: 0 12px 24px 0;
    width: calc(50% - 14px);
  }
  .Article:nth-child(2n) {
    margin: 0 0 24px auto;
  }
}
@media (min-width: 960px) {
  .Article {
    margin: 0 24px 24px 0;
    width: calc(33.333% - 18px);
  }
  .Article:nth-child(2n) {
    margin: 0 24px 24px 0;
  }
  .Article:nth-child(3n) {
    margin: 0 0 24px 0;
  }
}
</style>