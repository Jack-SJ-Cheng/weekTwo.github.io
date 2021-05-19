const productList = document.querySelector('#productList');
productList.addEventListener('click', e => {
    if (e.target.dataset.action == 'remove') { app.delete(e.target.dataset.id); }
})

const app = {
    data: {
        url: 'https://vue3-course-api.hexschool.io',
        path: 'randomno',
        products: []
    },
    render() {
        const productCount = document.querySelector('#productCount');
        let str = '';
        this.data.products.forEach(item => {
            str += `<tr>
            <td>${item.title}</td>
            <td width="120">
                ${item.origin_price}
            </td>
            <td width="120">
                ${item.price}
            </td>
            <td width="100">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" ${item.enable ? 'checked' : ''}>
                </div>
            </td>
            <td width="120">
                <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn"
                    data-action="remove" data-id="${item.id}"> 刪除 </button>
            </td>
        </tr>`
        })
        productList.innerHTML = str;
        productCount.innerHTML = `${this.data.products.length}`
    },
    create() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)weekTwoToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common.Authorization = token;
        this.getData();
    },
    getData() {
        axios.get(`${this.data.url}/api/${this.data.path}/admin/products/all`)
            .then(res => {
                let productArr = [];
                this.data.products = [];
                console.log(res);
                if (res.data.products !== null) {
                    console.log('2');
                    productArr = Object.values(res.data.products);
                    productArr.forEach(item => {
                        item.enable = true;
                        this.data.products.push(item);
                    })
                }
                this.render();
            })
    },
    delete(id) {
        axios.delete(`${this.data.url}/api/${this.data.path}/admin/product/${id}`)
            .then(res => {
                console.log(res);
                this.getData();
            })
    }
}
app.create();