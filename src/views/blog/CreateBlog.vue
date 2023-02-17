<template>
  <div class="create-blog">
    <div class="blog container">
      <div class="blog__info">
        <div class="blog__title">
          <input
            type="text"
            placeholder="Enter Title Of The Blog"
            v-model="blog.title"
          />
        </div>
        <div class="blog__description">
          <input
            type="text"
            placeholder="Enter The Blog Description (optional)"
            v-model="blog.description"
          />
        </div>
        <div class="blog__category">
          <select
            name="blog-category"
            id="select-blog-category"
            v-model="blog.category_id"
          >
            <option
              v-for="category in categoryList"
              :value="category._id"
              :key="category._id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="blog__upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            accept=".png, .jpg, .jpeg"
            @change="fileChange"
          />
          <!-- <button class="preview">Preview Photo</button> -->
          <div class="">
            <span>File Chosen: </span>
            <transition name="slide-fade">
              <p v-show="this.file">
                {{ this.file ? this.file.name : "" }}
              </p>
            </transition>
          </div>
        </div>
      </div>
      <div class="blog__editor">
        <vue-editor v-model="blog.content" />
      </div>
      <error :error="error" @click="toggleError">{{ errorMsg }} </error>
      <div class="blog__actions">
        <button class="blog__btn" @click="handleBlog">publish blog</button>
        <!-- <button class="blog__btn">post preview</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { BlogRepository } from "@/repositories";
import Quill from "quill";
import { mapGetters } from "vuex";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
import Error from "@/components/notify/Error.vue";

export default {
  name: "CreateBlog",
  components: { Error },
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      blog: {
        title: null,
        content: null,
        description: null,
        category_id: null,
      },
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  computed: mapGetters({ categoryList: "category/getCategoryList" }),
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
    },
    async handleBlog() {
      if (this.blog.title && this.blog.content) {
        if (this.file) {
          this.setupBlogData();
          const temp = JSON.stringify(this.blog);
          let formData = new FormData();

          formData.append("cover", this.file);
          formData.append("blog", temp);

          const res = await BlogRepository.create(formData);

          if (res.status == 200) {
            this.$router.push({
              name: "ViewBlog",
              params: { blogId: res.data.result._id },
            });
          } else {
            console.log(res);
          }
          return;
        } else this.displayError("Please ensure you uploaded a cover photo!");
      } else {
        this.displayError(
          "Please ensure the title and the content of the post have been filled!"
        );
      }
    },

    setupBlogData() {
      if (!this.blog.description) {
        this.blog.description = this.blog.content
          .replace(/<\/?[^>]+(>|$)/g, " ")
          .slice(0, 255);
      }
      this.blog.created_date = new Date();
      this.blog.created_date = this.blog.created_date.toString();
    },

    displayError(message) {
      this.error = true;
      this.errorMsg = message;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    },

    toggleError() {
      this.error = false;
    },
  },
};
</script>
<style lang="scss">
@import "@/scss/default.scss";
</style>

<style lang="scss" scoped>
@import "./blog";
</style>
