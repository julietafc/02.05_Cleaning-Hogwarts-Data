"use strict";

window.addEventListener("load", start);

const allStudents = [];

// Prototype
let Student = {
  firstname: "",
  middlename: "",
  nickname: "",
  lastname: "",
  image: "",
  house: "",
};

function start() {
  fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((response) => response.json())
    .then((data) => prepareObjects(data));
}

function prepareObjects(jsonData) {
  jsonData.forEach((object) => {
    // console.log("object", object);
    const student = Object.create(Student);
    student.firstname = getFirstName(object.fullname);
    student.middlename = getMiddleName(object.fullname);
    student.nickname = getNickName(object.fullname);
    student.lastname = getLastName(object.fullname);
    student.image = getImage(object);
    student.house = getHouse(object.house);
    allStudents.push(student);
  });
  console.table(allStudents);
}

function getFirstName(fullname) {
  const firstName = fullname.slice(0, fullname.indexOf(" "));
  const cleanData = cleanResult(firstName);
  return cleanData;
}

function getMiddleName(fullname) {
  if (fullname.includes(" ") === true) {
    const middleName = fullname.slice(fullname.indexOf(" ") + 1, fullname.lastIndexOf(" "));
    const cleanData = cleanResult(middleName);
    return cleanData;
  }

  // need to clean "" in middle name
}

function getNickName(fullname) {
  const nickname = fullname.slice(fullname.indexOf(" ") + 1, fullname.lastIndexOf(" "));
  const initial = nickname.slice(0, 1);
  if (initial === '"') {
    length = nickname.length;
    const noQuotes = nickname.slice(1, length - 1);
    const cleanData = cleanResult(noQuotes);
    return cleanData;
  }
}

function getLastName(fullname) {
  const lastName = fullname.substring(fullname.lastIndexOf(" ") + 1);
  const cleanData = cleanResult(lastName);
  return cleanData;
}

function getImage(firstname, lastname) {}

function getHouse(house) {
  const cleanData = cleanResult(house);
  return cleanData;
}

function cleanResult(name) {
  const noSpaces = name.trim(name);
  const initial = noSpaces.substring(0, 1).toUpperCase() + noSpaces.substring(1).toLowerCase();
  const cleanData = initial;
  return cleanData;
}

// TODO: Clean nickname "ernie"
