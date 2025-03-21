const state = {
	commonObj: {
		hasDropdownLoaded: true,
		productList: []
	},
	token: localStorage.getItem('access_token') || '',
	user: '',
	sidebarMinimize: false,
	lang: 'en', 
	allMessage:[],
	static: {
		loading: false,
		listReload: false,
        dateFormat: 'DD/MM/YYYY'
	},
	list: []
} 
export default state