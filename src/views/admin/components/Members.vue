<template>
  <div class="content">
    <modal
      v-if="isShow"
      @close="closeModal"
      v-on:finished="finshedAddAdmin()"
    />
    <div class="content-wrapper">
      <div class="content-header">
        <h3 class="content-title">Manage Members</h3>
      </div>
      <div v-if="showNotifcation" class="notification">
        {{ "Added account admin successfully" }}
      </div>
      <div class="content-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              Admins Table
              <span class="card-barge" @click="openModal">Add New Admin</span>
            </h4>
            <p class="card-description">
              Total: <span>{{ listAcountAdmin.length }}</span> members
            </p>
            <div class="card-table">
              <table class="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Profile</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Roles</th>
                    <th>Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="account in listAcountAdmin" :key="account._id">
                    <td>{{ account._id }}</td>
                    <td>
                      <router-link
                        :to="{
                          name: 'Profile',
                          params: {
                            userUsername: account.username,
                            userId: account._id,
                          },
                        }"
                        class="direct"
                        >{{ account.fullname }}</router-link
                      >
                    </td>
                    <td>{{ account.email }}</td>
                    <td>{{ account.username }}</td>
                    <td>{{ account.role }}</td>
                    <td>{{ account.created_date }}</td>
                    <td v-if="account._id != user._id">
                      <icon class="icon icon-lock" name="lock"></icon>
                      <icon class="icon icon-delete" name="trash"></icon>
                    </td>
                    <td v-else></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="content-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Members Table</h4>
            <p class="card-description">
              Total: <span>{{ listAcountUser.length }}</span> members
            </p>
            <div class="card-table">
              <table class="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Profile</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Roles</th>
                    <th>Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="account in listAcountUser" :key="account._id">
                    <td>{{ account._id }}</td>
                    <td>
                      <router-link
                        :to="{
                          name: 'Profile',
                          params: {
                            userUsername: account.username,
                            userId: account._id,
                          },
                        }"
                        class="direct"
                        >{{ account.fullname }}</router-link
                      >
                    </td>
                    <td>{{ account.email }}</td>
                    <td>{{ account.username }}</td>
                    <td>{{ account.role }}</td>
                    <td>{{ account.created_date }}</td>
                    <td>
                      <icon class="icon icon-lock" name="lock"></icon>
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
import Modal from "./Modal.vue";
import { UserRepository } from "@/repositories";
import { mapGetters } from "vuex";
export default {
  name: "Members",
  data() {
    return {
      isShow: false,
      listAcountAdmin: [],
      listAcountUser: [],
      showNotifcation: false,
    };
  },
  created() {
    this.getListAdmin();
    this.getListUsers();
    console.log(this.user);
  },
  computed: {
    ...mapGetters({
      user: "user/getUser",
    }),
  },
  components: { Modal },
  methods: {
    finshedAddAdmin() {
      (this.showNotifcation = true),
        setTimeout(() => {
          this.showNotifcation = false;
        }, 5000);
    },
    async getListAdmin() {
      const response = await UserRepository.getAllAdmins();
      this.listAcountAdmin = response.data.users;
    },
    async getListUsers() {
      const response = await UserRepository.getAllMembers();
      console.log(response);
      this.listAcountUser = response.data.users;
    },
    openModal() {
      this.isShow = true;
    },
    closeModal() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "admin";
.notification {
  background-color: $secondary-color;
  color: white;
  font-size: 2rem;
  width: 35rem;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
.direct {
  color: white;
  padding: 0.5rem 0.8rem g;
}
.direct:hover {
  color: $secondary-color-light;
}
</style>
