import Vue from "vue";
import VueRouter from "vue-router";
import TextEditor from "./../views/TextEditor.vue";
import { v4 as uuidV4 } from "uuid";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: "TextEditor",
      params: { id: uuidV4() },
    },
  },
  {
    path: "/document/:id",
    name: "TextEditor",
    component: TextEditor,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
