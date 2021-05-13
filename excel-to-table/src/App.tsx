import React, { useState } from "react";
import './App.css';
import * as XLSX from "xlsx";


interface ProductDetailed {
	ID: string
	seller_id: string
	vis_id: string // visibile id from sheet
	Name: string 
	Description: string
	Price: number 
	min_order_qty: number
	Brand: string
  Category_1:string
  Category_2:string
  Category_3:string
  Category_4:string
  Category_5:string
  Field_1: string
  Field_2: string
 	additional_info: any
	img_url: string
	net_qty_in_stock?: null
	last_added?: null
	last_ordered?: null
	Visibility: number
	categories?: Array<string>
}


function App() {

  const [items, setItems] = useState<Array<ProductDetailed>>([]);

  const readExcel = (file : Blob) => {
    const promise : Promise<Array<ProductDetailed>> = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e : any) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data as Array<ProductDetailed>);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d : Array<ProductDetailed> ) => {
      setItems(d);

      console.log(d)
    });
  };

  console.log(items)

  return (
    <div className="app">
      <input
        type="file"
        onChange={(e : any) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <table >
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Visibility</th>
            <th scope="col">Category 1</th>
            <th scope="col">Category 2</th>
            <th scope="col">Category 3</th>
            <th scope="col">Category 4</th>
            <th scope="col">Category 5</th>
            <th scope="col">Field 1</th>
            <th scope="col">Field 2</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={ d.Name }>  
              <th>{d.ID}</th>
              <td>{d.Name}</td>
              <td>{d.Description}</td>
              <td>{d.Price}</td>
              <td>{d.Brand}</td>
              <td>{d.Visibility}</td>
              <td>{d?.Category_1}</td>
              <td>{d?.Category_2}</td>
              <td>{d?.Category_3}</td>
              <td>{d?.Category_4}</td>
              <td>{d?.Category_5}</td>
              <td>{d?.Field_1}</td>
              <td>{d?.Field_2}</td>

            </tr>
          ))} 
        </tbody>
      </table>

    
    </div>

  );
}

export default App;
