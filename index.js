const { urlencoded, request, response } = require("express");
const express = require ("express")
const app = express()

const port = 8000;



app.set("view engine", "hbs") // set view engin hbs

app.use("/public", express.static(__dirname + "/public")) //static folder

app.use(express.urlencoded({extended: false}))


let dataProject = []
let isLogin = true;


app.get("/", function (request, response){
    console.log(dataProject)

  let  data = dataProject.map(function (item){
    return {
        ...item,
        isLogin,
        duration: distanceTime(item.startDate, item.endDate),
        start: fullTime(item.startDate),
        end: fullTime(item.endDate)

    }
})
response.render("index", {isLogin, data})
})

app.get("/add-project", function(request, response){


    response.render("project")
})

app.post("/add-project", function(request, response){
    let data = request.body

    let project = {
        name: data.inputProject,
        startDate: data.inputStart,
        endDate: data.inputEnd,
        message: data.inputMassage,
        node: data.inputode,
        angular: data.inputAngular,
        react: data.inputReact,
        golang: data.inputGolang,
        image: data.inputImage,
    }
    // console.log(project.image);
    dataProject.push(project)
    response.redirect("/")
})

app.get("/detail-project/:index", function (request, response){
    let index = request.params.index


    let data = dataProject[index]

    let duration = distanceTime(data.startDate, data.endDate)
    let start = fullTime(data.startDate)
    let end = fullTime(data.endDate)


    console.log(data);
    response.render("detail-project", {data, duration, start, end})
})

app.get("/update/:index", function(request, response){
    let index = request.params.index

    let data = dataProject[index]

    response.render("update", {index, data})
})

app.post("/update/:index", function (request, response){
    let index = request.params.index
    let data = request.body

    let updateData = {
        name: data.inputProject,
        startDate: data.inputStart,
        endDate: data.inputEnd,
        message: data.inputMassage,
        node: data.inputode,
        angular: data.inputAngular,
        react: data.inputReact,
        golang: data.inputGolang,
        image: data.inputImage,
    }

    dataProject[index] = updateData
    // console.log(updateData);
    response.redirect("/")

})




app.get("/delete/:index", function(request, response){
    let index = request.params.index

    dataProject.splice(index, 1)
    response.redirect("/")
})

app.get("/contact-me", function(request, response){
    response.render("contact-me")
})


function fullTime(times) {

 let time = new Date(times)

    let month = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ]
    let date = time.getDate()
    let monthIndex = time.getMonth()
    let Year = time.getFullYear()

    return `${date} ${month[monthIndex]} ${Year}`
}






function distanceTime(startDate, endDate){


    let start = new Date(startDate)
    let end = new Date(endDate)

    let duration = end - start
    
    //miliseconds  1000
    //second in hours 3600 
    // hours in day 23 (karena ketika sudah sampai jam 23.59 akan kembali ke 00.00)
    // day in month 31

    let distanceDay = Math.floor(duration / (1000 * 3600 * 23));
    let distanceMonth = Math.floor(distanceDay / 31);
    let distanceMore = Math.floor(distanceDay % 31 - 1)

    
    if (distanceMonth <= 0) {
        return distanceDay + " Hari"
    } else 
        return distanceMonth + " Bulan " + distanceMore + " Hari"
    
}








app.listen(port, function(){
    console.log(`server berjalan pada port : ${port}`);
})