import Home from './pages/Home.vue'
import Auth from './pages/Auth.vue'
import Activate from './pages/Activate.vue'
import WatchSR from './pages/WatchSR.vue'
import PrivacyPolicy from './pages/PrivacyPolicy.vue'
import DataRetention from './pages/DataRetention.vue'
import SubscribingPolicy from './pages/SubscribingPolicy.vue'
import NotFound from './pages/404.vue'
import Reset from './pages/Reset.vue'
import ForgotPassword from './pages/ForgotPassword.vue'
import Contact from './pages/Contact.vue'

export const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/auth', name: 'Auth', component: Auth },
  { path: '/activate', name: 'Activate', component: Activate },
  { path: '/reset', name: 'Reset', component: Reset },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/watch-sr', name: 'WatchSR', component: WatchSR },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/privacy-policy', name: 'PrivacyPolicy', component: PrivacyPolicy },
  { path: '/data-retention', name: 'DataRetention', component: DataRetention },
  { path: '/subscribing-policy', name: 'SubscribingPolicy', component: SubscribingPolicy },
  // Example: Future private/user-specific route (SPA-only, not SSG)
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: () => import('./pages/Dashboard.vue'),
  //   meta: { clientOnly: true, requiresAuth: true }
  // },
  { path: '/404', name: 'NotFound', component: NotFound },
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]
