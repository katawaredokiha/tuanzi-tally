import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import account from '@/views/Account.vue';
import Statistics from '@/views/Statistics.vue';
import CreateTags from '@/views/CreateTags.vue';
import EditLabel from '@/views/EditLabel.vue';
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
    component: account
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
    path: '/labels/edit/:id',
    component: EditLabel
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
