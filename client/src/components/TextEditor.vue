<script>
import Quill from 'quill'

export default {
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.initializeEditor()
  },
  data () {
    return {
      editorContent: null,
      editorInstance: null,
      editorOptions: {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
            [{ color: [] }, { background: [] }],
            ['clean'],
            ['link', 'image', 'video'],
            [{ direction: 'rtl' }]
          ]
        },
        theme: 'snow',
        formats: ['bold', 'underline', 'header', 'italic']
      }
    }
  },
  methods: {
    initializeEditor () {
      // wraps everything inside a new el to prevent double content on refresh
      const editor = document.createElement('div')
      this.$refs.editorContainer.append(editor)

      // Create the Quill instance
      this.editorInstance = new Quill(editor, this.editorOptions)

      // Setup handler for whenever things change inside Quill
      this.editorInstance.on('text-change', this.onEditorContentChange)
    },
    onEditorContentChange () {
      this.$emit('updateData', this.editorInstance.getText())
    }
  },
  beforeUnmount () {
    // Turn off all listeners set on text-change
    this.editorInstance.off('text-change')
  }
}
</script>

<template>
    <div ref="editorContainer"></div>
</template>

<style lang="scss">
  @import '~quill/dist/quill.snow.css'
</style>
