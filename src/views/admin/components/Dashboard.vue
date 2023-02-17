<template>
  <div class="content">
    <div class="content-wrapper">
      <div class="content-row">
        <div class="content-header">
          <h3 class="content-title">Dashboard</h3>
        </div>
        <div class="content-card">
          <div class="section-welcome">
            <div class="card">
              <div class="card-body">
                <div class="card-left">
                  <h4 class="card-heading">
                    {{ dataDashBoard.totalUser }}
                    <span class="card-badge"
                      >{{
                        (dataDashBoard.totalUserInMonth /
                          dataDashBoard.totalUser) *
                        100
                      }}%</span
                    >
                  </h4>
                  <p class="card-description">Monthly Members</p>
                </div>
                <div class="card-right">
                  <div class="card-icon">
                    <icon class="icon" name="users"></icon>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <div class="card-left">
                  <h4 class="card-heading">
                    {{ dataDashBoard.totalBlogs }}
                    <span class="card-badge"
                      >{{
                        (dataDashBoard.totalBlogsInMonth /
                          dataDashBoard.totalBlogs) *
                        100
                      }}%</span
                    >
                  </h4>
                  <p class="card-description">Monthly Blogs</p>
                </div>
                <div class="card-right">
                  <div class="card-icon">
                    <icon class="icon" name="blog"></icon>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <div class="card-left">
                  <h4 class="card-heading">
                    {{ dataDashBoard.totalComments }}
                    <span class="card-badge"
                      >{{
                        (dataDashBoard.totalCommentsInMonth /
                          dataDashBoard.totalComments) *
                        100
                      }}%</span
                    >
                    <!-- class badge-decrease -->
                  </h4>
                  <p class="card-description">Monthly Comments</p>
                </div>
                <div class="card-right">
                  <div class="card-icon">
                    <icon class="icon" name="comments"></icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-row">
        <div class="section-chart">
          <div class="content-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">
                  Statistical of sum articles by categories
                </h4>
                <p class="card-description">
                  {{ topCategory }} category is having the most articles
                </p>
                <pie-chart
                  :dataePie="{
                    name: this.dataDashBoard.category.map((e) => e.name),
                    count: this.dataDashBoard.category.map((e) => e.count),
                  }"
                />
              </div>
            </div>
          </div>
          <div class="content-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Amount of Blogs Based on Category</h4>
                <p class="card-description">The figure is expressed the amount of blogs in the lastest 7-8 weeks</p>
                <div class="card-chart">
                  <line-chart :dataLine="this.dataDashBoard.map" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "../chart/BarChart.vue";
import PieChart from "../chart/PieChart.vue";
import { ManagementRepository } from "@/repositories";

export default {
  components: {
    LineChart,
    PieChart,
  },
  name: "Dashboard",
  data() {
    return {
      dataDashBoard: null,
      nameCategories: null,
      countBlogsByCategory: null,
      topCategory: null,
    };
  },
  created() {
    this.handleDashBoard();
  },
  methods: {
    async handleDashBoard() {
      const response = await ManagementRepository.getDashBoard({
        date: new Date(),
      });
      this.dataDashBoard = response.data;
      this.countBlogsByCategory = this.dataDashBoard.category.map(
        (e) => e.count
      );
      this.nameCategories = this.dataDashBoard.category.map((e) => e.name);
      this.topCategory =
        this.nameCategories[
          this.countBlogsByCategory.indexOf(
            Math.max(...this.countBlogsByCategory)
          )
        ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "admin";
.section {
  &-welcome {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    .card {
      &:nth-child(1) {
        .icon {
          fill: $secondary;
        }
      }
      &:nth-child(2) {
        .icon {
          fill: $warning;
        }
      }
      &:nth-child(3) {
        .icon {
          fill: $primary;
        }
      }
      &-body {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      &-heading {
        font-size: 3rem;
        color: #fff;
      }
      &-badge {
        font-size: 2rem;
        color: $success;
        &.badge-decrease {
          color: $danger;
        }
      }
      &-icon {
        .icon {
          @include icon(3rem, $primary);
        }
      }
    }
  }
  &-chart {
    display: flex;
    gap: 2rem;
    .card-chart {
      margin: auto;
    }
  }
}
</style>
