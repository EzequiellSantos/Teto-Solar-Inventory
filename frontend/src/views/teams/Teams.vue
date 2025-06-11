<template>
    <div class="teams-container">


        <section class="header">

            <div class="back">
                <img src="" alt="">
                <span>Voltar</span>
            </div>

            <h1>Equipes</h1>
            
            <div id="createNew">
                <button @click="$router.push('/teams/create')">
                
                    <img src="" alt="add-icon">
                    <span>Adicionar Equipe</span>   

                </button>
            </div>

        </section>

        <div class="teams-list">
            <div v-for="team in teams" :key="team.id" class="team-card">
                <h2>{{ team.name }}</h2>
                <p>Descrição: {{ team.description }}</p>
                <p>Responsável: {{ team.responsible }}</p>
                <p>Data de Criação: {{ new Date(team.created_at).toLocaleDateString() }}</p>
            </div>
        </div>
    </div>
</template>

<script>

import { BASE_URL, BASE_API_KEY } from '@/config';

export default {
    data() {
        return {
            teams: [],
            apiUrl: BASE_URL,
            apiKey: BASE_API_KEY,
        };
    },
    created() {
        this.fetchTeams();
    },
    methods: {
        async fetchTeams() {
            try {
                const response = await fetch(`${this.$store.state.apiUrl}/teams`, {
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.apiKey}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Erro ao buscar equipes');
                }
                this.teams = await response.json();
            } catch (error) {
                console.error('Erro:', error);
            }
        }
    }
}
</script>

<style scoped>
.teams-container {
    padding: 20px;
}
</style>