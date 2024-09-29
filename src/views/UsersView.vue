<script setup lang="ts">
import { computed } from 'vue';
import Table from '../components/Table.vue';
import Button from '@/components/ui/Button.vue';

// Kullanıcı arayüzü tanımı
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

interface IUserRow {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Kullanıcı verileri
const users: User[] = [
  {
    id: "12414324514",
    firstName: "Enes",
    lastName: "Sayacı",
    email: "sayacienes@gmail.com",
    age: 26,
  },
  {
    id: "9895487364",
    firstName: "John",
    lastName: "Deligöz",
    email: "crazyeye@gmail.com",
    age: 33,
  },
];

// Tablo başlıkları
const heads = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Age", key: "age" },
  { label: "Actions", key: "actions" },
];

// Tablo verileri
const data = computed<IUserRow[]>(() => {
  return users.map(user => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    age: user.age,
  }));
});

// Eylem butonu için işlev
const handleAction = (item: IUserRow) => {
  console.log("Action for ID:", item); // ID'yi konsola yazdır
};
</script>

<template>
  <main id="#pageUsers" class="grow p-8">
    <Table :heads="heads" :data="data">
      <template v-slot:actions="{ item }">
        <Button @click="handleAction(item as IUserRow)">Düzenle</Button> <!-- Dinamik içerik -->
      </template>
    </Table>
  </main>
</template>

<style>
/* Stil ekleyebilirsiniz */
</style>
