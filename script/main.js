/**
 * Created by matt on 11.04.17.
 */

function Data(){
    this.name = "name";
    this.menu = {}; //will be overwrtten by GET callback
    this.numberOfCategories = -1;
    this.products = [];

    this.init = function(){


        //calc number of categories
        for (i=0; i<this.menu.length; i++)
        {
            if ( parseInt(this.menu[i].category)   >    this.numberOfCategories){
                this.numberOfCategories = parseInt(this.menu[i].category);
            }
        }


        //create empty arrays
        for (i=0; i< this.numberOfCategories ; i++)
        {
            this.products[i] = [];
        }

        //push items to arrays
        for (i=0; i<this.menu.length; i++)
        {
            this.products[parseInt(this.menu[i].category)-1].push(this.menu[i]);
        }


        this.createTable();

    }

    this.createTable = function(){

        for (i=0; i< this.products.length;  i++)
        {
            var table = document.createElement("table");
            table.className = "table table-hover";
            table.id = ""+i;
            $(table).append("<thead>" + "" +
                "<tr><th>Nazwa</th><th>Cena</th><th>Usuń</th></tr>"+
                '</thead><tbody>');

            $('#menu-container').append(table);


            for (j=0; j<this.products[i].length; j++)
            {
                var item = this.products[i][j];
                var value = i+""+j;
                $(table).append('<tr id="'+value+'">'+
                    '<td><input value="'+item['name']+'" />'+"</td>"+
                    '<td><input value="'+item['price']+'" />'+"</td>"+
                    '<td><button onclick="deleteTR('+value+')">usuń</button></td>'+

                    "</tr>"
                )

            }

            $(table).append("<tr><td colspan='4'><button class='btn btn-success' onclick='add("+'"'+table.id+'"'+")'>Dodaj pozycję</button>  </td></tr>");


            $(table).append("</tbody>");


        }

    }
}


var deleteTR = function(value){
    console.log("chce usunac "+value);
    $("#"+value).remove();
}

var add = function(id){

    var count = $('#'+id+"> tbody").children().length;
    var newId = id + "" + count;
    console.log(count);

    $('#'+id + ' tr').last().before('<tr id="'+newId+'">'+
        '<td><input value="" />'+"</td>"+
        '<td><input value="" />'+"</td>"+
        '<td><button onclick="deleteTR('+newId+')">usuń</button></td>'+

        "</tr>"
    )
}


var data;


$(document).ready(function(){

    data = new Data();

    $.get( "../../menuboard/php/json2.php?login=user", function( _data ) {
        console.log("pobrano data");
        data.menu = JSON.parse(_data);
        data.init();
    });

})













