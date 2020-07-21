const fs = require('fs');
var fullname = []
var firstname = []
var lastname = []

var uniqueFullname
var uniqueFirstname
var uniqueLastname

var firstUniquesFullnames



function onlyUnique(value, index, self) {return self.indexOf(value) === index;}

function getUnique(data){return (data.filter(onlyUnique))}

async function countNames(reference, list){
    let namesRank = []
    await reference.forEach((uniqueName) => {
        let count = 0;
        list.forEach(name => {
            if (uniqueName === name)
                count++;
        })
        namesRank.push({
            name: uniqueName,
            count: count
        })
    })
    await namesRank.sort((a, b) => {
        return (b.count - a.count)
    })
    return (namesRank)
}

function getUniques(){
    uniqueFullname = getUnique(fullname)
    uniqueFirstname = getUnique(firstname)
    uniqueLastname = getUnique(lastname)
}

async function firstQuestion(){
    console.log("*** Question #1 ***\n")
    await getUniques()
    console.log("  There are " + uniqueFullname.length + " unique full names.");
    console.log("  There are " + uniqueFirstname.length + " unique first names.");
    console.log("  There are " + uniqueLastname.length + " unique last names.");
}

function secondQuestion(namesRank){
    console.log("\n*** Question #2 ***\n")
    console.log("  The ten most common first names are:")

    for(let i = 0; i < 10; i++){
        console.log("    " + namesRank[i].name + " (" + namesRank[i].count + ")")
    }
}

function thirdQuestion(namesRank){
    console.log("\n*** Question #3 ***\n")
    console.log("  The ten most common last names are:")

    for(let i = 0; i < 10; i++){
        console.log("    " + namesRank[i].name + " (" + namesRank[i].count + ")")
    }
}

function isFullnameUnique(firstname, lastname, uniquesFullname){
    if (uniquesFullname.every((current) => current.firstname !== firstname && current.lastname !== lastname))
        return true
    return false
}

function forthQuestion(){
    console.log("\n*** Question #4 ***\n")
    let i = 0;
    let uniquesFullnames = []
    while (uniquesFullnames.length < 25) {
        if (isFullnameUnique(firstname[i], lastname[i], uniquesFullnames))
            uniquesFullnames.push({
                firstname: firstname[i],
                lastname: lastname[i]
            })
        i++
    }
    console.log("  The new 25 unique names are:")
    console.log("    " + uniquesFullnames[24].lastname + ", " + uniquesFullnames[0].firstname)
    for(let i = 0; i < 24; i++){
        console.log("    " + uniquesFullnames[i].lastname + ", " + uniquesFullnames[i + 1].firstname)
    }
}

fs.readFile('./test-data-10-exp-5.list','utf8', async (err, data) => {
    await data.split('\n').forEach((line) => {
        if (line[0] !== ' ')
        {
            name = line.split(' -- ')
            fullname.push(name[0])
            name = name[0].split(', ')
            firstname.push(name[1])
            lastname.push(name[0])
        }
    })

    firstQuestion()
    secondQuestion(await countNames(uniqueFirstname, firstname))
    thirdQuestion(await countNames(uniqueLastname, lastname))
    forthQuestion()
});
