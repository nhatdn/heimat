<template>
  <div class="member__card card">
    <router-link
      :to="{
        name: 'Profile',
        params: { userId: Profile._id, userUsername: Profile.username },
      }"
    >
      <div class="card__avatar">
        <img src="@/assets/images/author.jpg" alt="member" />
      </div>
    </router-link>
    <div class="card__info">
      <router-link
        :to="{
          name: 'Profile',
          params: { userId: Profile._id, userUsername: Profile.username },
        }"
      >
        <h5 class="card__name">{{ Profile.fullname }}</h5>
        <p class="card__description">
          {{ Profile.description }}
        </p>
      </router-link>
      <div class="card__statistic">
        <div class="statistic">
          <strong>{{ Profile.countBlog.length }}</strong
          ><span>posts</span>
        </div>
        <div class="statistic">
          <strong>{{ Profile.followers.length }}</strong
          ><span>followers</span>
        </div>
        <div class="statistic">
          <strong>{{ Profile.following.length }}</strong
          ><span>following</span>
        </div>
      </div>
      <div
        class="card__action"
        v-if="!isCurrentUser(this.Profile._id)"
        @click.prevent="handleFollow"
      >
        <icon class="icon" :name="isFollow ? 'check' : 'plus'"></icon>
      </div>
    </div>
  </div>
</template>

<script>
import { UserRepository } from "@/repositories";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user/getUser",
      isCurrentUser: "user/isCurrentUser",
    }),
    isFollow() {
      return this.user.following.some((_) => _ === this.Profile._id);
    },
  },
  props: {
    Profile: null,
  },
  methods: {
    async handleFollow() {
      try {
        const data = {
          user_id: this.Profile._id,
        };
        let response;
        if (this.isFollow) {
          response = await UserRepository.unfollow(data);
        } else {
          response = await UserRepository.follow(data);
        }
        console.log(response);
        if (response.status === 200) {
          if (this.isFollow) {
            this.user.following = this.user.following.filter(
              (_) => _ !== this.Profile._id
            );
          } else {
            this.user.following.push(this.Profile._id);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  position: relative;
  border-radius: 1rem;
  background: $primary-color-light;
  box-shadow: $card-shadow;
  border-end-start-radius: 1rem;
  border-end-end-radius: 1rem;
  background: $primary-color-dark;
  &__avatar {
    img {
      border-start-start-radius: 1rem;
      border-start-end-radius: 1rem;
      width: 100%;
      height: 20rem;
      object-fit: cover;
    }
  }
  &__info {
    color: #fff;
    text-align: center;
    padding: 3rem 1rem 1rem;
  }
  &__name {
    color: #fff;
    font-size: 1.8rem;
    text-transform: capitalize;
    @include textClamp();
  }
  &__description {
    color: #fff;
    font-style: italic;
    font-size: 1.4rem;
    @include textClamp(2);
    width: 100%;
  }
  &__statistic {
    padding-top: 2rem;
    display: flex;
    justify-content: space-around;
    padding-bottom: 2rem;
    .statistic {
      display: flex;
      flex-direction: column;
      strong {
        font-size: 1.8rem;
      }
      span {
        font-size: 1rem;
        text-transform: uppercase;
      }
    }
  }
  &__action {
    z-index: 13;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 18rem;
    left: 45%;
    @include roundObject(4rem, $secondary-color);
    box-shadow: $card-shadow;
    cursor: pointer;
    @include transition(transform 0.3s ease);
    &:hover {
      transform: scale(1.1, 1.1);
    }
    .icon {
      fill: #fff;
    }
  }
}
</style>
