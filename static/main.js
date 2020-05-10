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
        this.loadTasks();
    },
    computed: {
        taskList() {
            function compare(a, b){
                if(a.completed > b.completed) {
                    return 1;
                }
                if(a.completed < b.completed) {
                    return -1;
                }
                return 0;
            }
            return this.tasks.sort(compare);
        }
    },
    methods: {
        loadTasks() {
            sendRequest('', 'get')
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
        },
        completeTask(id, index) {
            sendRequest(`${id}/complete/`,'post')
                .then((response) => {
                    this.tasks.splice(index,1);
                    this.tasks.push(response.data.task);
                })
        },
        deleteTask(id, index) {
            sendRequest(`${id}/delete/`,'post')
                .then((response) => {
                    this.tasks.splice(index, 1);
                })
        }
    }
})