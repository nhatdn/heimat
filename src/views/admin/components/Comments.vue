<template>
  <div class="content">
    <div class="content-wrapper">
      <div class="content-header">
        <h3 class="content-title">Manage Comments</h3>
      </div>
      <div class="content-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Comments Table</h4>
            <p class="card-description">
              Total: <span> {{ listComments.length }}</span> comments
            </p>
            <div class="card-table">
              <table class="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Commenter</th>
                    <th>Content</th>
                    <th>Blog</th>
                    <th>Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in listComments.reverse()"
                    :key="index"
                  >
                    <td>{{ item._id }}</td>
                    <td>{{ item.user[0].username }}</td>
                    <td :title="item.content">
                      <router-link
                        :to="{
                          name: 'ViewBlog',
                          params: {
                            blogId: item.blog[0]._id,
                            comment_id: item._id,
                          },
                        }"
                        class="direct"
                        >{{ item.content }}</router-link
                      >
                    </td>
                    <!-- <td :title="item.content">
                      {{ item.content }}
                      {{
                        item.content.length > 20
                          ? item.content.substring(0, 20) + "..."
                          : item.content
                      }}
                    </td> -->
                    <td>{{ item.blog[0].title }}</td>
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
                      <icon class="icon icon-delete" name="trash"></icon>
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
import { CommentRepository } from "@/repositories/";

export default {
  name: "Comments",
  data() {
    return {
      listComments: [],
    };
  },
  created() {
    this.getAllListComment();
  },
  methods: {
    async getAllListComment() {
      const response = await CommentRepository.allComments();
      console.log(response);
      this.listComments = response.data.result;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "admin";
table {
  tr {
    display: grid;
    grid-template-columns: 1fr 1fr 3fr 3fr 1fr 1fr;
  }
  tbody {
    td {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      word-wrap: no-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
