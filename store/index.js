export const state = () => ({
  posts: null
})

export const mutations = {
  updatePosts: (state, posts) => {
    state.posts = posts
  }
}

export const actions = {
  async getPosts ({ commit }) {
    try {
      if (!this.$contentful.client) {
        return
      }
      const response = await this.$contentful.client.getEntries({
        content_type: 'blogPost'
      })
      if (response.items.length > 0) {
        commit('updatePosts', response.items)
      }
    } catch (err) {
    }
  }
}
