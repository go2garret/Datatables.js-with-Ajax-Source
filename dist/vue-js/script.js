new Vue({
  el: '#app',
  
  data: function() {
    return {    
      table: '#datatable',
      columns: ['airdate', 'name', 'season'],
      url: 'https://api.tvmaze.com/schedule?country=US&date=2014-12-01', 
      //url: any api will do. just update the columns that correspond to it.
      tableData: null,
      errors: null
    }
  },
  
  mounted() {
      let self = this;
      this.getData().then(function(data) {
        self.loadData(data);
        self.makeTable();
      });      
  },
  
  methods: {
    makeTable() {
      this.$nextTick(function() {
        $(this.table).DataTable(); 
      });
    },

    async getData() {
      let self = this;
      return axios.get(this.url)
        .then( function(response) {
          return response.data;
        })
        .catch( function(error) {
          self.errors = `The API is having an issue: ${error}`;
        });
    },

    loadData(data) {
      let self = this;
      let rows = [];
      
      data.forEach(function(row) {
        let theRow = {};
        self.columns.forEach(function(column) {   
          theRow[column] = row[column]
        });        
        rows.push(theRow);
      })
      
      this.tableData = rows;
    }
    
  }
});