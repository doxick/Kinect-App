"use strict";
var Pako = require('pako');

class PixelData {
    constructor(data, options)
    {
        this.width = this.height = 0;

        options.deflated
            ? this.setDeflatedData(data)    // did we receive the data deflated? first 4 bytes will be width+height
            : this.setData(data, options.width, options.height); // we received raw data, need width+height
    }
    /*
        @public
        return a new resized pixel array
     */
    resize(newWidth, newHeight)
    {
        var stepX = this.width / newWidth,      // take a sample every stepX pixels
            stepY = this.height / newHeight;    // no bilinear interpolation (...yet!)
        var cx, // current X. Since step{X,Y} will be floats, we need to floor them every time
            cyi, // current y index. We hoist it instead of going 'cy * w + x' we can then do 'cyi + x'
            ci = 0, // current pixel index
            coi, // current old pixel index. instead of creating a new variable each iteration... we hoist it
            _floor = Math.floor, // shortcut to save some scoping. Premature optimization much...
            data = new Uint8Array(4 * newWidth * newHeight);
        for(let y = 0, h = this.height, w = this.width; y < h; y += stepY)
        {
            cyi = _floor(y) * w;
            for(let x = 0; x < w; x += stepX, ci += 4)
            {
                coi = (cyi + _floor(x)) * 4; // every original pixel has 4 bytes...
                data[ci + 0] = this.data[coi + 0];  // r
                data[ci + 1] = this.data[coi + 1];  // g
                data[ci + 2] = this.data[coi + 2];  // b
                data[ci + 3] = 255;                 // a (255 = opaque)
            }
        }
        return new PixelData(data, {width: newWidth, height: newHeight});
    }
    /*
        @public
        set the raw pixel data
     */
    setData(data, width, height)
    {
        this.data = data;
        this.width = width;
        this.height = height;
    }
    /*
        @public
        set the zlib deflated 24 bits Uint8Array, convert it into 32bits in the meanwhile
     */
    setDeflatedData(data)
    {
        data = Pako.inflate(data);
        var width = (data[0] << 8) + data[1];
        var height = (data[2] << 8) + data[3];
        var newData = new Uint8Array(4 * width * height);
        for (let iter1 = 0, iter2 = 4, end = 4 * width * height; iter1 < end; iter1 += 4, iter2 += 3)
        {
            newData[iter1 + 0] = data[iter2 + 0];
            newData[iter1 + 1] = data[iter2 + 1];
            newData[iter1 + 2] = data[iter2 + 2];
            newData[iter1 + 3] = 255;
        }
        this.setData(newData, width, height);
    }
    /*
     @public
     return a zlib deflated 24 bits Uint8Array (we skip the alpha channel for now)
     the first 4 bytes of the array are width(2bytes) and height(2bytes)
     max width and height of 65535
     */
    getDeflatedData()
    {
        // first we convert it to 24bits from 32 bits
        // the first 4 bytes of the returned
        var newData = new Uint8Array(3 * this.width * this.height + 4),
            data = this.data;

        newData[0] = (this.width >> 8) & 255;
        newData[1] = this.width & 255;
        newData[2] = (this.height >> 8) & 255;
        newData[3] = this.height & 255;

        for (let iter1 = 0, iter2 = 4, end = 4 * this.width * this.height; iter1 < end; iter1 += 4, iter2 += 3)
        {
            newData[iter2 + 0] = data[iter1 + 0];
            newData[iter2 + 1] = data[iter1 + 1];
            newData[iter2 + 2] = data[iter1 + 2];
        }
        return Pako.deflate(newData);
    }
}

module.exports = PixelData;