Session.setDefault('page', 'home');
Session.setDefault('sidebar_color', 'orange');

var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;

util = {
    initPickColor: function(){
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    },



	showNotification: function(from, align){
    	color = Math.floor((Math.random() * 4) + 1);
      type = ['','info','success','warning','danger'];

    	$.notify({
        	icon: "pe-7s-gift",
        	message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."

        },{
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
	}
}


Meteor.startup(function () {
  Session.set('page', 'home');

  $(window).resize(function(){
      if($(window).width() <= 991){
          lbd.initRightMenu();
      }
  });

  lbd = {
      misc:{
          navbar_menu_visible: 0
      },

      checkSidebarImage: function(){
          $sidebar = $('.sidebar');
          image_src = $sidebar.data('image');

          if(image_src !== undefined){
              sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>'
              $sidebar.append(sidebar_container);
          }
      },
      initRightMenu: function(){
           if(!navbar_initialized){
              $navbar = $('nav').find('.navbar-collapse').first().clone(true);

              $sidebar = $('.sidebar');
              sidebar_color = $sidebar.data('color');

              $logo = $sidebar.find('.logo').first();
              logo_content = $logo[0].outerHTML;

              ul_content = '';

              $navbar.attr('data-color',sidebar_color);

              // add the content from the sidebar to the right menu
              content_buff = $sidebar.find('.nav').html();
              ul_content = ul_content + content_buff;

              //add the content from the regular header to the right menu
              $navbar.children('ul').each(function(){
                  content_buff = $(this).html();
                  ul_content = ul_content + content_buff;
              });

              ul_content = '<ul class="nav navbar-nav">' + ul_content + '</ul>';

              navbar_content = logo_content + ul_content;

              $navbar.html(navbar_content);

              $('body').append($navbar);

              background_image = $sidebar.data('image');
              if(background_image != undefined){
                  $navbar.css('background',"url('" + background_image + "')")
                         .removeAttr('data-nav-image')
                         .addClass('has-image');
              }


               $toggle = $('.navbar-toggle');

               $navbar.find('a').removeClass('btn btn-round btn-default');
               $navbar.find('button').removeClass('btn-round btn-fill btn-info btn-primary btn-success btn-danger btn-warning btn-neutral');
               $navbar.find('button').addClass('btn-simple btn-block');

               $toggle.click(function (){
                  if(lbd.misc.navbar_menu_visible == 1) {
                      $('html').removeClass('nav-open');
                      lbd.misc.navbar_menu_visible = 0;
                      $('#bodyClick').remove();
                       setTimeout(function(){
                          $toggle.removeClass('toggled');
                       }, 400);

                  } else {
                      setTimeout(function(){
                          $toggle.addClass('toggled');
                      }, 430);

                      div = '<div id="bodyClick"></div>';
                      $(div).appendTo("body").click(function() {
                          $('html').removeClass('nav-open');
                          lbd.misc.navbar_menu_visible = 0;
                          $('#bodyClick').remove();
                           setTimeout(function(){
                              $toggle.removeClass('toggled');
                           }, 400);
                      });

                      $('html').addClass('nav-open');
                      lbd.misc.navbar_menu_visible = 1;

                  }
              });
              navbar_initialized = true;
          }

      }
  };
});

Template.body.onRendered(function(){

    $.notify({
        icon: 'pe-7s-gift',
        message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."

      },{
          type: 'info',
          timer: 4000
      });

    window_width = $(window).width();

    // check if there is an image set for the sidebar's background
    lbd.checkSidebarImage();

    // Init navigation toggle for small screens
    if(window_width <= 991){
        lbd.initRightMenu();
    }

    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

    //      Activate the switches with icons
    if($('.switch').length != 0){
        $('.switch')['bootstrapSwitch']();
    }
    //      Activate regular switches
    if($("[data-toggle='switch']").length != 0){
         $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();
    }

    $('.form-control').on("focus", function(){
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function(){
        $(this).parent(".input-group").removeClass("input-group-focus");
    });
});

Template.card_pie.onRendered(function(){
  var dataPreferences = {
      series: [
          [25, 30, 20, 25]
      ]
  };

  var optionsPreferences = {
      donut: true,
      donutWidth: 40,
      startAngle: 0,
      total: 100,
      showLabel: false,
      axisX: {
          showGrid: false
      }
  };

  Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

  Chartist.Pie('#chartPreferences', {
    labels: ['62%','32%','6%'],
    series: [62, 32, 6]
  });
})

Template.card_chart.onRendered(function(){
  var dataSales = {
    labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
    series: [
       [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
      [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
      [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
    ]
  };

  var optionsSales = {
    lineSmooth: false,
    low: 0,
    high: 800,
    showArea: true,
    height: "245px",
    axisX: {
      showGrid: false,
    },
    lineSmooth: Chartist.Interpolation.simple({
      divisor: 3
    }),
    showLine: false,
    showPoint: false,
  };

  var responsiveSales = [
    ['screen and (max-width: 640px)', {
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
})

Template.card_graph.onRendered(function(){
  var data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
      [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
    ]
  };

  var options = {
      seriesBarDistance: 10,
      axisX: {
          showGrid: false
      },
      height: "245px"
  };

  var responsiveOptions = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  Chartist.Bar('#chartActivity', data, options, responsiveOptions);
})

Template.card_maps.onRendered(function(){
  var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
  console.log(myLatlng);
  var mapOptions = {
    zoom: 13,
    center: myLatlng,
    scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
    styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      title:"Hello World!"
  });

  // To add the marker to the map, call setMap();
  marker.setMap(map);
})

Template.main_panel.helpers({
  isPage: function(page){
    return Session.equals('page', page)
  }
})

Template.sidebar.helpers({
  color: function(){
    return Session.get('sidebar_color');
  }
})

UI.body.events({
  'click .clickChangesPage': function(event, template){
    Session.set('page', event.currentTarget.getAttribute('data-page'));
    //demo.initChartist();
  }
})
