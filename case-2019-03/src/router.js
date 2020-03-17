import Vue from 'vue';
import Router from 'vue-router';
import MedicalCare from './views/MedicalCare';
import Schedule from './views/Schedule';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'medicalCare',
            component: MedicalCare
        },
        {
            path: '/schedule',
            name: 'schedule',
            component: Schedule
        }
    ]
});

export default router;
