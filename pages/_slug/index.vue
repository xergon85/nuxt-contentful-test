<template>
  <section class="container">
    <p class="back">
      <nuxt-link to="/">
        ⟵ Back to Home
      </nuxt-link>
    </p>
    <h1>{{ post.fields.title }}</h1>
    <p class="author">
      By {{ post.fields.author.fields.name }}
    </p>
    <div
      class="image"
    />
    <article v-html="$md.render(post.fields.body)" />
  </section>
</template>

<script>
export default {
  data () {
    return {
      slug: this.$route.params.slug
    }
  },
  computed: {
    post () {
      const post = this.$store.state.posts.filter(
        el => el.fields.slug === this.slug
      )
      return post[0]
    }
  },
  head () {
    return {
      title: this.post.fields.title
    }
  }
}
</script>
