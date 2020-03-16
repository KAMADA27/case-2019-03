import Vue from 'vue';
import Router from 'vue-router';
import MedicalCare from './views/MedicalCare';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'medicalCare',
            component: MedicalCare
        }
    ]
});

export default router;
