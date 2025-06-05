<template>
    
    <div id="orders">

        <Message :msg="msg" :msgClass="msgClass" />

        <section id="headerOrder">
            <h1>Pedidos</h1>
            <p>Pedidos feitos entre: <span class="date-choice">{{diasUteis[0]}}</span> e <span class="date-choice">{{diasUteis[4]}}</span></p>
            <section class="date-choice">
                <input type="date" name="dataChoice" id="dataChoice" v-model="dataChoice" @change="getOrders(this.dataChoice)">
            </section>

            <router-link id="home" to="/">
            
                <img src="/img/logo_icon_transparent_short_2.fa07d0c2.png" alt="Logo Teto Solar ">

            </router-link>

            <router-link id="new" to="/registerOrder">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADzUlEQVR4nO2aSU9UQRDH24MORI2R+AVcghrBNWLwosGFRIgcNNEPIOIXMC7fQJDgQfHgTaMhqDc3YvTAEgIuZxdcIjcRDi6J6/xMOX0YKz0686Z7eE/fL5mEDO/9q7rmvequ7jImJSUlJSUlKMBKoAM4D9wDJoAZ4Kv9zNjv5H+99tpak2SAtUA3MEl03gCnRcskAWAO0AKM4J9hYI/YMHEE2ASMEZ5RYKOJC0AVcAb4/gen3wM3gWNAq80Ji4G59rPYftdqr7kFfPiDntjqATKzPfgVwOMCTmaBG8C+KI7awO63gRMtF4+A5WFG9xeARmC6wMD7gDrjCaAe6C8QhHfAFl+2igLYDXx0OPME2G4CATQBTx12xZddoez+BtBQYPAXgQUmMEA1cMFh/xOwtRLv/LTjkT8a1LDbl+OO3DAFLAtlsMqR8MSBQ0EMFudTuyMID4LMDuSmOk3Ff3mHXzJtak6HWOR8V0aumJhg808+4usGn8vbMUe2n29igiRf4JnycdiXeIvjEWsyMQPY5sgHzT6ER5Ron4kpwFXl62C5gnVKMOtrhacfKU+aa4AfSrq+HMFuJXbDh6OhAmB1pZDKp7McsUkltj8BATigpF9HFVrpKGkzCQhAtWOpviKK0BElctOXkyEDYLXvKPnDUUR6lcixBAXghJI/G0XkvhJpSVAA9ir5u1FEXimR2gQFYJWSfxFFZFqJ1JR4v1dKtL1E3T4VJQBflMi8BAUgo27/nAagVEhfAV7+Q0lwwsc02JqgALT5mAZ7//eFUIcSuZWgAAwo+fYoIrVKRM7qqhJSDMkZQXnFkGDP5//PcliwzQlJ2xC5raRP+d4Sq49rAIB1jo3R8vwl15mRT7+JKcB1r5uigm1LScK2+E6Hn7t9HYyMKuGnlTgJLhZgIfBc+Tjk08BGx9FYbM4HgEvKN/F1vW8jPY5H7LhXI9H8OunwqyuEoQzwUBnKRtpw9OdThyPrj5e6d1E00pBke3J0ELzWCSX88nrwb4GloQ1vLtDCdg1YVKGEd9lhX5a/jaHt/0Iakgr0CckR9Q4T1q7O9tgfZGcou06kNc325Li46rO/167w9CIn/7Fv8GWrJKQhyfbkuMjag0opTqojVnUH7dq+UKPkePB3vsjZQYqmbxTmoz2uOmEPLVbLNrtka/upsd+12WsGHCVtPmKrK1i2j4IsPBx1QwiG5JUwcQVoliIkwMAHvaztKwW5UrpTNiTKGLTce8pn3/GsQK7DVJoaz8kOrZ3Kpu3p0xf79zP7P7nmUORtrJSUlJSUFFMsPwEt7n/iXbzm4AAAAABJRU5ErkJggg==" alt="add--v1">
                <br><span>Novo Pedido</span>
            </router-link>
        </section>

        <main id="mainOrder">


            <span class="show-Info" v-if="showInfo == false" @click="showInfoOrders">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                <g fill="#f5f5f5" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M24,4c-11.02771,0 -20,8.97229 -20,20c0,3.27532 0.86271,6.33485 2.26172,9.06445l-2.16797,7.76367c-0.50495,1.8034 1.27818,3.58449 3.08203,3.08008l7.76758,-2.16797c2.72769,1.39712 5.7836,2.25977 9.05664,2.25977c11.02771,0 20,-8.97229 20,-20c0,-11.02771 -8.97229,-20 -20,-20zM24,7c9.40629,0 17,7.59371 17,17c0,9.40629 -7.59371,17 -17,17c-3.00297,0 -5.80774,-0.78172 -8.25586,-2.14648c-0.34566,-0.19287 -0.75354,-0.24131 -1.13477,-0.13477l-7.38672,2.0625l2.0625,-7.38281c0.10655,-0.38122 0.05811,-0.7891 -0.13477,-1.13477c-1.36674,-2.4502 -2.15039,-5.25915 -2.15039,-8.26367c0,-9.40629 7.59371,-17 17,-17zM23.97656,12.97852c-0.82766,0.01293 -1.48843,0.69381 -1.47656,1.52148v12c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-12c0.00582,-0.40562 -0.15288,-0.7963 -0.43991,-1.08296c-0.28703,-0.28666 -0.67792,-0.44486 -1.08353,-0.43852zM24,31c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2z"></path></g></g>
                </svg>
            </span>
            <section v-if="showInfo" class="orders-info">

                <div class="orders-info-card">

                    <button class="close-info" @click="showInfo = false">X</button>
                    <h2>Informações</h2>
                    <p>Total de Pedidos: <span class="total-orders">{{orders.length}}</span></p>
                    <p>Total de Gastos: <span class="total-price info-prices">{{allPrices.toFixed(2)}} R$</span></p>
                    <p>Total de Gastos Mensais: <span class="total-month info-prices"> {{ allPricesMonth.toFixed(2) }} R$</span> </p>

                    <label for="supplierName">Escolha um fornecedor Especifico:</label>
                    <div style="display: flex; flex-direction: row; align-items: center; gap: 10px;">
                        <input type="text" name="supplierName" id="supplierName" value=" " v-model="supplierName" @keyup.enter="getOrdersBySupplier(supplierName)" placeholder="Nome do Fornecedor">
                        <button class="btn-get-orders" @click="getOrdersBySupplier(supplierName)">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="23" viewBox="0 0 30 30">
                            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                            </svg>
                        </button>
                    </div>

                    <label for="productName">Escolha um Produto Especifico:</label>
                    <div style="display: flex; flex-direction: row; align-items: center; gap: 10px;">
                        <input type="text" name="productName" id="productName" v-model="productName" @keyup.enter="getOrdersByProduct(productName)" placeholder="Cod ou Descrição">
                        <button class="btn-get-orders" @click="getOrdersByProduct(productName)">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="23" viewBox="0 0 30 30">
                            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                            </svg>
                        </button>
                    </div>

                </div>

            </section>

            <div v-if="loading">
                <div class="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div class="error-image" v-if="errorImage">
                Sem Pedidos :(
            </div>

            <div id="eachOrder" class="card-order" v-for="(order, index) in orders" :key="index">

                <div class="div-header-orders">
                    
                    <span class="code-orders">Código:</span>
                    <span class="description-orders">Descrição:</span>
                    <span class="quant-orders">Quantidade:</span>
                    <span class="input-check">Chegada:</span>

                </div>

                <div v-for="(material, indexTwo) in order.materials" :key="indexTwo">

                    <section :class="`section-orders ${ material.isArrivedSeparate === true ? 'arrived' : ' ' }`" :id="`section${material._id}`">

                        <div class="div-materials">
                            <span class="code-orders">{{material.code}} </span>
                            <span class="description-orders small">{{ material.description }} </span>
                            <span class="quant-orders">{{material.quantOrder}} </span>
                            <input type="checkbox" class="input-check" :name="material.code" :id="material.code" v-model="material.isArrivedSeparate" @click="uniqueOrdedSelected(order._id, material._id, material.isArrivedSeparate == true ? false : true)"> 
                        </div>
                    
                    </section>

                </div>

                <section class="info-container">
                    <span class="info-supplier">Fornecedor: {{order.supplier}}</span>
                    <span class="info-supplier">Valor: {{order.price?.toFixed(2)}} R$</span>
                    <span class="span-date">{{order.date}}</span>
                    <router-link class="edit-button" :to="`editOrder/${order._id}`">Editar</router-link>
                    <button class="pdf-button" @click="OrderProcess(order.materials, order.date, String(index + 1).padStart(2, '0'))">
                        Gerar PDF
                    </button>
                </section> 

            </div>

        </main>

        <Footer/>

    </div>

</template>

<script>

    import {BASE_URL} from '@/config'
    import OrderForm from '@/components/stockroom/OrderForm.vue'
    import  Footer from '@/components/stockroom/Footer.vue'
    import Message from '@/components/Message.vue'

    export default {
        components:{
            Footer,
            OrderForm,
            Message
        },
        data() {

            var data = new Date();
            var dia = data.getDate();
            var mes = data.getMonth() + 1;
            var ano = data.getFullYear();

            return {
                errorImage: false,
                loading: true,
                showInfo: false,
                apiURL: BASE_URL,
                orders: {},
                ordedMaterials: [],
                allPrices: 0,
                supplierName: "",
                productName: "",
                allPricesMonth: 0,
                dataChoice: `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`,
                diasUteis: [],
                arrived: false,
                msg: null,
                msgClass: null,
                materialFind: {
                    id: null,
                    quantity: null,
                    minQuantity: null,
                    stateQuantity: null,
                }
            }

        },
        created() {

            this.getOrders(this.dataChoice)
            this.scrollBottom()

        },
        methods: {

            showInfoOrders(){

                this.showInfo = !this.showInfo

            },

            // função para coletar o preço mensal
            async getMonthlyPrice(){

                const data = this.dataChoice.split('-')
                const ano = data[0]
                const mes = data[1]

                await fetch(`${this.apiURL}/api/orders/prices/sum/month?year=${ano}&month=${mes}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        console.log(data.error)

                    } else {

                        this.allPricesMonth = data.totalPrice

                    }

                })
            },

            OrderProcess(array, data, index){
                this.ordedMaterials = []
                for (let i = 0; i < array.length; i++) {
                    this.adicionarPedido(array[i]._id, array[i].code, array[i].description, array[i].quantOrder, array[i].quantOrder)
                }
                this.gerarPDF(this.ordedMaterials, data, index)
            },

            // função para pesquisar nome do fornecedor
            async getOrdersBySupplier(supplierName){

                this.loading = true
                this.errorImage = false
                this.diasUteis = [];
                this.allPricesMonth = 0

                await fetch(`${this.apiURL}/api/orders/supplier?supplier=${supplierName}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {
                    if(data.error){

                        console.log(data.error)

                    } else {

                        this.showInfo = false
                        this.orders = data.data
                        this.scrollBottom()
                        this.loading = false

                        if(this.orders.length == 0){
                            this.errorImage = true
                        }

                        this.allPrices = 0
                        for (let i = 0; i < this.orders.length; i++) {

                            if(this.orders[i].price == null){

                                this.orders[i].price = 0

                            }

                            this.allPrices += this.orders[i].price;
                         
                        }

                            this.dataChoice = ''
                            this.diasUteis = [];	
                            this.diasUteis[0] = this.orders[0].date.split('T')[0];
                            this.diasUteis[4] = this.orders[this.orders.length - 1].date.split('T')[0];              

                    }
                })
                .catch(err => {

                    console.log(err)

                })
            },

            // função para pesquisar nome do produto
            async getOrdersByProduct(productName){

                this.loading = true
                this.errorImage = false
                this.diasUteis = [];
                this.allPricesMonth = 0

                await fetch(`${this.apiURL}/api/orders/productName?productName=${productName}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        console.log(data.error)

                    } else {

                        this.showInfo = false
                        this.orders = data.data
                        this.scrollBottom()
                        this.loading = false

                        if(this.orders.length == 0){
                            this.errorImage = true
                        }

                        this.allPrices = 0

                        this.dataChoice = ''
                        this.diasUteis = [];	
                        this.diasUteis[0] = this.orders[0].date.split('T')[0];
                        this.diasUteis[4] = this.orders[this.orders.length - 1].date.split('T')[0];              

                    }
                })
                .catch(err => {

                    console.log(err)

                })

            },

            adicionarPedido(id, code, description, quant, order){
                
                const jsonOrder = {

                    _id: id,
                    code: code,
                    description: description,
                    quantOrder: order,
                    isArrivedSeparate: false

                }

                this.ordedMaterials.push(jsonOrder)
            },

            // gerar PDF
            async gerarPDF(jsonData, date, index) {

                const jsonSimplificado = jsonData.map(({ _id, code, isArrivedSeparate, ...resto }) => resto)
                
                const jsonRenomeado = jsonSimplificado.map(({description, quantExist, quantOrder, ...resto}) => ({
                    ...resto,
                    descricao: description,
                    /* quantidade: quantExist, */
                    pedido: quantOrder
                }))

                // Transforma o JSON em um array de arrays para a tabela
                const colunas = Object.keys(jsonRenomeado[0]); // Cabeçalhos das colunas
                const linhas = jsonRenomeado.map(item => Object.values(item)); // Linhas dos dados

                // Cria o documento PDF
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                // Adiciona a tabela ao PDF
                doc.autoTable({
                    head: [colunas],
                    body: linhas
                });

                // Baixa o PDF
                doc.save(`PEDIDOS-${date}-${index}.pdf`);
            },

            // função para coletar dados e atualizar de acordo com o select clicado
            async uniqueOrdedSelected(idOrder, idMaterial, isArrivedSeparate){

                //coleta do elemento html
                const sectionElementCode = document.getElementById(`section${idMaterial}`)

                //atualização dos styles
                if(isArrivedSeparate){

                    sectionElementCode.classList.add('arrived')

                } else {

                    sectionElementCode.classList.remove('arrived')

                }

                const data = {
                    id: idOrder,
                    idMaterial: idMaterial,
                    isArrived: isArrivedSeparate
                }

                const jsonData = JSON.stringify(data)

                //coletando informações do produto selecionado
                await fetch(`${this.apiURL}/api/materials/${idMaterial}`,{
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        console.log(data.error, " erro ao coletar quantidade ")

                    } else {

                        //coleta os campos do material selecionado
                        this.materialFind.id = data.material._id
                        this.materialFind.minQuantity = data.material.minQuantity
                        this.materialFind.quantity = data.material.quantity
                        this.materialFind.stateQuantity = " "

                    }

                })

                //verificar se o material foi selecionado como chegado
                if(sectionElementCode.classList.contains('arrived')){

                    const jsonDataMaterial = JSON.stringify(this.materialFind)
                    this.updateMaterialForInventory(jsonDataMaterial)

                } else {

                    //caso o usuário ative e desative a caixa de select, o material é atualizado como pedido novamente
                    this.materialFind.stateQuantity = "Pedido"
                    const jsonDataMaterial = JSON.stringify(this.materialFind)
                    this.updateMaterialForInventory(jsonDataMaterial) 

                }

                //atualiza como uniqueOrderArrived de acordo com o que o usuario definiu (true or false)
                await fetch(`${this.apiURL}/api/orders/updateUniqueOrder`, {
                    method: "PUT",
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: jsonData
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error
                        this.msgClass = 'error'

                    }

                    setTimeout(() => {
                        
                        this.msg = null

                    }, 1500);

                })

            },

            colletingWeek(data){
                
                this.allPrices = 0
                this.diasUteis = [];
                
                // Converte a string de data para um objeto Date
                const dataInicio = new Date(data);
                
                // Ajuste para a segunda-feira da semana da data fornecida
                const diaDaSemana = dataInicio.getDay();
                const diasParaSubtrair = (diaDaSemana === 0 ? 6 : diaDaSemana - 1);
                const dataSegundaFeira = new Date(dataInicio);
                dataSegundaFeira.setDate(dataInicio.getDate() - diasParaSubtrair);
                
                // Preenche o array com os dias úteis (segunda a sexta-feira)
                for (let i = -1; i < 4; i++) {
                    const dia = new Date(dataSegundaFeira);
                    dia.setDate(dataSegundaFeira.getDate() + i);
                    this.diasUteis.push(dia.toISOString().split('T')[0]);  // Formato 'YYYY-MM-DD'
                }
                
            },

            //atualizando o material que chegou no estoque de acordo com o state quantity
            /* 

                pode-se adicionar uma feature para atualizar automaticamente a quantidade
                ja pedida no estoque evitando assim o trabalho de inserir manualmente na seção
                de entrada.
            
            */

            async updateMaterialForInventory(json){

                await fetch(`${this.apiURL}/api/materials/`, {
                    method:"PUT",
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: json
                })
                .then((resp) => resp.json())
                .then((data) => {
                    
                    if(data.error){
                        
                        console.log(data.error)

                    } else {

                        console.log(data.msg)

                    }

                })
            },

            //coletando todas os pedidos
            async getOrders(data){

                this.loading = true
                this.errorImage = false
                this.diasUteis = [];

                this.colletingWeek(`${data}`);

                await fetch(`${this.apiURL}/api/orders/week?seg=${this.diasUteis[0]}&sex=${this.diasUteis[4]}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        console.log(data.error)

                    } else {

                        this.orders = data.data
                        this.scrollBottom()
                        this.loading = false

                        if(this.orders.length == 0){
                            this.errorImage = true
                        }

                        for (let i = 0; i < this.orders.length; i++) {

                            if(this.orders[i].price == null){

                                this.orders[i].price = 0

                            }

                            this.allPrices += this.orders[i].price;
                            this.getMonthlyPrice()
                            
                            
                        }

                    }

                })
                .catch((err) => {

                    console.log(err)

                })

            },

            //rolagem para baixo --- precisa ser melhorada
            scrollBottom(){

                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'
                })

            }
        } 
    }

</script>

<style>

    #headerOrder{
        position: fixed;
        width: 100%;
        top: 0;
        padding: 10px 0;
        background-color: var(--color-main00);
        color: #fff;
        height: 90px;
        z-index: 2;
    }

    #headerOrder > h1{
        margin-top: 5px;
        font-size: 2.1em;
    }

    #headerOrder > a#home{
        position: absolute;
        top: 10px;
        left: 0px;
    }

    #headerOrder > a#home > img{
        width: 90px;
    }

    #headerOrder >  a#new{
        color: #fff;
        text-decoration: none;
        position: absolute;
        right: 10px;
        top: 15px;
        display: block;

    }

    #headerOrder > a#new > img{
        width: 50px;
    }

    #mainOrder{
        padding: 100px 0 70px 0;
    }

    .card-order{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
        width: 70%;
        min-width: 350px;
        padding: 20px;
        border-radius: 20px;
        margin-block: 30px;
        background-color: #f2f2f2;
    }

    .div-header-orders{
        font-size: clamp(0.75rem, 0.6477rem + 0.5455vw, 1.125rem);
        color: #000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 60vw;
    }

    .div-materials{
        font-size: clamp(0.75rem, 0.6648rem + 0.4545vw, 1.0625rem);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: auto;
        margin-block: 4px;
        width: 55vw;
        min-width: 300px;
    }

    .code-orders{
        flex-grow: 0;
        margin-left: auto;
    }

    .description-orders{
        width: 500px;
    }

    .quant-orders{
        width: 150px;
    }

    input[type=checkbox]{
        margin: 0;
        height: 30px;
        border-radius: 10px;
        background-color: aquamarine;
    }

    input[type=checkbox]:focus{
        box-shadow: none;
    }

    .input-check{
        width: 50px;
        margin-right: auto;
    }

    .section-orders{
        color: red;
        text-decoration-line: none;
    }

    .arrived{
        color: green;
        text-decoration-line: line-through;
    }

    .info-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: baseline;
        gap: 10px;
    }

    .info-supplier, .info-prices{
        padding: 3px 4px;
        background-color: #e4e4e4;
        border-radius: 7px;
        font-size: 0.9em;
    }

    .span-date{
        position: relative;
        margin-left: auto;
        margin-top: 15px;
        margin-right: 10px;
        background-color: var(--color-main00);
        font-size: 0.9em;
        padding: 4px;
        color: #fff;
        border-radius: 7px;
    }

    .edit-button{
        text-decoration: none;
        color:#fff;
        background-color: rgb(0, 124, 207);
        padding: 4px 5px;
        border-radius: 7px;
    }

    .pdf-button{
        text-decoration: none;
        color:#fff;
        background-color: rgb(0, 124, 207);
        padding: 4px 5px;
        border-radius: 7px;
        font-size: 1em;
    }

    .info-container, .info-supplier, .span-date, .edit-button, .pdf-button{
        font-size: clamp(0.5rem, 0.3807rem + 0.6364vw, 0.9375rem);
    }

    .small{
        font-size: clamp(0.5rem, 0.3466rem + 0.8182vw, 1.0625rem);
    }

    .error-image{
        margin-top:100px ;
    }

    /* Estilo para o botão "Mostrar" (show-Info) */
.show-Info {
    position: fixed;
    left: 10px;
    top: 115px; /* logo abaixo do headerOrder */
    z-index: 10;
    background: var(--color-main00);
    color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    transition: background 0.2s, color 0.2s;
}

.show-Info:hover {
    background: #005fa3;
    color: #e4e4e4;
}

/* Estilo para o overlay escuro ao redor do card de informações */
.orders-info {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background: rgba(0,0,0,0.65);
    padding-top: 120px;
}

/* Card sobreposto e destacado */
.orders-info-card {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    padding: 36px 44px 32px 44px;
    min-width: 340px;
    max-width: 420px;
    margin: auto;
    margin-top: -60px;
    position: relative;
    z-index: 101;
    color: #222;
    font-size: 1.08em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 18px;
}

.orders-info .close-info {
    position: absolute;
    top: 18px;
    right: 18px;
    background: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    font-size: 1.2em;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    transition: background 0.2s;
}

.orders-info .close-info:hover {
    background: #c0392b;
}

/* Estilo minimalista para os dados */
.orders-info-card h2 {
    font-size: 1.4em;
    margin-bottom: 10px;
    font-weight: 600;
    color: var(--color-main00);
}

.orders-info-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.orders-info-list span {
    display: flex;
    justify-content: space-between;
    font-size: 1.05em;
    color: #333;
    font-weight: 500;
}

.orders-info-list .label {
    color: #888;
    font-weight: 400;
    margin-right: 8px;
}

.orders-info-list .value {
    font-weight: 600;
    color: #222;
}

.orders-info-card > div > input[type="text"] {
    width: 100%;
    border: 1px solid #ccc;
}

.btn-get-orders{
    padding: 5px;
    border-radius: 50%;
}



</style>
