import { createClient } from 'newt-client-js'

export const state = () => ({
  app: null,
  articles: [],
  total: 0,
  tags: [],
  currentArticle: null,
  previousArticle: null,
  nextArticle: null,
  authors: [],
  archives: [],
})

export const getters = {
  app: (state) => state.app,
  articles: (state) => state.articles,
  total: (state) => state.total,
  tags: (state) => state.tags,
  currentArticle: (state) => state.currentArticle,
  previousArticle: (state) => state.previousArticle,
  nextArticle: (state) => state.nextArticle,
  authors: (state) => {
    return state.authors.filter((author) => author.total > 0)
  },
  popularTags: (state) => {
    return state.tags
      .filter((tag) => tag.total > 0)
      .sort((tag1, tag2) => (tag1.total > tag2.total ? -1 : 1))
      .slice(0, 10)
  },
  archives: (state) => state.archives,
}

export const mutations = {
  setApp(state, app) {
    state.app = app
  },
  setArticles(state, articles) {
    state.articles = articles
  },
  setTotal(state, total) {
    state.total = total
  },
  setTags(state, tags) {
    state.tags = tags
  },
  setCurrentArticle(state, currentArticle) {
    state.currentArticle = currentArticle
  },
  setPreviousArticle(state, previousArticle) {
    state.previousArticle = previousArticle
  },
  setNextArticle(state, nextArticle) {
    state.nextArticle = nextArticle
  },
  setAuthors(state, authors) {
    state.authors = authors
  },
  setArchives(state, archives) {
    state.archives = archives
  },
}

export const actions = {
  async fetchApp({ commit }, { spaceUid, token, apiType, appUid }) {
    try {
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const app = await client.getApp({
        appUid,
      })
      commit('setApp', app)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchArticles(
    { commit },
    {
      spaceUid,
      articleModelUid,
      token,
      apiType,
      appUid,
      pageLimit,
      search,
      tag,
      page,
      query,
      author,
      year,
    }
  ) {
    try {
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const _query = {
        ...(query || {}),
      }
      if (search) {
        _query.or = [
          {
            title: {
              match: search,
            },
          },
          {
            body: {
              match: search,
            },
          },
        ]
      }
      if (tag) {
        _query.tags = tag
      }
      if (author) {
        _query.author = author
      }
      if (year) {
        _query['_sys.createdAt'] = {
          gte: new Date(year.toString()).toISOString(),
          lt: new Date((year + 1).toString()).toISOString(),
        }
      }
      const _page = page || 1
      const _limit = pageLimit || 10
      const _skip = (_page - 1) * _limit

      const { items, total } = await client.getContents({
        appUid,
        modelUid: articleModelUid,
        query: {
          depth: 2,
          limit: _limit,
          skip: _skip,
          ..._query,
        },
      })
      commit('setArticles', items)
      commit('setTotal', total)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchTags(
    { commit },
    { spaceUid, tagModelUid, articleModelUid, token, apiType, appUid }
  ) {
    try {
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const { items } = await client.getContents({
        appUid,
        modelUid: tagModelUid,
        query: {
          depth: 1,
        },
      })
      const tags = []

      // Get the number of articles per tag
      await items.reduce(async (prevPromise, tag) => {
        await prevPromise
        const { total } = await client.getContents({
          appUid,
          modelUid: articleModelUid,
          query: {
            tags: tag._id,
            select: ['slug'],
          },
        })
        tags.push({ ...tag, total })
      }, Promise.resolve())
      commit('setTags', tags)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchCurrentArticle(
    { commit },
    { spaceUid, articleModelUid, token, apiType, appUid, slug }
  ) {
    try {
      if (!slug) return commit('setCurrentArticle', null)
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const { items } = await client.getContents({
        appUid,
        modelUid: articleModelUid,
        query: {
          depth: 2,
          limit: 1,
          slug,
        },
      })
      commit('setCurrentArticle', items.length === 1 ? items[0] : null)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchPreviousArticle(
    { commit },
    { spaceUid, articleModelUid, token, apiType, appUid, createdAt }
  ) {
    try {
      if (!createdAt) return commit('setPreviousArticle', null)
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const { items } = await client.getContents({
        appUid,
        modelUid: articleModelUid,
        query: {
          depth: 1,
          limit: 1,
          select: ['slug'],
          order: ['-_sys.createdAt'],
          '_sys.createdAt': {
            lt: createdAt,
          },
        },
      })
      commit('setPreviousArticle', items.length === 1 ? items[0] : null)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchNextArticle(
    { commit },
    { spaceUid, articleModelUid, token, apiType, appUid, createdAt }
  ) {
    try {
      if (!createdAt) return commit('setNextArticle', null)
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const { items } = await client.getContents({
        appUid,
        modelUid: articleModelUid,
        query: {
          depth: 1,
          limit: 1,
          select: ['slug'],
          order: ['_sys.createdAt'],
          '_sys.createdAt': {
            gt: createdAt,
          },
        },
      })
      commit('setNextArticle', items.length === 1 ? items[0] : null)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchAuthors(
    { commit },
    { spaceUid, authorModelUid, articleModelUid, token, apiType, appUid }
  ) {
    try {
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const { items } = await client.getContents({
        appUid,
        modelUid: authorModelUid,
        query: {
          depth: 1,
        },
      })
      const authors = []

      // Get the number of articles per tag
      await items.reduce(async (prevPromise, author) => {
        await prevPromise
        const { total } = await client.getContents({
          appUid,
          modelUid: articleModelUid,
          query: {
            author: author._id,
            select: ['slug'],
          },
        })
        authors.push({ ...author, total })
      }, Promise.resolve())
      commit('setAuthors', authors)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchArchives(
    { commit },
    { spaceUid, articleModelUid, token, apiType, appUid }
  ) {
    const client = createClient({
      spaceUid,
      token,
      apiType,
    })
    const { items } = await client.getContents({
      appUid,
      modelUid: articleModelUid,
      query: {
        depth: 1,
        limit: 1,
        order: ['_sys.createdAt'],
        select: ['slug', '_sys.createdAt'],
      },
    })
    const oldestArticle = items[0] || null
    if (!oldestArticle) return commit('setArchives', [])

    let currentYear = new Date(
      (oldestArticle && oldestArticle._sys.createdAt) || new Date()
    ).getFullYear()
    const thisYear = new Date().getFullYear()

    const archives = []
    while (currentYear <= thisYear) {
      archives.splice(0, 0, {
        year: currentYear,
        count: 0,
      })
      currentYear++
    }
    await archives.reduce(async (prevPromise, archive) => {
      await prevPromise
      const { total } = await client.getContents({
        appUid,
        modelUid: articleModelUid,
        query: {
          depth: 1,
          limit: 1,
          select: ['slug'],
          '_sys.createdAt': {
            gte: new Date(archive.year.toString()).toISOString(),
            lt: new Date((archive.year + 1).toString()).toISOString(),
          },
        },
      })
      archive.count = total
    }, Promise.resolve())

    commit('setArchives', archives)
  },
}
