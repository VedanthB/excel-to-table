import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";

function App() {

  const [items, setItems] = useState([]);

  const readExcel = (file : Blob) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e : any) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d : any) => {
      setItems(d );

      console.log(d)
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e : any) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <table className="table container">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d['Table 1']}>
              <th>{d.Item}</th>
              <td>{d.D}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
