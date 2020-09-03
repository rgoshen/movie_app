function appendNewRow() {
    console.log("Add New button clicked");
  
    //    var actions = $('table td:last-child').html();
    var actions =
      '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons"></i></a>' +
      '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons"></i></a>' +
      '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>';
    var index = $("table tbody tr:last-child").index();
    var row =
      "<tr>" +
      '<td><input type="text" class="form-control" name="name" id="name"></td>' +
      '<td><input type="text" class="form-control" name="department" id="department"></td>' +
      '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
      "<td>" +
      actions +
      "</td>" +
      "</tr>";
  
    $(".add-new").attr("disabled", "disabled");
    $("table").append(row);
    $("table tbody tr")
      .eq(index + 1)
      .find(".add, .edit")
      .toggle();
  }
  
  function addNewDataToRow() {
    console.log("add button clicked");
  
    var empty = false;
    var input = $(this).parents("tr").find('input[type="text"]');
  
    input.each(function () {
      if (!$(this).val()) {
        $(this).addClass("error");
        empty = true;
      } else {
        $(this).removeClass("error");
      }
    });
    $(this).parents("tr").find(".error").first().focus();
    if (!empty) {
      input.each(function () {
        $(this).parent("td").html($(this).val());
      });
      $(this).parents("tr").find(".add, .edit").toggle();
      $(".add-new").removeAttr("disabled");
    }
  }
  
  function editRowData() {
    console.log("edit button clicked");
  
    var cells = $(this).parents("tr").find("td:not(:last-child)");
  
    cells.each(function () {
      $(this).html(
        '<input type="text" class="form-control" value="' + $(this).text() + '">'
      );
    });
  
    $(this).parents("tr").find(".add, .edit").toggle();
    $(".add-new").attr("disabled", "disabled");
  }
  
  function deleteRow() {
    console.log("delete button clicked");
  
    $(this).parents("tr").remove();
    $(".add-new").removeAttr("disabled");
  }
