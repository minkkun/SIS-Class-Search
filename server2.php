<?php

$filename = "./data.json"; // File that we retrieve data from
$file = file_get_contents($filename); // Open the file in read mode
$searchText = null;
$matchingClasses = array(); // Initialize an empty array to store the matching class data

// Get the user input from the POST request
// $input_code = 'csds285';
// $searchText = strtolower(str_replace(' ', '', $input_code));

// $input = "csds132";
// $searchText = strtolower(str_replace(' ', '', $input));
$searchText = strtolower(str_replace(' ', '', $_POST['searchText']));

$classes = json_decode($file, true);

foreach ($classes as $class) {
    // Get the code from the current class and convert to same format as input
    $class_code = strtolower(str_replace(' ', '', $class['code']));
    
    // Check if the input code matches the current class code
    if ($class_code === $searchText) {
        // Match found, add class data to the matching classes array
        $matchingClasses[] = $class;
    }
}

// Encode the matching classes data as a JSON object and return it
if (!empty($matchingClasses)) {
    echo json_encode($matchingClasses);
}

?>
