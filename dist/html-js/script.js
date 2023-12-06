document.addEventListener("DOMContentLoaded", async function () {
  let table = document.querySelector('#datatable');
  let columns = ['airdate', 'name', 'season'];
  let url = "https://api.tvmaze.com/schedule?country=US&date=2016-12-01";

  dataHeaders(table, columns);
  getData(url).then(function (response) {
    loadData(response, table, columns);
  });
});

function makeTable(element) {
  $(element).DataTable();
}

function dataHeaders(table, columns) {
  let header = table.querySelector('tr');
  columns.forEach(function (column) {
    let th = document.createElement('th');
    th.innerHTML = column;
    header.appendChild(th);
  });
}

async function getData(url) {
  return axios.get(url).
  then(function (response) {
    return response.data;
  }).
  catch(function (error) {
    console.log(error);
  });
}

function loadData(data, table, columns) {
  let tableBody = table.querySelector('tbody');

  data.forEach(function (row) {
    var tr = document.createElement('tr');

    columns.forEach(function (column) {
      var td = document.createElement('td');
      td.innerHTML = row[column];
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });

  makeTable(table);
}