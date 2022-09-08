<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    require './PHPMailer/Exception.php';
    require './PHPMailer/PHPMailer.php';
    require './PHPMailer/SMTP.php';

    if(isset($_POST)){
    
        $name = $_POST["name"];
        $email = $_POST["email"];
        $phone = $_POST["phone"];
        $service = $_POST["service"];
        $address = $_POST["address"];
        $message = $_POST["message"];
        
        $domain = $_SERVER["HTTP_HOST"];
        $subject_mail = $service;
        $message = "
                <p>Data sent from the site form <b>$domain</b></p>
                <h3 style=`display:inline`>Name: </h3><p style=`display:inline`>$name</p>
                <br>
                <br>
                <h3 style=`display:inline`>Email: </h3><p style=`display:inline`>$email</p>
                <br>
                <br>
                <h3 style=`display:inline`>Phone: </h3><p style=`display:inline`>$phone</p>
                <br>
                <br>
                <h3 style=`display:inline`>Service: </h3><p style=`display:inline`>$service</p>
                <br>
                <br>
                <h3 style=`display:inline`>Address: </h3><p style=`display:inline`>$address</p>
                <br>
                <br>
                <h3>Message</h3>
                <p>$message</p>
        ";

        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = 0;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'ssl://smtp.titan.email';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'admin@gilmarcleaning3.com';                     //SMTP username
            $mail->Password   = 'GCperdomo';                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
            //Recipients
            $mail->setFrom('admin@gilmarcleaning3.com', "Gilmar Cleaning");
            $mail->addAddress('admin@gilmarcleaning3.com');     //Add a recipient
            $mail->addReplyTo('no-reply@gilmarcleaning3.com', "Gilmar Cleaning");
    
            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = $subject_mail;
            $mail->Body    = $message;
    
            $mail->send();
            echo json_encode([ "message" => "Message has been sent" ]);
        } catch (Exception $e) {
            echo json_encode([ "message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}" ]);
        }
        exit;
    }