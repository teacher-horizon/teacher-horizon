import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get, set, push } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
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
/*
function saveNewLesson() {
    const submitButton = document.getElementById("RecordDetails-SaveButton");
    if (!submitButton) {
        console.error("Submit button not found");
        return;
    }

    submitButton.addEventListener("click", () => {
        const attendanceName = document.getElementById("RecordDetails-Name").value;
        const attendanceDate = document.getElementById("RecordDetails-Date").value;
        const lesson = document.getElementById("RecordDetails-Lesson").value;
        const notes = document.getElementById("RecordDetails-Notes").value;
        const user = auth.currentUser ? auth.currentUser.email : null;

        if (!user) {
            console.error("No authenticated user found");
            return;
        }

        const sanitizedEmail = user.replace(/\./g, "-");
        const attendancesRef = ref(db, sanitizedEmail + "/attendances/");
        const newAttendanceRef = push(attendancesRef);

        set(newAttendanceRef, {
            Name: attendanceName,
            Date: attendanceDate,
            Lesson: lesson,
            Notes: notes
        }).then(() => {
            alert("Saved!");
        }).catch((error) => {
            console.error("Error saving attendance: ", error);
        });
    });
}
*/
function saveNewLesson() {

    const submitButton = document.getElementById("RecordDetails-SaveButton");
    if (!submitButton) {
        console.error("Submit button not found");
        return;
    }

    submitButton.addEventListener("click", () => {
        const attendanceName = document.getElementById("RecordDetails-Name").textContent;
        const attendanceDate = document.getElementById("RecordDetails-Date").value;
        const lesson = document.getElementById("RecordDetails-Lesson").value;
        const notes = document.getElementById("RecordDetails-Notes").value;
        const user = auth.currentUser ? auth.currentUser.email : null;

        console.log("Attendance Name:", attendanceName);
        console.log("Attendance Date:", attendanceDate);
        console.log("Lesson:", lesson);
        console.log("Notes:", notes);

        if (!user) {
            console.error("No authenticated user found");
            return;
        }

        if (!attendanceName || !attendanceDate || !lesson || !notes) {
            console.error("All fields are required");
            return;
        }

        const sanitizedEmail = user.replace(/\./g, "-");
        const attendancesRef = ref(db, `${sanitizedEmail}/attendances/`);
        const newAttendanceRef = push(attendancesRef);

        set(newAttendanceRef, {
            Name: attendanceName,
            Date: attendanceDate,
            Lesson: lesson,
            Notes: notes
        }).then(() => {
            alert("Saved!");
            const attendanceDate = document.getElementById("RecordDetails-Date").value = "";
            const lesson = document.getElementById("RecordDetails-Lesson").value = "";
            const notes = document.getElementById("RecordDetails-Notes").value = "";
        }).catch((error) => {
            console.error("Error saving attendance: ", error);
        });
    });
}

// Call the function to ensure the event listener is added
saveNewLesson();


