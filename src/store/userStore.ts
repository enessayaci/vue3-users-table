import type { User } from '@/types/requests/User';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
  }),
  getters: {
    userList: (state) => {
      return state.users;
    },
  },
  actions: {
    setUsers(users: User[]) {
      this.users = users;
    },
    addUser(user: User) {
      this.users.push(user);
    },
    updateUser(updatedUser: User) {
      const index = this.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
    },
    deleteUser(userId: string) {
      this.users = this.users.filter(user => user.id !== userId);
    },
  },
});
