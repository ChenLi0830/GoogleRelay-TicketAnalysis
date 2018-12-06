const fs = require("fs");
const csv = require("fast-csv");

const locationMap = {};

const NodeGeocoder = require("node-geocoder");

const csvStream = csv.createWriteStream({ headers: true });
const writableStream = fs.createWriteStream("ticketData.csv");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// csv
//   .fromStream(stream, { headers: true })
//   .on("data", data => {
//     console.log("I am one line of data", data);
//   })
//   .on("end", () => {
//     console.log("done");
//   });

const main = async () => {
  const options = {
    provider: "google",
    // Optional depending on the providers
    httpAdapter: "https", // Default
    apiKey: "AIzaSyDtTSVLcknONy9B3pootVzznfO7a8ky9YM", // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };

  const geocoder = NodeGeocoder(options);

  // Or using Promise
  try {
    fs.createReadStream("./2017-2018parkingTickets.csv")
      .pipe(csv())
      .on("data", async data => {
        //   const number = data[0]
        //   const road = data[1]
        const address = `${data[0]} ${data[1]}, Vancouver, BC, Canada`;
        // const address = `${data[0]} ${data[1]}, Vancouver, BC, Canada`;
        // console.log("address", address);

        locationMap[address] = locationMap[address]
          ? locationMap[address] + 1
          : 1;
        // console.log(result);
        // const row = {
        //   address: result[0].formattedAddress,
        //   longitude: result[0].longitude,
        //   latitude: result[0].latitude,
        //   date: data[2]
        // };
        // console.log("row", row);
        // csvStream.write(row);
      })
      .on("end", async () => {
        console.log("done");
        // console.log("locationMap", locationMap);
        // console.log("locationMap.length", Object.keys(locationMap).length);
        writableStream.on("finish", () => {
          console.log("DONE!");
        });
        csvStream.pipe(writableStream);

        const addresses = Object.keys(locationMap).slice(0, 4000);
        try {
          addresses.forEach(async location => {
            const result = await geocoder.geocode(location);

            const row = {
              address: location,
              ticketNumber: locationMap[location],
              longitude: result[0].longitude,
              latitude: result[0].latitude
            };
            console.log("row", row);
            csvStream.write(row);
          });
          //   for (const location of addresses) {
          //     // await sleep(30);
          //     const result = await geocoder.geocode(location);

          //     const row = {
          //       address: location,
          //       ticketNumber: locationMap[location],
          //       longitude: result[0].longitude,
          //       latitude: result[0].latitude
          //     };
          //     console.log("row", row);
          //     csvStream.write(row);
          //   }
        } catch (err) {
          console.log(err);
        }
        // csvStream.end();
      });
  } catch (error) {
    console.log(error);
  }
};

main();
