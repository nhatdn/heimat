<template>
  <div class="content">
    <div class="content-wrapper">
      <div class="content-header">
        <h3 class="content-title">Manage Blogs</h3>
      </div>
      <div class="content-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Blogs Table</h4>
            <p class="card-description">
              Total: <span>{{ ListBlogs.length }}</span> blogs
            </p>
            <div class="card-table">
              <table class="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in ListBlogs.reverse()" :key="index">
                    <td>{{ item._id }}</td>
                    <td>
                      <router-link
                        :to="{
                          name: 'ViewBlog',
                          params: {
                            blogId: item._id,
                          },
                        }"
                        class="direct"
                        >{{ item.title }}</router-link
                      >
                    </td>
                    <td>{{ item.category[0].name }}</td>
                    <td>{{ item.user[0].username }}</td>
                    <td>
                      {{ new Date(item.created_date).toLocaleDateString() }}
                    </td>
                    <td>
                      <icon
                        v-if="item.status != 'block'"
                        class="icon icon-lock"
                        name="eye-slash"
                        title="Hide from the publish view"
                      ></icon>
                      <icon
                        v-if="item.status != 'public'"
                        class="icon"
                        name="eye"
                        title="Show from the publish view"
                      ></icon>
                      <span @click="deleteBlog(item._id)"
                        ><icon
                          class="icon icon-delete"
                          name="trash"
                          title="Delete this post"
                        ></icon
                      ></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BlogRepository } from "@/repositories";

export default {
  name: "Blogs",
  data() {
    return {
      ListBlogs: [],
    };
  },
  created() {
    this.getAllBlogs();
  },
  methods: {
    async getAllBlogs() {
      const response = await BlogRepository.getAll();
      this.ListBlogs = response.data.result;
    },
    async deleteBlog(id) {
      await BlogRepository.delete(id);
      this.getAllBlogs();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "admin";
</style>
