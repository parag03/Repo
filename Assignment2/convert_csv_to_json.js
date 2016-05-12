
  var data='';
  var lines;

  //var life_expactancy_male=[];
  
  var arr=[];
  var theft=[];
  var assault=[];
  var flag=true;
  var cols=[];
  var header={};
  var crime=[{'Category':'Index Crime','Total cases':0},{'Category':'Non-Index Crime','Total cases':0}];
  var Category1=['01A','02','03','04A','04B','05','06','07','09'];
  var Category2=['01B','08A','08B','10','11','12','13','14','15','16','17','18','19','20','22','24','26'];
  const readline = require('readline');
  const fs = require('fs');

  const rl = readline.createInterface({
    input: fs.createReadStream('Crimes.csv')
  });


  rl.on('line', (line) => {
    cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    cols=cols||[];

    if (flag){
      flag=false;

      for (var i=0;i<cols.length;i++){

        header[cols[i]]=i;

      }

    }
    parseCsv(cols);
    //parseForIndia(line);
//console.log(life_expactancy_male);
  }).on ('close',()=>{
    var arr=[];
    sorted_theft=theft.sort(function(a,b){return a.Year - b.Year});
    //sorted_theft_under=theft_under.sort(function(a,b){return a.Year - b.Year});
    sorted_assault=assault.sort(function(a,b){return a.Year - b.Year});
    //var stack_bar={}
    //stack_bar['Male']=life_expactancy_male;
    //stack_bar['Female']=life_expactancy_female;
    //theft['Theft Over $500']=sorted_theft_over;
    //theft['Theft Under $500']=sorted_theft_under;

    fs.writeFile('Theft.json',JSON.stringify(theft,null,2),function(err){
      if(err){
        console.log(err);

      }
      else{
        console.log("Saved");
      }
    });
    fs.writeFile('group.json',JSON.stringify(crime,null,2),function(err){
      if(err){
        console.log(err);

      }
      else{
        console.log("Saved");
      }
    });
     fs.writeFile('assault.json',JSON.stringify(sorted_assault,null,2),function(err){
       if(err){
         console.log(err);

       }
       else{
         console.log("Saved");
       }
     });

  });




function parseCsv(cols){


    cols=cols||[];
      //console.log(cols);

        if (cols[header['Primary Type']]==="THEFT" && cols[header['Description']]==="$500 AND UNDER"){
          //console.log(cols[0]);

            //console.log(cols[0]);
            var control=false;

            for (var i=0;i<theft.length;i++)
            {
              if(theft[i]['Year']===cols[header['Year']]){
                //console.log("Country matched");

                  //console.log("Updating....");
                  theft[i]['THEFT $500 AND UNDER Cases']+=1;
                  control=true;
                  //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);

              }}

              if(!control){

                    theft.push({'Year':cols[header['Year']],'THEFT $500 AND UNDER Cases':1,'THEFT ABOVE $500 Cases':0});
                //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);
                //console.log(life_expactancy_female);

              }

            }
            else{
              if (cols[header['Primary Type']]==="THEFT" && cols[header['Description']]==="OVER $500"){
                //console.log(cols[0]);

                  //console.log(cols[0]);
                  var control=false;

                  for (var i=0;i<theft.length;i++)
                  {
                    if(theft[i]['Year']===cols[header['Year']]){
                      //console.log("Country matched");

                        //console.log("Updating....");
                        theft[i]['THEFT ABOVE $500 Cases']+=1;
                        control=true;
                        //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);

                    }}

                    if(!control){

                          theft.push({'Year':cols[header['Year']],'THEFT $500 AND UNDER Cases':0,'THEFT ABOVE $500 Cases':1});
                      //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);
                      //console.log(life_expactancy_female);

                    }

                  }
            }

            if (cols[header['Primary Type']]==="ASSAULT" && cols[header['Arrest']]==="true"){
              //console.log(cols[0]);

                //console.log(cols[0]);
                var control_variable=false;

                for (var i=0;i<assault.length;i++)
                {
                  if(assault[i]['Year']===cols[header['Year']]){
                    //console.log("Country matched");

                      //console.log("Updating....");
                      assault[i]['Arrested']+=1;
                      control_variable=true;
                      //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);

                  }}

                  if(!control_variable){

                        assault.push({'Year':cols[header['Year']],'Arrested':1,'Not Arrested':0});
                    //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);
                    //console.log(life_expactancy_female);

                  }

                }
                else{
                  if (cols[header['Primary Type']]==="ASSAULT" && cols[header['Arrest']]==="false"){


                      //console.log(cols[0]);
                      var control=false;

                      for (var i=0;i<assault.length;i++)
                      {
                        if(assault[i]['Year']===cols[header['Year']]){

                            assault[i]['Not Arrested']+=1;
                            control=true;


                        }}

                        if(!control){

                              assault.push({'Year':cols[header['Year']],'Arrested':0,'Not Arrested':1});


                        }

                      }
                }




                    if(Category1.indexOf(cols[header['FBI Code']])>-1){
                      crime[0]['Total cases']+=1;
                      flag=true;

                    }
                    else{
                      if(Category2.indexOf(cols[header['FBI Code']])>-1){
                        crime[1]['Total cases']+=1;
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
