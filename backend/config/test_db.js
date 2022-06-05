const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
let mongod;
const TableModel = require("../models/table");
const ReservationModel = require("../models/reservation");
const UserModel = require("../models/user");

module.exports = {
    connect: async () => {
        mongod = await MongoMemoryServer.create();

        mongoose
            .connect(mongod.getUri())
            .then(async () => {
                await TableModel.insertMany([
                    {
                        "_id": "6281563a6d818d88a9206ad2",
                        "capacity": 4,
                        "tableId": 1
                    },
                    {
                        "_id": "628156a96d818d88a9206ad3",
                        "capacity": 4,
                        "tableId": 2
                    },
                    {
                        "_id": "628a206879a02f41f94094da",
                        "capacity": 4,
                        "tableId": 3
                    },
                    {
                        "_id": "628a208d79a02f41f94094db",
                        "capacity": 2,
                        "tableId": 4
                    },
                    {
                        "_id": "628a20b379a02f41f94094dc",
                        "capacity": 2,
                        "tableId": 5
                    },
                    {
                        "_id": "628a20c279a02f41f94094dd",
                        "capacity": 2,
                        "tableId": 6
                    },
                    {
                        "_id": "628a20d379a02f41f94094de",
                        "capacity": 2,
                        "tableId": 7
                    },
                    {
                        "_id": "628a20e579a02f41f94094df",
                        "capacity": 2,
                        "tableId": 8
                    },
                    {
                        "_id": "628a20f979a02f41f94094e0",
                        "capacity": 2,
                        "tableId": 9
                    },
                    {
                        "_id": "628a210879a02f41f94094e1",
                        "capacity": 5,
                        "tableId": 10
                    },
                    {
                        "_id": "628a211879a02f41f94094e2",
                        "capacity": 5,
                        "tableId": 11
                    },
                    {
                        "_id": "628a212f79a02f41f94094e3",
                        "capacity": 8,
                        "tableId": 12
                    },
                    {
                        "_id": "628a220779a02f41f94094e4",
                        "capacity": 8,
                        "tableId": 13
                    },
                    {
                        "_id": "628a222579a02f41f94094e5",
                        "capacity": 4,
                        "tableId": 14
                    },
                    {
                        "_id": "628a224279a02f41f94094e6",
                        "capacity": 2,
                        "tableId": 15
                    },
                    {
                        "_id": "628a225679a02f41f94094e7",
                        "capacity": 2,
                        "tableId": 16
                    },
                    {
                        "_id": "628a226379a02f41f94094e8",
                        "capacity": 2,
                        "tableId": 17
                    },
                    {
                        "_id": "628a228c79a02f41f94094e9",
                        "capacity": 4,
                        "tableId": 18
                    },
                    {
                        "_id": "628a22a479a02f41f94094ea",
                        "capacity": 2,
                        "tableId": 19
                    },
                    {
                        "_id": "628a22b679a02f41f94094eb",
                        "capacity": 6,
                        "tableId": 20
                    },
                    {
                        "_id": "628a22d079a02f41f94094ec",
                        "capacity": 1,
                        "tableId": 21
                    },
                    {
                        "_id": "628a22e379a02f41f94094ed",
                        "capacity": 1,
                        "tableId": 22
                    },
                    {
                        "_id": "628a22f279a02f41f94094ee",
                        "capacity": 1,
                        "tableId": 23
                    },
                    {
                        "_id": "628a231179a02f41f94094ef",
                        "capacity": 1,
                        "tableId": 24
                    },
                    {
                        "_id": "628a232279a02f41f94094f0",
                        "capacity": 1,
                        "tableId": 25
                    }
                ]);
                await UserModel.create({
                    "_id": "6293ba381c71a1088f0074bc",
                    "email": "soniamalish17@gmail.com",
                    "password": "123456!",
                    "name": "Sofiia",
                    "surname": "Malyshok",
                    "phone": "+48737579310"
                });
                await ReservationModel.insertMany([{
                    "_id": "62952353a82d49d9dc6f1f81",
                    "user": "6293ba381c71a1088f0074bc",
                    "table": "628156a96d818d88a9206ad3",
                    "numberOfGuests": 1,
                    "fromDate": "2022-05-30T16:00:53.103Z",
                    "toDate": "2022-05-30T17:00:53.103Z",
                    "dateOfReservation": "2022-05-30T20:03:49.609Z",
                    "__v": 0
                },
                {
                    "_id": "629523c2a82d49d9dc6f1fa4",
                    "user": "6293ba381c71a1088f0074bc",
                    "table": "628a22f279a02f41f94094ee",
                    "numberOfGuests": 1,
                    "fromDate": "2022-05-30T16:00:59.165Z",
                    "toDate": "2022-05-30T17:00:59.165Z",
                    "dateOfReservation": "2022-05-30T20:03:49.609Z",
                    "__v": 0
                },
                {
                    "_id": "629523f8a82d49d9dc6f1fc8",
                    "user": "6293ba381c71a1088f0074bc",
                    "table": "628a220779a02f41f94094e4",
                    "numberOfGuests": 1,
                    "fromDate": "2022-05-30T16:00:10.945Z",
                    "toDate": "2022-05-30T17:00:10.945Z",
                    "dateOfReservation": "2022-05-30T20:03:49.609Z",
                    "__v": 0
                }]
                );
            })
            .catch((err) => console.error(`Connection to mongoDB failed: ${err}`));
    },
    disconnect: async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongod.stop();
    },

    clear: async () => {
        await mongoose.connection.dropDatabase();
    },
};
