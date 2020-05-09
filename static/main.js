function sendRequest(url, method, data) {
    const configAxios = axios({
        method: method,
        url: url,
        data: data,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
    return configAxios;
}

const app = new Vue({
    el: '#app',
    data: {
        task: '',
        tasks: []
    },
    created() {
        console.log("estoy probando al cargar la pagina");
        this.loadTasks();
        console.log(this.tasks);
    },
    methods: {
        loadTasks() {
            sendRequest('','get')
                .then((response) => {
                    this.tasks = response.data.tasks;
                });
        },
        createTask() {
            const formData = new FormData();
            formData.append('title', this.task);

            sendRequest('', 'post', formData)
                .then((response) => {
                    this.tasks.push(response.data.task);
                    this.task = '';
                });
        }        
    }
})