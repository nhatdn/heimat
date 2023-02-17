<template>
  <div class="profile__wrapper">
    <loader v-if="loading" />
    <div class="profile">
      <div class="profile__content">
        <Title content="Blogs" />
        <blog-list :blogPost="blogs" />
      </div>
      <div class="profile__sticky">
        <aside class="profile__user">
          <div class="user__image">
            <img :src="user.avatar" alt="user" />
          </div>
          <div class="user__info">
            <ul class="info">
              <li class="info__item">
                <div class="info__icon"><icon name="venus"></icon></div>
                <div class="info__content">
                  <div class="info__title">{{ user.fullname }}</div>
                  <div class="info__link">@{{ user.username }}</div>
                  <div class="info__text">
                    {{ user.description }}
                  </div>
                </div>
              </li>
              <li class="info__item">
                <div class="info__icon"><icon name="cat"></icon></div>
                <div class="info__content">
                  <div class="info__text">
                    <span>{{ user.followers.length }}</span> followers
                  </div>
                  <div class="info__text">
                    <span>{{ user.following.length }}</span> following
                  </div>
                  <div class="info__text">
                    <span>{{ blogs.length }}</span> posts
                  </div>
                </div>
              </li>
              <li class="info__item">
                <div class="info__icon"><icon name="github"></icon></div>
                <div class="info__content">
                  <a
                    class="info__link"
                    :href="`https://github.com/${user.username}`"
                    target="_blank"
                    >{{ user.username }}</a
                  >
                </div>
              </li>
              <li class="info__item">
                <div class="info__icon"><icon name="link"></icon></div>
                <div class="info__content">
                  <a
                    class="info__link"
                    :href="`https://facebook.com/${user.username}`"
                    target="_blank"
                    >fb.{{ user.username }}</a
                  >
                  <a
                    class="info__link"
                    :href="`https://youtube.com/${user.username}`"
                    target="_blank"
                    >yt.{{ user.username }}</a
                  >
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import { BlogRepository } from "@/repositories";
import Title from "@/components/miscellaneous/Title.vue";
import Loader from "@/components/notify/Loader.vue";
import BlogList from "@/components/blog/BlogList.vue";

export default {
  name: "Profile",
  components: { BlogList, Title, Loader },
  data() {
    return {
      loading: false,
      blogs: null,
      user: {},
    };
  },
  created() {
    this.getBlogList();
  },
  methods: {
    async getBlogList() {
      try {
        this.loading = true;
        const config = {
          params: {
            user_id: this.$route.params.userId,
          },
        };
        let response = await BlogRepository.getByUser(config);
        if (response.status == 200) {
          this.blogs = response.data.result;
          this.user = response.data.result[0].user;
          this.user = { ...this.user[0] };
        }
      } catch {
        // this.$router.push("/error");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  padding: 3rem 0;
  &__wrapper {
    position: relative;
    max-width: 114.6rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin: 0 auto;
  }
  &__content {
    width: calc(100% - 25rem);
  }
  &__sticky {
    padding: 2rem 2rem 0;
    width: 30rem;
    flex-shrink: 0;
    background: #fff;
    min-height: 100vh;

    &.fixed-top {
      position: fixed;
      top: 8rem;
      right: calc((100vw - 114.6rem) / 2);
    }
    &.fixed-bottom {
      position: fixed;
      bottom: 0;
      right: calc((100vw - 114.6rem) / 2);
    }
  }
  &__user {
    position: sticky;
    top: 8rem;
    .user {
      &__image {
        display: flex;
        justify-content: center;
        position: relative;
        margin: 0 auto;
        img {
          width: 20rem;
          height: 20rem;
          object-fit: cover;
          border-radius: 2rem;
          border: 5px solid $primary-color;
        }
        label {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: -1rem;
          right: 1.5rem;
          @include roundObject(4.5rem);
          background-color: $secondary-color;
          cursor: pointer;
          .icon {
            fill: #fff;
          }
        }
        input[type="file"] {
          display: none;
        }
      }
      &__info {
        .info {
          &__item {
            display: flex;
            list-style: none;
          }
          &__icon {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin: 1rem;
            @include icon(4rem);
            border-radius: 50%;
            background-color: $primary-color;
            & icon {
              @include icon(4rem, #fff);
              svg {
                fill: #fff;
              }
            }
          }
          &__title {
            font-weight: 600;
            text-transform: uppercase;
            color: $primary-color-dark;
          }
          &__text {
            color: $dark-color-dark;
            font-size: 1.4rem;
            span {
              font-weight: 600;
            }
          }
          &__link {
            font-size: 1.4rem;
            font-style: italic;
            color: $primary-color-dark;
            cursor: pointer;
            transition: color 0.2s ease;
            &:hover {
              color: $secondary-color;
            }
          }
          &__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 1rem 0 1rem 1rem;
            border-left: 4px solid $primary-color;
            font-size: 1.4rem;
            &:first-child {
              padding-top: 3rem;
            }
          }
        }
      }
    }
  }
}
</style>
