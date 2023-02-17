<template>
  <div class="content">
    <div class="content-wrapper">
      <div class="content-header">
        <h3 class="content-title">Manage Categories</h3>
      </div>
      <div class="content-card">
        <div class="content-card-wrapper">
          <div class="content-card-left">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Add new category</h4>
                <form class="form" autocomplete="off">
                  <error :error="error" @click="toggleError">{{
                    errorMsg
                  }}</error>
                  <div class="form-group">
                    <label>Category Name</label>
                    <input
                      type="text"
                      class="form-input"
                      placeholder="Enter The Category Name"
                      autocomplete="off"
                      v-model="category.name"
                      :class="{ err: error }"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>Category Description</label>
                    <textarea
                      type="text"
                      class="form-input"
                      placeholder="Enter The Category Description"
                      autocomplete="off"
                      v-model="category.description"
                      :class="{ err: error }"
                      required
                    />
                  </div>
                  <div class="form-group form-upload-photo">
                    <label>Upload Photo</label>
                    <div class="upload-photo">
                      <label
                        for="category-photo"
                        class="btn-photo"
                        :class="{ disabled: photo }"
                        ><icon name="camera"></icon
                      ></label>
                      <input
                        type="file"
                        ref="categoryPhoto"
                        id="category-photo"
                        accept=".png, .jpg, .jpeg"
                        @change="fileChange"
                      />
                    </div>
                  </div>
                  <div class="form-button">
                    <button
                      type="submit"
                      class="btn btn-summit"
                      @click.prevent="addCategory"
                    >
                      Add
                    </button>
                    <button class="btn btn-cancel" @click.prevent="resetInput">
                      Erase
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="content-card-right">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Categories Table</h4>
                <p class="card-description">
                  Total: <span>{{ total }}</span> categories
                </p>
                <input
                  type="file"
                  ref="categoryEditPhoto"
                  id="category-edit-photo"
                  accept=".png, .jpg, .jpeg"
                  @change="fileEditChange"
                />
                <div class="card-table">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in categories" :key="index">
                        <td>{{ item._id }}</td>
                        <td>
                          <input
                            type="text"
                            v-model="item.name"
                            :readonly="editID !== item._id"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="item.description"
                            :readonly="editID !== item._id"
                          />
                        </td>
                        <td>
                          <label for="category-edit-photo">
                            <icon
                              class="icon"
                              name="upload"
                              @click="setEdit(item._id)"
                              v-show="editID === item._id"
                            ></icon>
                          </label>
                        </td>
                        <td>
                          <icon
                            class="icon"
                            name="edit"
                            @click="setEdit(item._id)"
                            v-show="editID !== item._id"
                          ></icon>
                          <icon
                            class="icon"
                            name="check"
                            @click="
                              editCategory(
                                item._id,
                                item.name,
                                item.description
                              )
                            "
                            v-show="isEdit && editID === item._id"
                          ></icon>
                          <icon
                            class="icon icon-delete"
                            name="trash"
                            @click="deleteCategory(item._id)"
                          ></icon>
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
    </div>
  </div>
</template>

<script>
import { CategoryRepository } from "@/repositories";
import Error from "@/components/notify/Error.vue";
export default {
  components: { Error },
  name: "Members",
  data() {
    return {
      category: {
        name: "",
        description: "",
      },
      photo: null,
      error: false,
      errorMsg: null,
      categories: null,
      isEdit: false,
      editID: null,
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    async fileChange() {
      this.photo = this.$refs.categoryPhoto.files[0];
    },
    async fileEditChange() {
      this.editPhoto = this.$refs.categoryEditPhoto.files[0];
    },

    async getCategoryList() {
      try {
        const response = await CategoryRepository.get();
        if (response.status === 200) {
          this.categories = response.data.categories;
        }
      } catch (err) {
        console.log("Something went wrong");
        console.log(err);
      }
    },

    resetInput() {
      this.category.name = "";
      this.category.description = "";
      this.$refs.categoryPhoto = "";
      this.photo = null;
    },

    async addCategory() {
      if (this.isValidate()) {
        try {
          let formData = new FormData();
          let created_date = new Date();
          let data = {
            name: this.category.name,
            description: this.category.description,
            created_date: created_date.toString(),
          };
          formData.append("cover", this.photo);
          formData.append("category", JSON.stringify(data));
          const response = await CategoryRepository.create(formData);
          if (response.status === 200) {
            this.getCategoryList();
          }
        } catch (err) {
          console.log("Something went wrong");
          console.log(err);
        }
      } else {
        this.displayError("Please enter all the fields!");
      }
    },

    async editCategory(id, name, description) {
      try {
        let formData = new FormData();
        const created_date = new Date();
        let editCategory = {
          category_id: id,
          name,
          description,
          created_date: created_date.toString(),
        };

        formData.append("cover", this.editPhoto);
        formData.append("category", JSON.stringify(editCategory));

        const response = await CategoryRepository.update(formData);
        console.log(response);
        if (response.status === 200) {
          this.$refs.categoryEditPhoto = "";
          this.editPhoto = null;
        }
      } catch {
        console.log("Something went wrong");
      } finally {
        this.isEdit = false;
        this.editID = null;
      }
    },

    async deleteCategory(id) {
      let isDelete = confirm("Are you sure you want to delete this category?");
      if (isDelete) {
        try {
          const data = { category_id: id };
          const response = await CategoryRepository.delete(data);
          console.log(response);
          if (response.status === 200) {
            this.getCategoryList();
          }
        } catch {
          console.log("Something went wrong");
        }
      }
    },

    isValidate() {
      return this.category.name && this.category.description && this.photo;
    },

    toggleError() {
      this.error = false;
    },

    setEdit(id) {
      this.isEdit = true;
      this.editID = id;
    },

    displayError(message) {
      this.error = true;
      this.errorMsg = message;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    },
  },
  computed: {
    total() {
      return this.categories ? this.categories.length : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "admin";
.content {
  &-card {
    &-wrapper {
      display: grid;
      grid-template-columns: 330px auto;
      gap: 3rem;
    }
    &-left {
      flex-shrink: 0;
      width: 33rem;
    }
    &-right {
      table {
        tr {
          display: grid;
          grid-template-columns: 1fr 2fr 3fr 1fr 1fr;
        }
        td {
          display: flex;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          input {
            display: flex;
            width: 100%;
          }
          &:first-child {
            direction: rtl;
            text-align: left;
          }
        }
      }
    }
  }
  .form {
    &-group {
      margin-bottom: 1.5rem;
      label {
        display: inline-block;
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: #fff;
      }
      input,
      textarea {
        border: 1px solid #2c2e33;
        font-size: 1.4rem;
        padding: 1rem;
        background-color: #2a3038;
        border-radius: 2px;
        color: #ffffff;
        width: 100%;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        outline: none;
        &:focus {
          border: 1px solid $primary-color-dark;
        }
      }
      textarea {
        resize: none;
        resize: vertical;
        min-height: 5rem;
      }
    }
    &-button {
      .btn {
        color: #ffffff;
        text-align: center;
        user-select: none;
        outline: none;
        background-color: transparent;
        border: 1px solid transparent;
        padding: 0.7rem 1.4rem;
        font-size: 1.4rem;
        border-radius: 0.5rem;
        margin-right: 1rem;
        @include transition(
          color 0.15s ease-in-out,
          background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out,
          box-shadow 0.15s ease-in-out
        );
        cursor: pointer;
        &-summit {
          background-color: $secondary;
          &:hover {
            border: 1px solid $secondary;
          }
        }
        &-cancel {
          background-color: $primary;
          &:hover {
            border: 1px solid $primary;
          }
        }
      }
    }
  }
}

input[type="file"] {
  display: none;
}
.upload-photo {
  display: flex;
  justify-content: center;
  padding: 1rem 0 3rem;

  .btn-photo {
    display: flex;
    justify-content: center;
    margin-right: 2rem;
    padding: 1rem 3rem;
    background: $primary-color-light;
    border: none;
    border-radius: 2rem;
    font-size: 1.4rem;
    font-weight: 500;
    text-transform: capitalize;
    line-height: 1.4;
    color: $dark-color-dark;
    user-select: none;
    cursor: pointer;
    outline: none;
    &.disabled {
      background: $primary-color-dark;
    }
  }
}
</style>
