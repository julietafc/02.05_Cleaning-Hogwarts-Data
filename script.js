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
    student.house = getHouse(object.house);
    allStudents.push(student);
  });
}

console.log(allStudents);

function getFirstName(fullName) {
  const noSpace = fullName.trimStart(fullName);
  const firstName = noSpace.substring(0, noSpace.indexOf(" "));
  const initial = firstName.substring(0, 1).toUpperCase() + firstName.substring(1).toLowerCase();
  return initial;
}

function getMiddleName(fullName) {
  const noSpace = fullName.trimStart(fullName);
  const middleName = noSpace.substring(noSpace.indexOf(" ") + 1, noSpace.lastIndexOf(" "));
  const initial = middleName.substring(0, 1).toUpperCase() + middleName.substring(1).toLowerCase();
  return initial;
}

function getNickName(fullName) {
  //   const nosign = fullName.substring(fullName.split(""""));
  //   return nosign;
}

function getLastName(fullName) {
  const noSpace = fullName.trimStart(fullName);
  const lastName = noSpace.substring(noSpace.lastIndexOf(" ") + 1);
  const initial = lastName.substring(0, 1).toUpperCase() + lastName.substring(1).toLowerCase();
  return initial;
}

function getHouse(house) {
  const noSpace = house.trimStart(house);
  const initial = noSpace.substring(0, 1).toUpperCase() + noSpace.substring(1).toLowerCase();
  return initial;
}

// TODO: Get MiddleName and Nickname

// make the information appears on list