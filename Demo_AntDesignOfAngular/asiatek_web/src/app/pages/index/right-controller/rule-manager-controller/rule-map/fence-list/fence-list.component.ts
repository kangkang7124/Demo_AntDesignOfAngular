import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fence-list',
  templateUrl: './fence-list.component.html',
  styleUrls: ['./fence-list.component.less']
})
export class FenceListComponent implements OnInit {
  searchValue: any;
  constructor() {}
  dataSet = [
    {
      key: '1',
      name: 'John Brown',
      age: 32
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32
    }
  ];
  delete(data: any) {
    const dataSet = this.dataSet.filter(d => d.key !== data.key);
    this.dataSet = dataSet;
    console.log(data);
  }
  edit(data: any) {}
  search() {}
  selectRow(data: any) {

    console.log(data);
  }
  ngOnInit() {}
}
