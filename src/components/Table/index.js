import React from 'react';
import './index.css';

// headers = [{ html: '', prop: '' }]
// data = [{ prop: '' }]

const Table = (props) => (
  <table>
    <tbody>
      <tr>
        {props.headers.map(el =>
          <th key={el.prop}>{el.html}</th>
        )}
      </tr>
      {props.data.map(el => (
        <tr key={el[Object.keys(el)[0]]}>
          {props.headers.map(key => (
            <td key={key.prop}>{el[key.prop]}</td>  
          ))}
          <td><button onClick={() => props.delete(el.id)}>Delete Entry</button></td>
          {props.update !== undefined &&
            <td><button onClick={() => props.update(el.id)}>Update Entry</button></td>
          }
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
