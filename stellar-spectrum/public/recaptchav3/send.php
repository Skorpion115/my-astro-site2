<?php
/**
 * Check to see if all fields that are required have been submitted
 *
 * @return boolean
 */
function isValid(){
    if(
        $_POST['born']         != '' && // = required
        $_POST['desired_date'] != '' &&
        $_POST['phone']        != '' &&
        $_POST['instrument']   != '' &&
        $_POST['email']        != '' &&
        $_POST['message']      != '' &&
        $_POST['fname']        != '' &&
        $_POST['lname']        != '' &&
        $_POST['street']       != '' &&
        $_POST['place']        != '' &&
        $_POST['postal_code']  != ''
    ) {
        return true;
    }
    return false;
}

// Declare variables to prepare for form submission
$success_output = '';
$error_output = '';

if (isValid()) {
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify'; // URL to the reCAPTCHA server
    $recaptcha_secret = '6LfPipchAAAAAJyPMhYmZauIQx_6_0I_BcMO6NPX'; // Secret key
    $recaptcha_response = $_POST['recaptchaResponse']; // Response from reCAPTCHA server, added to the form during processing
    $recaptcha = file_get_contents($recaptcha_url.'?secret='.$recaptcha_secret.'&response='.$recaptcha_response); // Send request to the server
    $recaptcha = json_decode($recaptcha); // Decode the JSON response
    if($recaptcha->success == true && $recaptcha->score >= 0.5 && $recaptcha->action == "contact"){ // If the response is valid
            /* Übergibt den Inhalt der Formularfelder an Variablen */
            $geburtsdatum = $_POST['born'];
            $wunschtermin = $_POST['desired_date'];
            $telefon = $_POST['phone'];
            $instrument = $_POST['instrument'];
            $absender_mail = $_POST['email'];
            $nachricht = $_POST['message']; //textarea
            $absender_vorname = $_POST['fname'];
            $absender_nachname = $_POST['lname'];
            $street = $_POST['street'];
            $ort = $_POST['place'];
            $postleitzahl = $_POST['postal_code'];
            $eltern = $_POST['parents'];
            /* Legt den Emfänger fest */
            $empfaenger = 'musikstudio-ziebart@outlook.de';
            $betreff = 'Neuer Eintrag';
            $from = "From: Rudi Ziebart <rudi.ziebart@kabelmail.de>\r\n";
            /* Baut die Mail zusammen*/
            $from .= 'Geburtsdatum: ' . $geburtsdatum . "\n";
            $from .= 'Wunschtermin: ' . $wunschtermin . "\n";
            $from .= 'Telefonnummer: ' . $telefon . "\n";
            $from .= 'Instrument: ' . $instrument . "\n";
            $from .= 'Nachricht: ' . $nachricht . "\n"; // textarea ok
            $from .= 'Vorname: ' . $absender_vorname . "\n";
            $from .= 'Nachname: ' . $absender_nachname . "\n";
            $from .= 'Strasse: ' . $street . "\n";
            $from .= 'Ort: ' . $ort . "\n";
            $from .= 'Postleitzahl: ' . $postleitzahl . "\n";
            $from .= 'Eltern: ' . $eltern . "\n";
            $from .= 'Reply-To: ' . $absender_mail . "\n"; //postmaster@musikstudio-ziebart.de
            $from .= 'From: ' . $absender_mail . "\n"; //rudi.ziebart@kabelmail.de
            $from .= "Content-type: text/plain; charset=UTF-8 \r\n";
             /* Verschicken der Mail */
             mail($empfaenger, $betreff, $from);

        $success_output = 'Ihre Nachricht wurde erfolgreich versendet.'; // Success message
    }else{
        $error_output = 'Etwas ist schief gelaufen. Bitte versuchen Sie es späer noch einmal.'; // Error message
    }
}else{
    $error_output = 'Bitte füllen Sie alle erforderlichen Felder aus!'; // Error message
}
// Output error or success message
$output = [
    'error' => $error_output,
    'success' => $success_output
];

// Return the output in JSON format
echo json_encode($output);