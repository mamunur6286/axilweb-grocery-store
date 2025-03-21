<template>
<div>
    <CRow>
    <CCol col>
      <CCard>
        <CCardHeader>
            <div class="row">
                <div class="col-md-6">
                    <CIcon name="cil-justify-center"/><strong> Pre Order List</strong>
                </div>
                <div class="col-md-6">
                </div>
            </div>
        </CCardHeader>
        <CCardBody>
            <div class="row mb-4">
                <div class="col-md-3">
                    <div class="form-group">
                        <b-form-input v-model="search.name" placeholder="Enter full name"></b-form-input>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <b-form-input v-model="search.email" placeholder="Enter Email"></b-form-input>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <b-form-input v-model="search.phone" placeholder="Enter phone no"></b-form-input>
                    </div>
                </div>
                <div class="col-md-3">
                    <b-button class="btn btn-primary float-right" @click="loadData()">Search</b-button>
                </div>
            </div>
            <b-overlay :show='loading'>
                <div class="overflow-auto">
                    <b-table thead-class="bg-light text-dark" emptyText="Data Not Found" show-empty bordered hover :items="itemList" :fields="fields">
                        <template v-slot:cell(index)="data">
                            {{ data.index + pagination.slOffset }}
                        </template>
                        <template v-slot:cell(status)>
                            <span class="badge badge-success">Active</span>
                        </template>
                        <template v-slot:cell(action)="data">
                            <b-button v-if="data.item.status == 2" title="Active" class="btn btn-success mr-2 btn-sm" @click="deleteItem(data.item)"> <i class="ri-check-line"></i></b-button>
                            <b-button v-else title="Block" class="mr-2 btn btn-danger btn-sm" @click="deleteItem(data.item)"><i class="ri-close-line"></i></b-button>
                        </template>
                    </b-table>
                </div>
            </b-overlay>
            <b-pagination
            class="text-right"
            v-model="pagination.currentPage"
            :total-rows="pagination.total"
            :per-page="pagination.perPage"
            @input="searchData"
            ></b-pagination>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</div>
</template>
<script>
import RestApi, { baseUrl } from '../../config/api_config'
import iziToast from 'izitoast';

export default {
    components: {
    },
    created () {
        this.loadData ()
    },
    data() {
      return {
        search: {
            name: ''
        },
        pagination: {
            perPage: 10,
            currentPage: 1,
            total: 0,
            slOffset: 1
        },
        editId: ''
      }
    },
    computed: {
        itemList () {
            return this.$store.state.list
        },
        fields () {
            const labels = [
                { label: 'Sl No', class: 'text-left' },
                { label: 'Product', class: 'text-center' },
                { label: 'Name', class: 'text-center' },
                { label: 'Email', class: 'text-center' },
                { label: 'Phone', class: 'text-center' },
                { label: 'description', class: 'text-center' },
                { label: 'Status', class: 'text-center' },
                { label: 'Action', class: 'text-center' }
            ]

            let keys = []
            keys = [
            { key: 'index' },
            { key: 'product_id' },
            { key: 'name' },
            { key: 'email' },
            { key: 'phone' },
            { key: 'description' },
            { key: 'status' },
            { key: 'action' }
            ]
            return labels.map((item, index) => {
                return Object.assign(item, keys[index])
            })
        },
        loading () {
          return this.$store.state.static.loading
        },
        listReload () {
          return this.$store.state.static.listReload
        }
    },
    watch: {
      listReload: function (newVal) {
        if (newVal) {
            this.loadData()
        }
      }
    },
    methods: {
        edit (item) {
            this.editId = item.id
        },
        searchData () {
            this.loadData()
        },
        deleteItem (item) {
            this.$swal({
                title: 'Are you sure to delete ?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                focusConfirm: false
            }).then((result) => {
                if (result.isConfirmed) {
                this.remove(item)
                }
            })
        },
        remove (item) {
            RestApi.deleteData(baseUrl, `pre-orders/remove/${item.id}`).then(response => {
                if (response.success) {
                    this.$store.dispatch('mutedLoad', { listReload: true })
                    iziToast.success({
                        title: 'Success',
                        message: response.message
                    })
                } else {
                    iziToast.error({
                        title: 'Success',
                        message: response.message
                    })
                }
            })
        },
        loadData () {
            const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })
            this.$store.dispatch('mutedLoad', { loading: true})
            RestApi.getData(baseUrl, '/pre-orders', params).then(response => {
                if (response.success) {
                    this.$store.dispatch('setList', response.data.data)
                    this.paginationData(response.data)
                }
                this.$store.dispatch('mutedLoad', { loading: false })
            })
        },
        paginationData (data) {
            this.pagination.perPage = parseInt(data.per_page)
            this.pagination.currentPage = parseInt(data.current_page)
            this.pagination.total = parseInt(data.total)
            this.pagination.slOffset = this.pagination.perPage * this.pagination.currentPage - this.pagination.perPage + 1
        }
    },
    filters: {
        subStr: function(string) {
            return string.substring(0, 80) + '...';
        }
    }
}
</script>