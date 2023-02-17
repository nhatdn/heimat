<template>
  <div>
    <div class="comment">
      <div
        class="comment-list list-comments"
        v-for="comment in listComments"
        :key="comment._id"
      >
        <div
          @mouseover="saveId = comment._id"
          @mouseleave="
            saveId = null;
            showOptions = false;
            checkEditComment = false;
          "
          class="comment-container container-comment"
          :class="outstanding == comment._id ? 'comment-selected' : ''"
        >
          <div class="comment-author author">
            <author
              :image="comment.author[0].avatar"
              :username="comment.author[0].username"
              :name="comment.author[0].fullname"
              :id="comment.author[0]._id"
            ></author>
            <span class="space"> - </span>
            <span class="comment-date create-date">{{
              timeSince(comment.created_date.toString())
            }}</span>
          </div>
          <div class="comment-wrapper wrapper-comment">
            <div class="comment-content content-comment">
              <textarea
                class="change-comment-textarea"
                @keyup.enter="editComment(comment._id, comment.content)"
                :disabled="
                  comment.author[0]._id != user._id ||
                  saveId != comment._id ||
                  !checkEditComment
                "
                :class="outstanding == comment._id ? 'show-border' : ''"
                v-model="comment.content"
              />
              <div class="comment-action-list">
                <div class="comment-action-item">
                  <button
                    class="btn btn-upvote"
                    @click="upvoteComment(comment)"
                  >
                    <icon class="icon" name="caret-up"></icon>
                  </button>
                  <span class="comment-upvote upvote">{{
                    comment.upvote.length
                  }}</span>
                </div>
                <div class="comment-action-item">
                  <button
                    class="btn btn-downvote"
                    @click="downvoteComment(comment)"
                  >
                    <icon class="icon" name="caret-down"></icon>
                  </button>
                  <span class="comment-downvote downvote">{{
                    comment.downvote.length
                  }}</span>
                </div>
              </div>
            </div>
            <div class="comment-options list-options">
              <div class="d-flex">
                <button
                  v-if="saveId == comment._id"
                  @click="showOptions = !showOptions"
                  class="btn-options"
                >
                  <icon class="icon" name="ellipsis-h"></icon>
                </button>
              </div>
              <!--  -->
              <div v-if="showOptions && saveId == comment._id">
                <div>
                  <button
                    v-if="comment.author[0]._id == user._id"
                    class="btn btn-edit btn-comment"
                    @click="deleteComment(comment._id)"
                  >
                    Delete
                  </button>
                </div>
                <button
                  class="btn btn-edit btn-comment"
                  v-if="comment.author[0]._id == user._id"
                  @click="
                    checkEditComment = !checkEditComment;
                    showOptions = false;
                    focusInput();
                  "
                >
                  Update
                </button>
                <button
                  class="btn btn-edit btn-comment"
                  v-if="comment.author[0]._id != user._id"
                  @click="reportComment()"
                >
                  report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CommentRepository } from "@/repositories";
import author from "../miscellaneous/Author.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "comment",

  data() {
    return {
      saveId: null,
      checkEditComment: false,
      showOptions: false,
      checkUpdateComment: true,
    };
  },
  components: {
    author,
  },

  props: {
    listComments: [],
    outstanding: null,
  },
  created() {
    if (typeof this.user !== "object") {
      this.getUser();
    }
    this.$store.dispatch("user/getInformation");
  },
  watching: {
    listComments: {
      handler(newListComment) {
        console.log(newListComment);
        this.listComments = newListComment;
      },
      deep: true,
      immediately: true,
    },
  },

  computed: {
    ...mapGetters({ user: "user/getUser" }),
  },

  methods: {
    ...mapActions({ getUser: "user/getInformation" }),
    focusInput() {
      document.querySelector(".change-comment-textarea").focus();
    },
    async deleteComment(id) {
      const data = {
        comment_id: id,
      };
      const response = await CommentRepository.delete(data);
      console.log(response);
      if (response.status == 200) {
        this.listComments = this.listComments.filter(
          (comment) => comment._id != id
        );
      }
    },
    async upvoteComment(comment) {
      const data = {
        comment_id: comment._id,
      };
      const response = await CommentRepository.upvote(data);
      comment.upvote = response.data.result.upvote;
      comment.downvote = response.data.result.downvote;
    },

    async downvoteComment(comment) {
      const data = {
        comment_id: comment._id,
      };
      const response = await CommentRepository.downvote(data);
      comment.upvote = response.data.result.upvote;
      comment.downvote = response.data.result.downvote;
    },

    async editComment(id, content) {
      const data = {
        comment_id: id,
        content,
      };
      await CommentRepository.update(data);
    },
    reportComment() {
      console.log("reportComment");
    },
  },
};
</script>

<style lang="scss" scoped>
.list-options {
  width: 14rem;
}
.comment {
  &-container {
    height: 18rem;
    padding: 1rem;
    margin: 15px 0;
    border-radius: 20px;
  }
  &-list {
    * {
      background-color: $primary-color-light;
    }
  }
  &-author {
    display: flex;
    align-items: center;
  }
  &-wrapper {
    display: flex;
    justify-content: space-between;
  }
  &-content {
    width: 90%;
    font-size: 2rem;
    textarea {
      font-family: "Nunito", sans-serif;
      margin-top: 1rem;
      padding: 0 1rem;
      border-radius: 0.5rem;
      width: 100%;
      height: 5rem;
      outline: none;
      border: none;
      font-size: 1.6rem;
      display: block;
      resize: none;
    }
    .space {
      padding: 0 1rem 0 0;
      font-size: 1.5rem;
    }
  }
  &-action {
    &-list {
      padding: 0.5rem 0;
      display: flex;
      align-items: center;
    }
    &-item {
      display: flex;
      align-items: center;
      padding-right: 2rem;
      .icon {
        @include icon(2rem, #000);
      }
    }
  }
  &-upvote,
  &-downvote {
    font-size: 1.6rem;
  }
  &-date {
    font-size: 1.2rem;
  }
}

.btn {
  outline: none;
  cursor: pointer;
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  @include transition(all 0.3s ease);

  &-comment {
    background: rgb(5, 91, 92);
    padding: 5px 10px;
    font-weight: 500;
    margin-left: 15px;
  }

  &-delete {
    margin-right: 0.5rem;
  }
  &-edit {
    width: 14rem;
  }
  &-delete,
  &-edit {
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  &-options {
    padding: 1rem;
    border-radius: 50%;
    border: none;
    outline: none;
    width: 3rem;
    display: flex;
    align-items: center;
    height: 3rem;
    background-color: none;
    cursor: pointer;
    @include transition(all 0.3s ease);
    .icon {
      @include transition(all 0.3s ease);
      background-color: transparent;
    }
    &:hover {
      .icon {
        transform: scale(1.4);
      }
      background-color: white;
    }
  }

  &:hover {
    color: red;
  }
}

.show-border {
  background-color: white !important;
}
.comment-selected {
  box-shadow: 2px 2px 20px -5px #ccabdb;
}
</style>
