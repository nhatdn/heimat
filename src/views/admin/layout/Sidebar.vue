<template>
  <nav class="sidebar" id="sidebar" :class="{ close: toggle }">
    <div class="sidebar-brand-wrapper">
      <router-link :to="{ name: 'Home' }" class="sidebar-brand-logo"
        ><span>Heimat</span></router-link
      >
      <router-link :to="{ name: 'Home' }" class="sidebar-brand-logo-mini"
        ><span>H</span></router-link
      >
    </div>
    <ul class="nav">
      <router-link v-for="page in content" :key="page.id" :to="{ name: page.title }">
        <li class="nav-item" :class="{ active: page.id === isActive }">
          <a class="nav-link">
            <span class="menu-icon">
              <icon :name="page.icon"></icon>
            </span>
            <span class="menu-title">{{ page.title }}</span>
          </a>
        </li>
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      content: [
        {
          id: 0,
          title: 'Dashboard',
          icon: 'chart-line',
        },
        {
          id: 1,
          title: 'Members',
          icon: 'users',
        },
        {
          id: 2,
          title: 'Categories',
          icon: 'clipboard-list',
        },
        {
          id: 3,
          title: 'Blogs',
          icon: 'blog',
        },
        {
          id: 4,
          title: 'Comments',
          icon: 'comments',
        },
        {
          id: 5,
          title: 'Reports',
          icon: 'bug',
        },
      ],
    };
  },
  computed: {
    isActive() {
      let routerSlug = this.$route.path.split('/')[2];
      const item = this.content.find((item) => item.title.toLowerCase() === routerSlug);
      return item ? item.id : 0;
    },
  },
  props: ['toggle'],
};
</script>

<style lang="scss" scoped>
.sidebar {
  min-height: 100vh;
  height: 100%;
  background: #191c24;
  font-weight: normal;
  padding: 0;
  @include transition(width 0.25s ease, background 0.25s ease);
  &.close {
    .nav-item {
      padding-right: 0;
    }
    .menu-title {
      display: none;
    }
    .sidebar-brand {
      &-wrapper {
        width: 70px;
      }
      &-logo {
        display: none;
      }
      &-logo-mini {
        display: block;
      }
    }
  }
  &-brand {
    &-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      width: 244px;
      height: 70px;
      background: #191c24;
      z-index: 313;
      @include transition(width 0.25s ease, background 0.25s ease);
      @media #{$tablet} {
        display: none;
      }
    }
    &-logo,
    &-logo-mini {
      width: 100%;
      padding-left: 1.3rem;
      color: $light-color;
      font-size: 3rem;
      text-transform: uppercase;
      letter-spacing: 0.5rem;
      @include transition(all 0.25s ease);
    }
    &-logo-mini {
      display: none;
    }
  }
  .nav {
    display: flex;
    overflow: hidden;
    flex-wrap: nowrap;
    flex-direction: column;
    margin-bottom: 6rem;
    padding-top: 7rem;
    & > a {
      &:nth-child(5n + 1) {
        .menu-icon {
          fill: $secondary;
        }
      }
      &:nth-child(5n + 2) {
        .menu-icon {
          fill: $warning;
        }
      }
      &:nth-child(5n + 3) {
        .menu-icon {
          fill: $danger;
        }
      }
      &:nth-child(5n + 4) {
        .menu-icon {
          fill: $success;
        }
      }
      &:nth-child(5n) {
        .menu-icon {
          fill: $primary;
        }
      }
    }
    &-item {
      position: relative;
      cursor: pointer;
      padding-right: 2rem;
      @include transition(background 0.25s ease);
      &.active {
        .nav-link {
          background: #0f1015;
          &::before {
            content: '';
            width: 3px;
            height: 100%;
            background: $primary-color-dark;
            display: inline-block;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .menu-title {
          color: $light-color;
        }
      }
      &:hover {
        .nav-link {
          background: #0f1015;
        }
        .menu-title {
          color: $light-color;
        }
      }
    }
    &-link {
      display: flex;
      align-items: center;
      white-space: nowrap;
      padding: 1.1rem;
      color: #6c7293;
      @include transition(color 0.45s);
      border-radius: 0px 10rem 10rem 0px;
    }
  }
  & .menu {
    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-right: 0.5rem;
      @include icon;
      border-radius: 100%;
      background: rgba(108, 114, 147, 0.2);
    }
    &-title {
      font-size: 1.6rem;
      @include transition(all 0.25s ease);
    }
  }
}
</style>
