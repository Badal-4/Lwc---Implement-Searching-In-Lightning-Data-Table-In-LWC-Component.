import { LightningElement, track } from 'lwc';
import getAllAccounts from '@salesforce/apex/SearchInDataTableCtrl.getAllAccounts';
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
];
export default class SearchInDataTable extends LightningElement {
    @track allAccounts = [];
    @track mainAllAccounts = [];
    columns = columns;
    connectedCallback() {
        getAllAccounts()
            .then(response => {
                this.allAccounts = response;
                this.mainAllAccounts = response;
                if (response.length > 5) {
                    this.tableHeight = 'height: 200px';
                }
            })
    }
    searchHandler(event) {
        let searchKey = event.detail.value.toLowerCase();
        let searchedTempAccounts = [];
        if (event.detail.value.length > 1) {
            for (const account of this.mainAllAccounts) {
                if (account.Name.toLowerCase().includes(searchKey))
                    searchedTempAccounts.push(account);
            }
            this.allAccounts = searchedTempAccounts;
        }
        if (event.detail.value.length == 0)
            this.allAccounts = this.mainAllAccounts;
    }
}
