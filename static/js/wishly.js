$(function() {
    $.ucfirst = function(str) {

        var text = str;


        var parts = text.split(' '),
            len = parts.length,
            i, words = [];
        for (i = 0; i < len; i++) {
            var part = parts[i];
            var first = part[0].toUpperCase();
            var rest = part.substring(1, part.length);
            var word = first + rest;
            words.push(word);

        }

        return words.join(' ');
    };



    // Edit Request Form
    $( "#editForm" ).submit(function( event ) {

      // Stop form from submitting normally
      event.preventDefault();

      // Get some values from elements on the page:
      var $form = $( this ),
          datastring = $form.serialize(),
          itemId = $form.attr("data-request-id");
          url = $form.attr( "action" )+itemId;
          btn = $('#edit-request-btn');

      btn.button('loading');
      $.ajax({
        url: url,
        data: $form.serialize(),
        type: 'POST',
        success: function(data){
            var $successMsg = $('.request-success');
            console.log ($successMsg);

            $successMsg.show();
            $successMsg.focus();
            setTimeout(function(){
                $successMsg.fadeOut();
            }, 2000);
        }
      }).always(function () {
        btn.button('reset')
      });

    });

    // Update Offer Status
    $('.offer-btn').click(function ( event ) {
      console.log('Button clicked')

      // Stop form from submitting normally
      event.preventDefault();

      var btn = $(this);

      btn.button('loading');
      $.ajax({
        url: '/offers/'+btn.attr('data-status')+'/'+btn.attr('data-hash'),
        data: '',
        type: 'POST',
        success: function(data){
            $('.action-wrapper').hide();

            if (data.status == 'ordered') {
              $('.new-status').addClass('btn-success').text($.ucfirst(data.status)).show();
            } else {
              $('.new-status').addClass('btn-danger').text($.ucfirst(data.status)).show();
            }
        }
      }).always(function () {
        btn.button('reset')
      });

    });


    // Form datepicker
    $(".date-picker").datepicker({ dateFormat: 'yy-mm-dd' });

    $(".date-picker").on("change", function () {
        var id = $(this).attr("id");
        var val = $("label[for='" + id + "']").text();
        $("#msg").text(val + " changed");
    });

});