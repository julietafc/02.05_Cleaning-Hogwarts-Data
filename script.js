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

function getFirstName(fullName) {
  const noSpace = fullName.trimStart(fullName);
  const firstName = noSpace.substring(0, noSpace.indexOf(" "));
  const initial = firstName.substring(0, 1).toUpperCase() + firstName.substring(1).toLowerCase();
  return initial;
}

function getMiddleName(fullName) {
  const noSpace = fullName.trimStart(fullName);
  if (noSpace.includes(" ") === true) {
    const middleName = noSpace.slice(noSpace.indexOf(" ") + 1, noSpace.lastIndexOf(" "));
    const initial = middleName.substring(0, 1).toUpperCase() + middleName.substring(1).toLowerCase();
    return initial;
  }
  // need to clean "" in middle name
}

function getNickName(fullname) {
  const nickname = fullname.slice(fullname.indexOf(" ") + 1, fullname.lastIndexOf(" "));
  const initial = nickname.slice(0, 1);
  if (initial === '"') {
    length = nickname.length;
    const noQuotes = nickname.slice(1, length - 1);
    return noQuotes;
  }
}

function getLastName(fullName) {
  const noSpace = fullName.trimStart(fullName);
  const lastName = noSpace.substring(noSpace.lastIndexOf(" ") + 1);
  const initial = lastName.substring(0, 1).toUpperCase() + lastName.substring(1).toLowerCase();
  return initial;
}

function getImage(firstname, lastname) {
  // "'${lastName}`.png";
}

function getHouse(house) {
  const noSpace = house.trim(house);
  const initial = noSpace.substring(0, 1).toUpperCase() + noSpace.substring(1).toLowerCase();
  return initial;
}

// TODO: Clean nickname "ernie"
