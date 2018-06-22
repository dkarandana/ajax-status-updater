let has = Object.prototype.hasOwnProperty;

class StatChecker{
  constructor( timing ){
    console.log("Stat Runner is watching...");

    this.queue = {
      pushnotification:[],
      email:[]
    }

    this.timing = timing;

    this.timeout = this.timing.min;

    setInterval(()=>{
       console.log("timer",new Date().toUTCString());
    },5000);

    this.fetchTimer();
   
  }

  serverFetch(){
    return new Promise((resolve,reject)=>{

      setTimeout(()=>{

         if(false){
           resolve({stat:true});
         }else{
           reject({stat:false});
         }
         
      },this.timeout);
     
    });

  }

  addWatch( service, hash ){
    console.log("add watch", service, hash );

    if( has.call( this.queue,service )){
      this.queue[service].push(hash);
    }
  }

  currentQueue(){
    return this.queue;
  }

  fetchTimer(){
    this.timer = setInterval(()=>{

      let q = 0;
      Object.keys(this.currentQueue()).forEach((service)=>{
          q += this.currentQueue()[service].length;
      });

      //there are items to fetch
      if( q ){

        this.serverFetch()
          .then((response)=>{
            console.log( response );
          })
          .catch((reject)=>{

              clearInterval(this.timer);
              this.timeout = this.timing.max;
              this.fetchTimer();

            console.log(reject);
          });

        console.log(q,"Fetch",Math.random());
      }

      console.log('Fetched>>>>>');
    },this.timeout);

   
  }


 
}

export default StatChecker;
