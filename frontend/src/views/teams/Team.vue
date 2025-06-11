<template>
    <div id="TeamKit">
        <router-link to="/teams" class="back-menu">
            ← Voltar para Equipes
        </router-link>

        <h2>{{ team.name }}</h2>

        <h3>Materiais do Kit:</h3>
        <ul v-if="team.materials && team.materials.length > 0">
            <li v-for="material in team.materials" :key="material.code">
                {{ material.description }} - {{ material.quantity }}
            </li>
        </ul>
        <p v-else>Nenhum material encontrado para esta equipe.</p>
        <p style="position:fixed; bottom: 5px;"><small>versão em protótipo</small></p>
    </div>
</template>

<script>

import {BASE_API_KEY, BASE_URL} from '@/config';

export default {
    data() {
        return {
            team: {},
            apiUrl: BASE_URL,
            apiKey: BASE_API_KEY,
        };
    },
    created() {
        this.fetchKitTeam();
    },
    methods: {
        
        
        async fetchKitTeam() {
            const idTeam = this.$route.params.id;

            // 1. Buscar o nome da equipe pelo ID
            let teamName = '';
            await fetch(`${this.apiUrl}/api/teams/${idTeam}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    console.log("erro ao buscar equipe: ", data.error);
                } else {
                    // O nome da equipe está em data.data.name
                    teamName = data.data.name;
                    this.team.name = teamName;
                }
            })
            .catch(error => {
                console.error('Erro ao buscar equipe:', error);
            });

            if (!teamName) return;

            // 2. Buscar o kit pelo nome da equipe
            await fetch(`${this.apiUrl}/api/kits/search/team?name=${encodeURIComponent(teamName)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    console.log("erro ao buscar kit: ", data.error);
                } else {
                    // Se encontrar, pega os materiais do kit
                    if (data.data && data.data.length > 0) {
                        this.team.materials = data.data[0].materials;
                    } else {
                        this.team.materials = [];
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao buscar kit:', error);
            });
        }

    }
}
</script>

<style scoped>
.back-menu {
    position: absolute;
    right: 10px;
    display: inline-block;
    margin-bottom: 18px;
    padding: 8px 16px;
    background: #0077ff;
    color: #fff;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    transition: background 0.2s;
}
.back-menu:hover {
    background: #005fcc;
}
</style>