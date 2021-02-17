import requirejs from 'requirejs';
import EventsModel from '../models/event.js';
import UserModel from '../models/user.js';
import {createEventAlert} from '../RouteFunctions/alertsFunctions.js';
import {socketIO} from '../server.js';
import mongoose from 'mongoose';

const schedule = requirejs( "node-schedule");
import finnhubPkg from "@stoqey/finnhub/dist/api/index.js";
const { FinnhubAPI } = finnhubPkg;
const finnhub = new FinnhubAPI(process.env.FINNHUB_KEY);

const tradingDay = new schedule.RecurrenceRule();

tradingDay.dayOfWeek = schedule.Range(0, 6);
tradingDay.hour =  schedule.Range(9, 16);


let startTime = new Date(Date.now() + 5000);
let endTime = new Date(startTime.getTime() + 5000);

const triggerEvents = schedule.scheduleJob( ' */1 0-16 * * 1-6', ()=>{
   
   EventsModel.find().distinct('symbol', function(error, symbols) {
    console.log(symbols);
    symbols.forEach(async(symbol) => {
      const quote = await finnhub.getQuote(symbol);
      console.log(quote);
        EventsModel.find({symbol, called_today:false, active:true}).exec((err, events)=>{
        events.map(async(event)=>{
            switch(event.prop){
                case "PRICE":
                    if(event.level==="ABOVE"&&event.stat < quote.close){
                            console.log(true);

                          let newAlert=  createEventAlert(event)._doc;
                          console.log({newAlert})
                          if(newAlert){
                              socketIO.emit("new-event-alert", newAlert);
                     
                          }
                          let id =mongoose.Types.ObjectId(event._id) ;
                           UserModel.findOneAndUpdate(
                                { "events._id": id },
                                { $set: { "events.$.called_today": true } },
                                (err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(
                                    "event.called_today of '" + event._id + "' changed to " + true
                                    );
                                             }
                                }
                            );

                        }else if(event.level==="BELOW"&&event.stat > quote.close){
                            console.log(true);
                        }
                        break;
                case "CHANGE":
                 if(event.level==="ABOVE"&&event.stat < quote.close){
                            console.log(true)
                        }else if(event.level==="BELOW"&&event.stat > quote.close){
                            console.log(true);
                        }
break;
                case "VOLUME":
                 if(event.level==="ABOVE"&&event.stat < quote.close){
                            console.log(true)
                        }else if(event.level==="BELOW"&&event.stat > quote.close){
                            console.log(true);
                        }
break;

                    
            }
        })
        })
    });
});
})



const sort_events_into_symbol_order=(events)=>{
    let sortedData = {}

}