import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get, child  } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBLAsq_onVnY3DGmC8fIc4Z_VZ80PjXWe8",
    authDomain: "horizon-db7c1.firebaseapp.com",
    databaseURL: "https://horizon-db7c1-default-rtdb.firebaseio.com",
    projectId: "horizon-db7c1",
    storageBucket: "horizon-db7c1.appspot.com",
    messagingSenderId: "1068270701842",
    appId: "1:1068270701842:web:5834b28630cc83de1137cb"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const reloadButton = document.getElementById('reloadButton');
reloadButton.addEventListener('click', function () {
    const tableBody = document.querySelector("#studentsTable tbody");
    tableBody.innerHTML = "";
    populateStudentsTable();
});
function populateStudentsTable() {
    const user = auth.currentUser.uid;
    const dbref = ref(db, "teacher/" + user);

    get(dbref)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const tableBody = document.querySelector("#studentsTable tbody");
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    const row = document.createElement("tr");
                    row.className = 'studentRow'
                    row.innerHTML = `
                        <td class = "StudentTable-Info">${childData.Name}</td>
                        <td class = "StudentTable-Info">${childData.Course}</td>
                        <td style="display: none;" class = "StudentTable-Info">${childData.Email}</td>
                        <button class = "stdDetails" onclick="toggleNewRecordPopup()"><i class="fa-solid fa-circle-plus"></i>&nbsp;New Lesson</button>
                        <button class = "stdDetails" onclick="togglePopup()"><i class="fa-solid fa-address-card"></i>&nbsp;Profile</button>
                    `;
                    tableBody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error("Error retrieving students data: ", error);
        });
}
const bttnstd = document.getElementById("sbButton-Students");
const tableBody = document.querySelector("#studentsTable tbody");
bttnstd.addEventListener("click", () => {
    tableBody.innerHTML = "";
    populateStudentsTable();
});

//POP UP COM DETALHES
const stdDetails = document.getElementsByClassName('stdDetails');
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('stdDetails')) {
        getRowInfo(event.target);
    }
});

async function getRowInfo(stdDetails) {
    // Traverse up the DOM to find the parent row
    var row = stdDetails.closest('tr');

    // Get the cells in that row
    var cells = row.cells;

    // Extract information from the cells
    var name = cells[0].innerText;
    var module = cells[1].innerText;
    var email = cells[2].innerText;

    const encodedEmail = btoa(email);
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, `student/${encodedEmail}`));
        if (snapshot.exists()) {
            const studentInfo = snapshot.val();
            console.log(studentInfo);
            document.getElementById("Details-Name").innerHTML = studentInfo.Name || name;
            document.getElementById("RecordDetails-Name").innerHTML = studentInfo.Name || name;
            document.getElementById("Details-Module").innerHTML = studentInfo.Course || module;
            document.getElementById("Details-Email").innerHTML = studentInfo.Email || email;
            document.getElementById("Details-linkCall").innerHTML = studentInfo.callLink || linkCall;
            document.getElementById("Details-Price").innerHTML = studentInfo.Price || price;
            document.getElementById("Details-HoursTotal").innerHTML = studentInfo.monHours || HoursTotal;
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error(error);
    }
}

