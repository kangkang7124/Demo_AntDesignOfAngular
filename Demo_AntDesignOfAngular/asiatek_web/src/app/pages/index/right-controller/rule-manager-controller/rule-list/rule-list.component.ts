import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.less']
})
export class RuleListComponent implements OnInit {
  constructor() {}
  isVisible = false;

  searchValue = '';

  filterAddressArray = [
    { text: 'London', value: 'London' },
    { text: 'Sidney', value: 'Sidney' }
  ];
  searchAddress = [];
  sortMap = {
    name: null,
    age: null,
    address: null
  };
  sortName = null;
  sortValue = null;
  data = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  displayData = [...this.data];
  ngOnInit() {}
  /**
   * 添加规则
   */
  addNewRule() {
    this.isVisible = !this.isVisible;
    console.log('添加');
  }

  sort(sortName: string, value: boolean): void {
    this.sortName = sortName;
    this.sortValue = value;
    // tslint:disable-next-line:forin
    for (const key in this.sortMap) {
      this.sortMap[key] = key === sortName ? value : null;
    }
    this.search();
  }

  filterAddressChange(value: string[]): void {
    this.searchAddress = value;
    this.search();
  }

  search(): void {
    const filterFunc = (item: { name: any; age?: number; address: any }) => {
      return (
        (this.searchAddress.length
          ? this.searchAddress.some(
              address => item.address.indexOf(address) !== -1
            )
          : true) && item.name.indexOf(this.searchValue) !== -1
      );
    };
    const data = this.data.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) =>
      this.sortValue === 'ascend'
        ? a[this.sortName] > b[this.sortName]
          ? 1
          : -1
        : b[this.sortName] > a[this.sortName]
        ? 1
        : -1
    );
  }
}
