import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Account from '@/views/Account.vue';
import Statistics from '@/views/Statistics.vue';
import CreateTags from '@/views/CreateTags.vue';
import EditRecords from '@/views/EditRecords.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/account',
    component: Account
  },
  {
    path: '/account/edit-records/:id',
    component: EditRecords
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/labels/create-tags',
    component: CreateTags
  },
  {
    path: '*',
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
