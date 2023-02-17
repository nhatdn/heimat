import instance from "@/axios";

const resource = "users";

const extend = {
  follower: "list-followings",
  following: "list-followings",
  follow: "follow",
  unfollow: "unfollow",
  profile: "profile",
  allUsers: "all-users",
  allAdmins: "all-admins",
  outstanding: "outstanding",
};

export default {
  get() {
    return instance.get(`${resource}`);
  },

  update(userData) {
    return instance.put(`${resource}/${extend.profile}`, userData);
  },

  getFollowers() {
    return instance.post(`${resource}/${extend.follower}`, {});
  },

  getFollowing() {
    return instance.post(`${resource}/${extend.following}`, {});
  },

  follow(userId) {
    return instance.post(`${resource}/${extend.follow}`, userId);
  },

  unfollow(userId) {
    return instance.post(`${resource}/${extend.unfollow}`, userId);
  },

  getAllMembers() {
    return instance.get(`${resource}/${extend.allUsers}`);
  },

  getAllAdmins() {
    return instance.get(`${resource}/${extend.allAdmins}`);
  },

  outstandingMember() {
    return instance.get(`${resource}/${extend.outstanding}`);
  },
};
