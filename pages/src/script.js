document.querySelectorAll('.collapsible').forEach(list => {
    list.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });
});
// CHANGES THE CONTENT ACCORDING TO THE SIDEBAR BUTTON PRESSED
function changeContent(section) {
    // Hide all main content sections
    var mainContent = document.getElementsByClassName("mainContent");
    for (var i = 0; i < mainContent.length; i++) {
        mainContent[i].style.display = "none";
    }

    // Show the selected content
    var selectedContent = document.getElementById("mainContent-" + section);
    if (selectedContent) {
        selectedContent.style.display = "block";
    }

    // Remove 'selected' class from all sidebar buttons
    var sbButtons = document.getElementsByClassName("sidebarButton");
    for (var j = 0; j < sbButtons.length; j++) {
        sbButtons[j].classList.remove("selected");
    }

    // Highlight the selected button
    var selectedButton = document.getElementById("sbButton-" + section);
    if (selectedButton) {
        selectedButton.classList.add("selected");
    }
}
function setDefault() {
    // Simulate a click event on the default link
    document.getElementById("sbButton-Lessons").click();
}
function togglePopup() {
    var popup = document.getElementById('studentDetails');
    if (popup) {
        popup.style.right = "0";
    }
}
function closePopup() {
    var closeDetails = document.getElementById('closeDetails');
    var popup = document.getElementById('studentDetails');
    if (popup) {
        popup.style.right = "-100%";
    }
}
//New Lesson
function toggleNewRecordPopup() {
    const attendanceDate = document.getElementById("RecordDetails-Date").value = "";
    const lesson = document.getElementById("RecordDetails-Lesson").value = "";
    const notes = document.getElementById("RecordDetails-Notes").value = "";
    var Recordpopup = document.getElementById('studentRecordDetails');
    if (Recordpopup) {
        Recordpopup.style.right = "0";
    }
}
function closeNewRecordPopup() {
    var closeRecordDetails = document.getElementById('closeRecordDetails');
    var Recordpopup = document.getElementById('studentRecordDetails');
    if (Recordpopup) {
        Recordpopup.style.right = "-100%";
    }
}
function openA1A2(){
    document.getElementById("modules").style.display = "none";
    document.getElementById("A1A2list").style.display = "";
}
function gobacktoModules(){
    document.getElementById("modules").style.display = "";
    document.getElementById("A1A2list").style.display = "none";
}
function gobacktoPractice(){
    document.getElementById("PracticeModules").style.display = "";
    document.getElementById("A1A2PracticeContainer").style.display = "none";
}
function openPracticeA1A2(){
    document.getElementById("PracticeModules").style.display = "none";
    document.getElementById("A1A2PracticeContainer").style.display = "";
}

function docTest(){
    alert("download PDF");
}