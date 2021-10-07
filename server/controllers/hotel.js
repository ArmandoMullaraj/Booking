import Hotel from '../models/hotel';
import fs from 'fs';                //to make sure we read the entire file sync img
import { exec } from 'child_process';

export const create = async (req, res) => {
    
    try {
        let fields = req.fields
        let files = req.files

        let hotel = new Hotel(fields);
        hotel.postedBy = req.user._id;
        //handle image
        if(files.image) {
            hotel.image.data = fs.readFileSync(files.image.path);
            hotel.image.contentType = files.image.type;
        }

        hotel.save((err, result) => {
            if(err) {
                console.log('saving hotel err => ', err)
                res.status(400).send('Error saving');
            }
            res.json(result);
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({

        })
    }
};

export const hotels = async (req, res) => {
    let all = await Hotel.find({})      //find method gives us all the hotels
    .limit(24)                          //with a limit of 24
    .select('-image.data')              //and then I want to select everything except image because its a buffer it's too big
    .populate("postedBy", '_id name')   
    .exec();
    res.json(all);
};

export const image = async (req, res) => {
    let hotel = await Hotel.findById(req.params.hotelId).exec(); //first let's find the hotel
    if (hotel && hotel.image && hotel.image.data !== null) {     //some user might create without image
        res.set('Content-Type', hotel.image.contentType)         //in that case we use content type in the header
        return res.send(hotel.image.data);                       //then we give the image
    }
};

export const sellerHotels = async (req, res) => {               
    let all = await Hotel.find({postedBy: request.user._id})    
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec();

    res.send(all);
}