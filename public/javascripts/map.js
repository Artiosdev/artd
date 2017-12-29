d3.csv('provpopzw.csv', function(d){
  return{
    province: d.provinceCode,
    provPopulation: +d.provincePopulation.replace(',',''),
  };  
}, function(data){
  d3.select('body').style('background-color', 'black');//css job
  
  const map = new Datamap({
    scope: 'zwe',
    element: document.getElementById('mapContainer'),
    responsive: true,
    geographyConfig:{
      highlightOnHover:false,
      popupTemplate: function(geo){
        function findProvince(provinces){
          return provinces.province == geo.id;
        }
        return['<div class="hoverinfo"><strong>',
              geo.properties.name,
              ':$' + data.find(findProvince).provPopulation,
              '</strong></div>'].join('');
      }
    }
  });

  //colors list
  const underfiveHunThousand = 'red',
    sevenFiftyThousand = 'yellow',
    oneMillion = 'blue',
    oneHalfMillion = 'green',
    twoMillion = 'brown',



  for (var i=0; i <data.length; i++){
    let st = d3.select('.' + data[i].state);

    if(data[i].provPopulation < 500000){
      st.style('fill', underfiveHunThousand);
    }else if(data[i].provPopulation >= 500000 && data[i].provPopulation < 750000){
      st.style('fill', sevenFiftyThousand);
    }else if(data[i].provPopulation >= 750000 && data[i].provPopulation < 1000000){
      st.style('fill', oneMillion);  
    }else if(data[i].provPopulation >= 2000000){
        st.style('fill', twoMillion);
    }

  }
  d3.select(window).on('resize', function(){
      map.resize();
  });  
});