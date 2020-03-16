<template>
    <span>
        <v-navigation-drawer app v-model="drawer" class="blue-grey darken-4" dark disable-resize-watcher>
            <v-list>
                <template v-for="(item, index) in items">
                    <v-list-tile :key="index">
                        <v-list-tile-content>
                            {{ item.title }}
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="`divider-${ index }`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="blue darken-1" dark>
            <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link to="/">
                <v-toolbar-title to="/">{{ appTitle }}</v-toolbar-title>
            </router-link>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <div class="hidden-sm-and-down">
                <v-btn flat>Pacientes</v-btn>
                <v-btn flat>Médicos</v-btn>
            </div>
        </v-toolbar>
    </span>
</template>

<script>
export default {
    name: 'AppNav',
    data() {
        return {
            appTitle: 'Vitta',
            drawer: false,
            items: [{ title: 'Menu' }, { title: 'Pacientes' }, { title: 'Médicos' }]
        };
    }
};
</script>

<style scoped>
a {
    color: white;
    text-decoration: none;
}
</style>
