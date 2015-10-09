var Kinect2 = require('kinect2'),
    BodyData = require('./includes/bodydata/bodydata');

var express = require('express'),
    app = express(),
    expressWs = require('express-ws')(app),
    path = require('path'),
    wsServer;

app.use(express.static(path.resolve(__dirname,'build')));
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin','*");
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
});
app.listen(1234,function(){
    console.log('Express server running on port: 1234');
});
app.ws('/',function(ws, req){

});
wsServer = expressWs.getWss('/');


var broadCastPacket = function(wss, type, data)
{
    wss.clients.forEach(function(client){
        try {
            client.send(JSON.stringify({
                type: type,
                data: data
            }));
        } catch (e)
        {

        }
    });
};

(function(){
    var kinect = new Kinect2();
    if (! kinect.open())
        return;
    kinect.on('colorFrame',function(colorFrame){
        var pData = new PixelData(colorFrame, {width: 1920, height: 1080}).resize(320, 180).getDeflatedData();
        broadCastpacket(wsServer, 'colorData',btoa(pData));
    });
    //kinect.openColorReader(); // unused for now
    kinect.on('bodyFrame', function(bodyFrame){
        var bodyData = new BodyData(bodyFrame);
        broadCastPacket(wsServer, 'bodyData',bodyData.getData());
    });
    kinect.openBodyReader();
})();