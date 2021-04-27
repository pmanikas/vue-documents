<script>
import Quill from "quill";
import io from "socket.io-client";

const DEFAULT_SAVE_INTEVAL_MS = 2000;
const DEFAULT_FILENAME = "Untitled document";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default {
  name: "TextEditor",
  async mounted() {
    this.id = this.$route.params.id;
    await this.initializeEditor();
    await this.initialiseSocketConnection();
    this.getDocumentFromSocket();
  },
  data() {
    return {
      socket: null,
      editorInstance: null,
      id: null,
      interval: null,
      filename: DEFAULT_FILENAME,
      saveIntervalMs: DEFAULT_SAVE_INTEVAL_MS,
      editorOptions: {
        modules: { toolbar: TOOLBAR_OPTIONS },
        theme: "snow",
      },
    };
  },
  methods: {
    initializeEditor() {
      const editor = document.createElement("div");
      this.$refs.editorContainer.append(editor);
      this.editorInstance = new Quill(editor, this.editorOptions);

      this.editorInstance.disable();
      this.editorInstance.setText("Loading...");
      this.editorInstance.on("text-change", this.onEditorContentChange);
    },

    initialiseSocketConnection() {
      this.socket = io("http://localhost:3001");
      this.socket.on("receive-changes", this.receiveDeltaFromSocket);
    },

    getDocumentFromSocket() {
      this.socket.once("load-document", (document) => {
        const { data, filename } = document;
        this.filename = filename;
        this.editorInstance.enable();
        this.editorInstance.setContents(data);
      });

      this.socket.emit("get-document", {
        filename: this.filename,
        documentId: this.id,
      });

      this.interval = setInterval(() => {
        this.socket.emit("save-document", {
          filename: this.filename,
          data: this.editorInstance.getContents(),
        });
      }, this.saveIntervalMs);
    },

    receiveDeltaFromSocket(delta) {
      this.editorInstance.updateContents(delta);
    },

    onEditorContentChange(delta, oldDelta, source) {
      // we need to make sure that change is made by current user
      if (source !== "user") return;
      this.socket.emit("send-changes", delta);
    },
  },
  beforeUnmount() {
    // Turn off all listeners set on text-change
    this.editorInstance.off("text-change", this.onEditorContentChange);
    if (this.socket) {
      this.socket.disconnect();
      this.socket.off("receive-changes", this.receiveDeltaFromSocket);
    }
    if (this.interval) clearInterval(this.interval);
  },
};
</script>

<template>
  <div>
    <div class="header">
      <input placeholder="Enter Filename..." type="text" class="header__filename" v-model="filename" />
    </div>
    <div ref="editorContainer"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "~../styles/design";

.header {
  padding: $s-base-spacing;
  background: $c-white;
  &__filename {
    padding: $s-xs $s-s;
    background: transparent;
    border-radius: 4px;
    border: none;
    font-size: 1.25rem;
  }
}

@media print {
  .header {
    display: none;
  }
}
</style>
