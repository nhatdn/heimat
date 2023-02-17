<template>
  <div class="edit-blog">
    <loader v-if="loading" />
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
              v-for="item in categoryList"
              :value="item._id"
              :key="item._id"
            >
              {{ item.name }}
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
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error: </span>{{ this.errorMsg }}</p>
      </div>
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
// const ImageDrop = require("quill-image-drop-module").default;
Quill.register("modules/imageResize", ImageResize);
// Quill.register("modules/imageDrop", ImageDrop);
export default {
  name: "EditBlog",
  data() {
    return {
      loading: null,
      file: null,
      error: null,
      errorMsg: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  computed: mapGetters({
    blog: "blog/getCurrentBlog",
    categoryList: "category/getCategoryList",
  }),
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
    },

    async handleBlog() {
      if (!(this.blog.title && this.blog.content)) {
        this.displayError(
          "Please ensure the title and the content of the post have been filled!"
        );
        return;
      }
      this.setupBlogData();
      const temp = JSON.stringify(this.blog);
      let formData = new FormData();
      formData.append("blog", temp);
      if (this.file) {
        formData.append("cover", this.file);
      }
      const res = await BlogRepository.update(this.blog._id, formData);

      if (res.status == 200) {
        this.$router.push({
          name: "ViewBlog",
          params: { blogId: this.blog._id },
        });
      } else {
        console.log(res);
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
  },
};
</script>
<style lang="scss">
@import "@/scss/default.scss";
</style>

<style lang="scss" scoped>
@import "./blog";
</style>
