<script>
// @ is an alias to /src
import TextEditor from '@/components/TextEditor';

const DEBOUNCE_DELAY = 1000;

export default {
  name: 'MainEditor',
  components: {
    TextEditor
  },
  data () {
    return {
      content: null,
      debounce: null,
    }
  },
  methods: {
    updateData (content) {
      this.content = content
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.updateToServer(content)
      }, DEBOUNCE_DELAY)
    },
    updateToServer (content) {
      console.log(content)
    }
  }
}
</script>

<template>
  <TextEditor @updateData="updateData" :value="content" />
</template>

<style lang="scss" scoped>

</style>
