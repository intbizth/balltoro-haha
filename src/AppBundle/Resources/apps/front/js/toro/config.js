define(function() {
  var Config;
  return Config = function($scope) {
    return $scope.config = {
      canvasSelector: '#canvas',
      selectedImage: '_The_player_of_Liverpool_Luis_Suarez_on_the_field_049333_.jpg',
      image: {
        width: 1200,
        height: 628
      },
      fontFace: 'FreesiaUPC',
      fontList: [
        {
          name: 'Impact'
        }, {
          name: 'Comic Sans MS'
        }, {
          name: 'FreesiaUPC'
        }
      ],
      colors: ['#FFFFFF', '#000000', '#d40023', '#dae500', '#216cb6'],
      shadows: ['#FFFFFF', '#000000'],
      texts: [
        {
          memeText: '"Type here ..."',
          x: 840,
          y: 178,
          w: 0,
          h: 0,
          align: 'center',
          size: 85,
          color: '#FFFFFF',
          shadowColor: '#000000',
          border: 8,
          dragable: true
        }, {
          memeText: 'Balltoro MaN',
          x: 1150,
          y: 580,
          w: 0,
          h: 0,
          align: 'right',
          size: 50,
          color: '#FFFFFF',
          shadowColor: '#000000',
          border: 8,
          dragable: true
        }, {
          memeText: 'balltoro.com',
          x: 20,
          y: 600,
          w: 0,
          h: 0,
          align: 'left',
          size: 22,
          color: '#FFFFFF',
          shadowColor: '#000000',
          border: 2,
          dragable: false
        }
      ]
    };
  };
});
