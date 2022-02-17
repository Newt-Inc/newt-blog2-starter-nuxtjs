<template>
  <NuxtLink v-if="article" class="Article" :to="`/article/${article.slug}`">
    <div class="Article_Eyecatch">
      <template v-if="article.coverImage">
        <img :src="article.coverImage.src" alt="" />
      </template>
      <template v-else>
        <div class="Article_EyecatchEmpty">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="#CCCCCC"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"
            />
          </svg>
        </div>
      </template>
    </div>
    <div class="Article_Data">
      <h3 class="Article_Title">{{ article.title }}</h3>
      <ul class="Article_Tags">
        <li v-for="tag in article.tags" :key="tag._id">#{{ tag.name }}</li>
      </ul>
      <div class="Article_Author">
        <template v-if="article.author && article.author.profileImage">
          <img
            :src="article.author.profileImage.src"
            alt=""
            width="32"
            height="32"
          />
        </template>
        <template v-else>
          <div class="Article_AuthorEmpty">
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
          </div>
        </template>
        <div class="Article_AuthorData">
          <span>{{ authorName }}</span>
          <time
            :datetime="formatDate(article._sys.createdAt).replace(/\//gm, '-')"
            >{{ formatDate(article._sys.createdAt) }}</time
          >
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
import { formatDate } from 'utils/date'

export default {
  props: {
    article: {
      type: Object,
      default: null,
    },
  },
  computed: {
    authorName() {
      return (this.article.author && this.article.author.fullName) || 'NO NAME'
    },
  },
  methods: {
    formatDate(dateStr) {
      return dateStr ? formatDate(dateStr) : ''
    },
  },
}
</script>

<style scoped>
.Article {
  display: block;
  align-items: center;
  color: #333;
  text-decoration: none;
  overflow: hidden;
  padding: 0;
  margin: 0 0 40px 0;
}
.Article:last-child {
  margin: 0 0 28px 0;
}
.Article_Eyecatch {
  width: 100%;
  height: 0;
  padding: 52.5% 0 0 0;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  margin: 0 0 12px 0;
  position: relative;
}
.Article_Eyecatch > img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.Article_EyecatchEmpty {
  background: #f8f8f8;
  width: 280px;
  height: 147px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Article_Data {
  flex: 1;
}
.Article_Title {
  font-size: 1.8rem;
  line-height: 1.5;
  margin: 0 0 10px;
  padding: 0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.Article_Tags {
  margin: 0 0 8px;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.Article_Tags li {
  margin: 0 4px 4px 0;
  padding: 0 4px;
  list-style: none;
  font-size: 1.2rem;
  color: #888;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}
.Article_Author {
  display: flex;
  align-items: center;
}
.Article_Author > img {
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin: 0 12px 0 0;
  flex-shrink: 0;
}
.Article_Author img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  font-family: 'object-fit: cover'; /* IE11 */
}
.Article_AuthorEmpty {
  width: 32px;
  height: 32px;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  margin: 0 12px 0 0;
  flex-shrink: 0;
}
.Article_AuthorData {
  flex: 1;
}
.Article_AuthorData span {
  font-size: 1.2rem;
  font-weight: 700;
  display: block;
  line-height: 1.5;
}
.Article_AuthorData time {
  font-size: 1.2rem;
  display: block;
  color: #888;
  line-height: 1.5;
}
@media (min-width: 600px) {
  .Article {
    display: flex;
    border-bottom: 1px solid #e5e5e5;
    padding: 0 0 36px;
    margin: 0 0 36px;
  }
  .Article:hover .Article_Title {
    text-decoration: underline;
  }
  .Article:last-child {
    border-bottom: none;
    padding: 0 0 20px 0;
  }
  .Article_Eyecatch {
    width: 280px;
    height: 147px;
    margin: 0 28px 0 0;
    padding: 0;
  }
  .Article_Eyecatch img {
    width: 280px;
    height: 147px;
  }
  .Article_Title {
    margin: 0 0 12px;
  }
  .Article_Tags {
    margin: 0 0 16px;
  }
}
</style>
