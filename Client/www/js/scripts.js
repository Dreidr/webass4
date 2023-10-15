$(document).ready(function () {
    
    // jQuery Mobile initialization
    $(document).on("mobileinit", function () {
        $.mobile.initializePage();
    });
    
    // Add a pagecreate event to initialize the map when the #mapPage is created
    $(document).on('pagecreate', '#mapPage', function() {
        initializeMap();
    });
    
    $(document).on('pagecreate', function() {
        // Add a click event to the button for getting external data
        $('#getExternalData').click(function() {
            getData();
        });
    
        // Add a click event to the button for starting the QR scanner
        $('#scanQRButton').click(function() {
            scanQR();
        });
    });

    // Enable swipe panel behavior
    $(document).on("swipeleft swiperight", function (event) {
        if ($.mobile.activePage.jqmData("panel") !== "open") {
            if (event.type === "swiperight") {
                $("#myPanel").panel("open");
            }
        } else {
            if (event.type === "swipeleft") {
                $("#myPanel").panel("close");
            }
        }
    }); 
});
document.addEventListener("deviceready", function() {

function scanQR() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if (!result.cancelled) {
                alert("Scan Result: " + result.text);
            }
        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false,
            showFlipCameraButton : true,
            showTorchButton : true,
            torchOn: false,
            saveHistory: true,
            prompt : "Place a barcode inside the scan area",
            resultDisplayDuration: 500,
            formats : "QR_CODE",
            orientation : "portrait",
            disableAnimations : true,
            disableSuccessBeep: false
        }
    );
}

}, false);

function initializeMap() {
    var mapOptions = {
        center: { lat: -33.87126429026328, lng: 151.20514379632644 },  // Adjust this to your desired starting point
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('mapContainer'), mapOptions);
}


function fetchRewardData() {
    fetch('http://localhost:3000/getRewardData') // Replace with your server URL if needed
        .then(response => response.json())
        .then(data => {
            // Update your HTML elements with the data
            document.getElementById('userPoints').innerText = data.user_points;
            document.getElementById('tasksCompleted').innerText = data.tasks_completed;
            document.getElementById('completedDate').innerText = data.completed_date;
            document.getElementById('rewards').innerText = data.rewards;
        })
        .catch(error => console.error('Error fetching reward data:', error));
}

// Call this function when your rewards page loads
fetchRewardData();

 // Function to load a random image from Picsum API
 function loadRandomImage() {
    const randomImage = document.getElementById('random-image');
    const randomImageNumber = Math.floor(Math.random() * 1000);
    const imageUrl = `https://picsum.photos/200/300?random=${randomImageNumber}`;
    randomImage.src = imageUrl;
}

// Initialize the "Eco Facts" page to load a random image
$(document).on('pagecreate', '#ecoFactsPage', function() {
    loadRandomImage();
});