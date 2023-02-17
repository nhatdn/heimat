<template>
  <div class="blog">
    <loader v-if="loading" />
    <div v-else class="container">
      <div class="content-container">
        <div class="left">
          <div class="sticky-left">
            <button :class="{ active: isUpvote }" @click="upvoteBlog()">
              <icon class="icon" name="caret-up"></icon>
            </button>
            <span>{{ currentBlog.upvote.length }}</span>
            <button :class="{ active: isDownvote }" @click="downvoteBlog()">
              <icon class="icon" name="caret-down"></icon>
            </button>
          </div>
        </div>
        <div class="right">
          <div class="blog__container">
            <div class="blog__info">
              <h6 class="blog__category">
                {{ convertCategory(currentBlog.category_id) }}
              </h6>
              <h2 class="blog__title">{{ currentBlog.title }}</h2>
              <div class="blog__origin">
                <div class="blog__author">
                  <author
                    :name="this.currentBlog.user[0].fullname"
                    :image="this.currentBlog.user[0].avatar"
                    :id="this.currentBlog.user[0]._id"
                    :username="this.currentBlog.user[0].username"
                  />
                  <div
                    class="blog__actions"
                    v-if="isCurrentUser(this.currentBlog.user[0]._id)"
                  >
                    <button
                      @click.prevent="editBlog"
                      class="blog__action"
                      title="Edit the post"
                    >
                      <icon name="pen"></icon>
                    </button>
                    <button
                      @click.prevent="deleteBlog"
                      class="blog__action blog__action--delete"
                      title="Delete the post"
                    >
                      <icon name="trash"></icon>
                    </button>
                  </div>
                  <div class="blog__actions" v-else-if="isGuest">
                    <button
                      v-if="!isFollow"
                      class="blog__action"
                      title="Follow the author"
                      @click.prevent="followAuthor()"
                    >
                      Follow
                    </button>
                    <button
                      v-else
                      class="blog__action"
                      title="Unfollow the author"
                      @click.prevent="unfollowAuthor()"
                    >
                      Unfollow
                    </button>
                    <button
                      @click="isToggleShow = !isToggleShow"
                      class="blog__dot"
                      title="Delete the post"
                    >
                      <icon class="icon" name="ellipsis-h"></icon>
                    </button>
                    <div class="navbar-dropdown" v-show="isToggleShow">
                      <label class="dropdown-item">
                        <div class="preview-thumbnail">
                          <div class="preview-icon">
                            <icon name="flag"></icon>
                          </div>
                        </div>
                        <div class="preview-item-content">
                          <p class="preview-subject">Report This Blog</p>
                        </div>
                      </label>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item preview-item">
                        <div class="preview-thumbnail">
                          <div class="preview-icon">
                            <icon name="flag"></icon>
                          </div>
                        </div>
                        <div class="preview-item-content">
                          <p class="preview-subject">Report This User</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  class="blog__post-time"
                  :title="typeTimeDefault(currentBlog.created_date)"
                >
                  Post on: {{ timeSince(currentBlog.created_date.toString()) }}
                </div>
              </div>
              <p class="blog__description">
                {{ currentBlog.description }}
              </p>
            </div>
            <div class="blog__cover">
              <img :src="currentBlog.cover || image" alt="blog-cover" />
            </div>
            <div class="blog__content" v-html="currentBlog.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="blog__container">
      <div class="comment-container container-comment">
        <!-- <div class="comment-new push-new-comment">
          <span
            id="span-input-textarea"
            class="textarea"
            role="textbox"
            placeholder="Share your feelings about the post?"
            contenteditable
            @click="handleTextarea()"
            @keyup.enter="pushComment()"
            :value="newComment"
          ></span>
          <button @click="pushComment()">
            <icon class="icon" name="paper-plane"></icon>
          </button>
        </div> -->
        <div class="comment-container container-comment">
          <div class="comment-new push-new-comment">
            <span
              id="span-input-textarea"
              class="textarea"
              role="textbox"
              placeholder="Share your feelings about the post?"
              contenteditable
              @click="handleTextarea()"
              @keyup.enter="pushComment()"
              :value="newComment"
            ></span>
            <button @click="pushComment()">
              <icon class="icon" name="paper-plane"></icon>
            </button>
          </div>
          <error :error="error" @click="toggleError">{{ errorMsg }} </error>
          <div class="show-comments">
            <Comment
              :outstanding="this.$route.params.comment_id"
              :listComments="listComments"
            ></Comment>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BlogRepository,
  CommentRepository,
  UserRepository,
} from "@/repositories";
import { mapGetters } from "vuex";
import Author from "@/components/miscellaneous/Author.vue";
import Loader from "@/components/notify/Loader.vue";
import Comment from "@/components/comment/comment.vue";
import Error from "@/components/notify/Error.vue";

export default {
  components: { Author, Loader, Comment, Error },
  name: "ViewBlog",
  data() {
    return {
      error: null,
      errorMsg: null,
      currentBlog: null,
      loading: false,
      newComment: "",
      listComments: [],
      isToggleShow: null,
      image: "@/assets/images/background.jpg",
    };
  },

  created() {
    this.handleCurrentBlog();
  },

  computed: {
    ...mapGetters({
      category: "category/getCategory",
      isCurrentUser: "user/isCurrentUser",
      user: "user/getUser",
    }),
    isGuest() {
      return this.user?._id;
    },
    idBlog() {
      return this.$route.params.blogId;
    },
    isFollow() {
      return this.user?.following?.some((_) => _ === this.authorId);
    },
    authorId() {
      return this.currentBlog?.user[0]?._id;
    },
    isUpvote() {
      return this.currentBlog?.upvote?.some((_) => _ === this.user?._id);
    },
    isDownvote() {
      return this.currentBlog?.downvote?.some((_) => _ === this.user?._id);
    },
  },

  // watching: {
  //   newComment: {
  //     handler(newData) {
  //       this.listComments = newData;
  //     },
  //     deep: true,
  //     immedately: true,
  //   },
  // },

  methods: {
    handleTextarea() {
      document
        .querySelector("#span-input-textarea")
        .addEventListener("keyup", (e) => {
          this.newComment = e.target.outerText;
        });
    },

    async pushComment() {
      if (this.newComment) {
        const data = {
          content: this.newComment,
          created_date: new Date(),
          from_blog_id: this.idBlog,
        };
        let response = await CommentRepository.create(data);
        const result = {
          ...response.data.result,
          author: [{ ...this.user }],
        };
        this.listComments.push(result);
        document.querySelector("#span-input-textarea").innerText = "";
      } else {
        this.displayError("Please fill the comment field");
      }
    },

    convertCategory(index) {
      return this.category(index);
    },

    async handleCurrentBlog() {
      try {
        this.loading = true;
        let response = await BlogRepository.get(this.idBlog);
        if (response.status == 200) {
          console.log(response);
          this.currentBlog = response.data.result[0];
          this.listComments = response.data.listComments;
        }
      } catch {
        // this.$router.push("/error");
      } finally {
        this.loading = false;
      }
    },

    async deleteBlog() {
      try {
        let result = await BlogRepository.delete(this.idBlog);

        if (result.status == 200) {
          this.$router.push("/");
        }
      } catch {
        console.log("Error");
      }
    },

    async editBlog() {
      await this.$store.dispatch("blog/setCurrentBlog", this.currentBlog);
      this.$router.replace({
        name: "EditBlog",
        params: { blogId: this.idBlog },
      });
    },

    async followAuthor() {
      try {
        const data = {
          user_id: this.authorId,
        };
        const response = await UserRepository.follow(data);
        console.log(response);
        if (response.status === 200) {
          this.user.following.push(this.authorId);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async unfollowAuthor() {
      try {
        const data = {
          user_id: this.authorId,
        };
        const response = await UserRepository.unfollow(data);
        console.log(response);
        if (response.status == 200) {
          this.user.following = this.user.following.filter(
            (_) => _ !== this.authorId
          );
          console.log(this.user.following);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async upvoteBlog() {
      if (!this.isUpvote) {
        const response = await BlogRepository.upvote(this.idBlog);
        if (response.status === 200) {
          this.currentBlog.upvote.push(this.user._id);
          if (this.isDownvote) {
            this.currentBlog.downvote = this.currentBlog.downvote.filter(
              (_) => _ !== this.user._id
            );
          }
        }
      } else {
        this.currentBlog.upvote = this.currentBlog.upvote.filter(
          (_) => _ !== this.user._id
        );
      }
    },

    async downvoteBlog() {
      if (!this.isDownvote) {
        const response = await BlogRepository.downvote(this.idBlog);
        if (response.status === 200) {
          this.currentBlog.downvote.push(this.user._id);
          if (this.isUpvote) {
            this.currentBlog.upvote = this.currentBlog.upvote.filter(
              (_) => _ !== this.user._id
            );
          }
        }
      } else {
        this.currentBlog.downvote = this.currentBlog.downvote.filter(
          (_) => _ !== this.user._id
        );
      }
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
<style lang="scss" scoped>
.comment {
  &-container {
    background-color: $primary-color-light;
    padding: 3.6rem;
    border-radius: 2rem;
    margin-bottom: 5rem;
  }
  &-new {
    position: relative;
    display: flex;
    margin-bottom: 3rem;
    font-size: 2rem;
    .textarea {
      width: 100%;
      padding: 1.5rem 8rem 1.5rem 2rem;
      background: rgba(204, 171, 219, 0.67);
      border: none;
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 4rem;
      min-height: 4rem !important;
      outline: none;
      border-radius: 2rem;
      overflow: hidden;
      resize: none;
      line-height: 2rem;
    }
    button {
      position: absolute;
      right: 0;
      height: 100%;
      outline: none;
      border: none;
      width: 8rem;
      cursor: pointer;
      border-radius: 2rem;
      background: transparent;
      line-height: 1.9rem;
      font-size: 1.6rem;
      font-weight: 600;
      .icon {
        @include icon(2.2rem, $secondary-color);
        @include transition(fill 0.3s ease);
      }
      &:hover {
        .icon {
          fill: $secondary-color-dark;
        }
      }
    }
  }
}
.blog {
  &__container {
    width: 75rem;
    margin: 0 auto;
  }
  &__info {
    padding: 2rem;
  }
  &__category {
    margin-top: 4rem;
    font-size: 1.4rem;
    font-weight: 500;
    text-transform: uppercase;
    color: $dark-color-semi;
  }
  &__title {
    margin: 1.5rem 0;
    font-size: 3.6rem;
    font-weight: 700;
    color: $dark-color;
  }
  &__origin {
    padding-left: 1rem;
  }
  &__post-time {
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: uppercase;
    color: $dark-color-semi;
  }
  &__description {
    margin: 2rem 0;
    font-size: 1.6rem;
    font-style: italic;
    color: $dark-color-lighter;
    position: relative;
    padding-left: 3rem;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
      background: $dark-color-lighter;
    }
  }
  &__cover {
    display: flex;
    justify-content: center;
    img {
      width: 100%;
    }
  }
  &__content {
    margin: 3rem 0 10rem;
    font-size: 1.6rem;
  }
  &__author {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__actions {
    position: relative;
    display: flex;
    gap: 1rem;
  }
  &__action {
    padding: 1rem 2rem;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    @include transition(background-color 0.5s ease);
    svg {
      @include transition(fill 0.5s ease);
    }
  }
  &__action {
    border: 1px solid $secondary-color;
    &:hover {
      background-color: $secondary-color;
      & svg {
        fill: #fff;
      }
    }
    & svg {
      @include icon(1.5rem, $secondary-color-dark);
    }
    &--delete {
      border: 1px solid $error;
      &:hover {
        background-color: $error;
        & svg {
          fill: #fff;
        }
      }
      & svg {
        @include icon(1.5rem, $error);
      }
    }
  }
  &__dot {
    outline: none;
    border: none;
    background: transparent;
    transform: rotate(90deg);
    cursor: pointer;
  }
}
.navbar {
  &-dropdown {
    position: absolute;
    font-size: 0.9rem;
    margin-top: 0;
    top: 130%;
    right: -4rem;
    left: auto;
    border: none;
    border-radius: 4px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    animation-duration: 0.25s;
    animation-fill-mode: both;
    min-width: 10rem;
    color: #828282;
    text-align: left;
    list-style: none;
    background-color: #fffafa;
    background-clip: padding-box;

    .dropdown {
      &-item {
        display: flex;
        align-items: center;
        padding: 1.1rem 1.3rem;
        gap: 1.5rem;
        cursor: pointer;
        white-space: nowrap;
        &:hover {
          background-color: $primary-color-light;
        }
      }
      &-divider {
        border-top: 1px solid #eeeeee;
      }
      &-navigating {
        text-align: center;
      }
    }
    &-title {
      font-weight: 600;
    }

    &-title,
    .dropdown-navigating {
      font-size: 1.6rem;
      padding: 1.5rem 2rem;
    }
  }
}
.preview {
  &-thumbnail {
    .profile-pic {
      width: 4rem;
      height: 4rem;
      @include roundImage(4rem);
    }
  }
  &-icon {
    width: 3rem;
    height: 3rem;
    text-align: center;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    .icon {
      @include icon(1.8rem, #595959);
    }
  }
  &-subject {
    font-size: 1.5rem;
    &-description {
      font-size: 1.2rem;
      color: $dark-color-light;
    }
  }
}
.content-container {
  display: flex;
}
.left {
  width: calc((105rem - 75rem) / 2);
}
.sticky-left {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: sticky;
  top: 12rem;
  padding: 13rem 0;
  button {
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
    &.active {
      .icon {
        fill: $dark-color-dark;
      }
    }
    .icon {
      @include icon(5.5rem, $dark-color-light);
    }
  }
  span {
    font-size: 3rem;
  }
}
</style>
<style lang="scss">
@import "@/scss/default";
</style>
