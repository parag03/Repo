
  var data='';
  var lines;
  var Asia_country_array =["India","Japan","China","Mongolia","SriLanka","Myanmar","Bhutan","Cambodia","Pakistan","Indonesia","Thailand","Russian Federation"];
  var result=[];
  var life_expactancy=[];
  //var life_expactancy_male=[];
  var rate=[];
  var life_expactancy_total=[];
  var arr=[];

  const readline = require('readline');
  const fs = require('fs');

  const rl = readline.createInterface({
    input: fs.createReadStream('Indicators.csv')
  });


  rl.on('line', (line) => {

    parseCsv(line);
    parseForIndia(line);
//console.log(life_expactancy_male);
  }).on ('close',()=>{
    var arr=[];
    sorted_arr=life_expactancy_total.sort(function(a,b){return a.Value - b.Value});
    //var stack_bar={}
    //stack_bar['Male']=life_expactancy_male;
    //stack_bar['Female']=life_expactancy_female;
    fs.writeFile('Life_expectancy.json',JSON.stringify(life_expactancy,null,2),function(err){
      if(err){
        console.log(err);

      }
      else{
        console.log("Saved");
      }
    });
    fs.writeFile('top.json',JSON.stringify(sorted_arr.reverse().slice(0,5),null,2),function(err){
      if(err){
        console.log(err);

      }
      else{
        console.log("Saved");
      }
    });
    fs.writeFile('rate.json',JSON.stringify(rate,null,2),function(err){
      if(err){
        console.log(err);

      }
      else{
        console.log("Saved");
      }
    });
    console.log(JSON.stringify(life_expactancy));
    //console.log(JSON.stringify(life_expactancy));
    console.log(JSON.stringify(rate));
    //console.log(JSON.stringify(death_rate));
    console.log(JSON.stringify(life_expactancy_total));
    // var life_male=[];
    // for (i in life_expactancy_male){
    //   life_male.push({'CountryName':i,'Value':life_expactancy_male[i]});
    // }
    // for (i in life_expactancy_male){
    //   life_male.push({'CountryName':i,'Value':life_expactancy_male[i]});
    // }
    // for (i in life_expactancy_male){
    //   life_male.push({'CountryName':i,'Value':life_expactancy_male[i]});
    // }
    // for (i in life_expactancy_male){
    //   life_male.push({'CountryName':i,'Value':life_expactancy_male[i]});
    // }
    // for (a in life_expactancy_total){
    //   arr.push([a,life_expactancy_total[a]]);
    // }
    // //console.log("array is"+arr);

    //
    //console.log(JSON.stringify(sorted_arr.reverse()));
  });

      //console.log(data);




    //console.log(lines);

    //console.log("Headers"+headers);


function parseCsv(lines){
  var obj={};
    var cols = lines.match(/("[^']+"|[^,]+)/g);
    cols=cols||[];

      for (var j=0;j<Asia_country_array.length;j++){
        //console.log(j);
        if (cols[0]===Asia_country_array[j]){
          //console.log(cols[0]);
          if(cols[3]==='SP.DYN.LE00.FE.IN'){
            //console.log(cols[0]);
            var control=false;

            for (var i=0;i<life_expactancy.length;i++)
            {
              if(life_expactancy[i]['CountryName']===cols[0]){
                //console.log("Country matched");
                if(isNaN(parseFloat(cols[5]) )===false){
                  //console.log("Updating....");
                  life_expactancy[i]['Female']+=parseFloat(cols[5]);
                  control=true;
                  //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);

              }}}

              if(!control){
                  if(isNaN(parseFloat(cols[5]) )===false){
                    life_expactancy.push({'CountryName':cols[0],'Female':parseFloat(cols[5]),'Male':parseFloat(0)});
                //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);
                //console.log(life_expactancy_female);

              }
              else{
                life_expactancy_female.push({'CountryName':cols[0],'Female':parseFloat(0),'Male':parseFloat(0)});

              }
            }





          }


          if(cols[3]==='SP.DYN.LE00.MA.IN'){
            //console.log(cols[0]);
            var counter=false;
            for (var i=0;i<life_expactancy.length;i++)
            {
              if(life_expactancy[i]['CountryName']===cols[0]){
                //console.log("Country matched");
                if(isNaN(parseFloat(cols[5]) )===false){
                  //console.log("Updating....");
                  life_expactancy[i]['Male']+=parseFloat(cols[5]);
                  counter=true;
                  //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);

              }}}

                if(!counter){
                //console.log("Country "+cols[0]);
                  if(isNaN(parseFloat(cols[5]) )===false){
                life_expactancy.push({'CountryName':cols[0],'Female':parseFloat(0),'Male':parseFloat(cols[5])});
                //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);
                //console.log(life_expactancy_female);
                //break;
              }
              else{
                life_expactancy.push({'CountryName':cols[0],'Female':parseFloat(0),'Male':parseFloat(0)});
                //break;
              }
            }



              }

            }
          }


      if(cols[3]==='SP.DYN.LE00.IN'){
        var control_variable=false;
        //console.log(cols[0]);


        for (var i=0;i<life_expactancy_total.length;i++)
        {
          if(life_expactancy_total[i]['CountryName']===cols[0]){
            //console.log("Country matched");
            if(isNaN(parseFloat(cols[5]) )===false){
              //console.log("Updating....");
              life_expactancy_total[i]['Value']+=parseFloat(cols[5]);
              control_variable=true;
              //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);

          }}}

            if(!(control_variable)){
            //console.log("Country "+cols[0]);
              if(isNaN(parseFloat(cols[5]) )===false){
                life_expactancy_total.push({'CountryName':cols[0],'Value':parseFloat(cols[5])});
            //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);
            //console.log(life_expactancy_female);
                //break;
          }
          else{
            life_expactancy_total.push({'CountryName':cols[0],'Value':parseFloat(0)});
            //break;
          }
        }



          }

        }


function parseForIndia(lines){
  var cols = lines.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
  cols=cols||[];
  if (cols[0]==="India" && cols[3]==='SP.DYN.CDRT.IN'){
    var control_variable=false;
    //console.log(cols[0]);


    for (var i=0;i<rate.length;i++)
    {
      if(rate[i]['Year']===parseInt(cols[4])){
        //console.log("Country matched");

          //console.log("Updating....");
          rate[i]['Death-Rate']=parseFloat(cols[5]);
          control_variable=true;
          //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);

      }}

        if(!(control_variable)){
          rate.push({'Year':parseInt(cols[4]),'Death-Rate':parseFloat(cols[5]),'Birth-Rate':0});

      }

    }
    if (cols[0]==="India" && cols[3]==='SP.DYN.CBRT.IN'){
      var control_variable=false;

      for (var i=0;i<rate.length;i++)
      {
        if(rate[i]['Year']===parseInt(cols[4])){
          //console.log("Country matched");

            //console.log("Updating....");
            rate[i]['Birth-Rate']=parseFloat(cols[5]);
            control_variable=true;
            //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);

        }}

          if(!(control_variable)){
          //console.log("Country "+cols[0]);

            rate.push({'Year':parseInt(cols[4]),'Death-Rate':0,'Birth-Rate':parseFloat(cols[5])});
          //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);
          //console.log(life_expactancy_female);
              //break;
        }

      }

}
